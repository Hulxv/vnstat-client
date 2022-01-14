import {
	useContext,
	createContext,
	useEffect,
	useState,
	useCallback,
	useMemo,
} from "react";
import { ipcRenderer } from "electron";
const LogsProvider = createContext(null);

const availableTypes = ["warn", "error", "info"];

function Logs({ children }) {
	const [logs, setLogs] = useState({ path: "", lines: [] });
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		GetLogs();
	}, []);
	// ! Uncomment for debugging
	// useEffect(() => {
	// 	console.log(logs);
	// }, [logs]);
	const GetLogs = useCallback(() => {
		setIsLoading(true);
		ipcRenderer.send("get-logs");
		ipcRenderer.on("send-logs", (e, res) => {
			setLogs({
				path: res["0"].path,
				lines: [...res["0"].lines]
					.reverse()
					.filter((line) => line && line)
					.map((line) => {
						let matching = line.match(/\[(.*?)\]/g);

						let status =
							matching !== null
								? matching[1].replace(/\[/g, "").replace(/\]/g, "")
								: "info";
						let date =
							matching !== null &&
							matching[0].replace(/\[/g, "").replace(/\]/g, "");

						if (!availableTypes.includes(status)) status = "warning";
						return {
							content: line.replace(/\[(.*?)\]/g, ""),
							date,
							status,
						};
					}),
			});

			setIsLoading(false);
		});
		return () => ipcRenderer.removeAllListeners("send-logs");
	}, []);

	const ClearLogs = useCallback(() => {
		setIsLoading(true);
		ipcRenderer.send("clear-logs");

		ipcRenderer.on("send-logs", (e, res) => {
			setLogs({
				path: res["0"].path,
				lines: [...res["0"].lines].reverse().filter((line) => line && line),
			});
			setIsLoading(false);
		});
	}, []);
	function reloading() {
		ipcRenderer.send("get-logs");
	}

	const value = useMemo(
		() => ({
			GetLogs,
			ClearLogs,
			reloading,
			isLoading,
			logs,
		}),
		[logs, isLoading],
	);

	return (
		<LogsProvider.Provider value={value}>{children}</LogsProvider.Provider>
	);
}

export function useLogs() {
	return useContext(LogsProvider);
}

export default Logs;
