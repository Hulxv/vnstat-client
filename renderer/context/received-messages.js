import { createContext, useEffect } from "react";
import { ipcRenderer } from "electron";
import { useToast } from "@chakra-ui/react";
const ReceivedMessagesContext = createContext();

export default function ReceivedMessagesProvider({ children }) {
	const toast = useToast();
	useEffect(() => {
		ipcRenderer.on("message", (e, args) => {
			toast({
				position: "top",
				isClosable: true,
				...args,
			});
		});

		return () => ipcRenderer.removeAllListeners("message");
	}, []);
	return (
		<ReceivedMessagesContext.Provider>
			{children}
		</ReceivedMessagesContext.Provider>
	);
}
