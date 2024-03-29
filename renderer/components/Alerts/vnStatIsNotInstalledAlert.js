import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Box,
	Link,
	useDisclosure,
	Alert,
	AlertIcon,
	AlertDescription,
	AlertTitle,
	Text,
	Button,
	Divider,
	Stack,
	Heading,
} from "@chakra-ui/react";
import { ConnectModal } from "@Components/Server";

import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";

import { useConfig } from "@Context/configuration";
import { useVnStat } from "@Context/vnstat";
import { useServer } from "@Context/server";

import { TiWarningOutline } from "react-icons/ti";

function VnStatIsNotInstalledAlert() {
	const { reloading } = useVnStat();
	const { config } = useConfig();
	const { isServerConnected } = useServer();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const connectModalDisclosure = useDisclosure();

	const [isVnstatDetect, setIsVnstatDetect] = useState(false);

	useEffect(() => {
		if (window && ipcRenderer) {
			ipcRenderer.send("req:is-vnstat-detect");
			ipcRenderer.on("res:is-vnstat-detect", (_, res) => {
				setIsVnstatDetect(res);
			});
		}
	}, [typeof window, typeof ipcRenderer, isServerConnected]);

	useEffect(() => {
		// ! Debuggin
		console.log("is server connected?", isServerConnected);
		console.log("is vnstat detected?", isVnstatDetect);

		if (isServerConnected || isVnstatDetect) {
			onClose();
			reloading();
		} else {
			onOpen();
		}
	}, [isVnstatDetect, isServerConnected]);

	return (
		<>
			<AlertDialog
				motionPreset="slideInBottom"
				closeOnOverlayClick={false}
				closeOnEsc={false}
				isOpen={isOpen}
				onClose={onClose}
				isCentered>
				<AlertDialogOverlay />

				<AlertDialogContent py={1}>
					<AlertDialogHeader>
						vnStat wasn't detected
					</AlertDialogHeader>
					<AlertDialogBody>
						<Stack spacing={6}>
							<span style={{ alignSelf: "center" }}>
								<TiWarningOutline size="5em" />
							</span>
							<Stack spacing={0.1}>
								<Text align={"center"} mb={4}>
									vnStat isn't installed, You should download
									and setup it before using this client.
								</Text>
								<Text align={"center"}>
									Check{" "}
									<Link
										textDecorationLine="underline"
										onClick={() =>
											ipcRenderer &&
											ipcRenderer.send(
												"open-url",
												"https://github.com/vergoh/vnstat/blob/master/INSTALL.md"
											)
										}>
										here
									</Link>{" "}
									to know how to install and setup it.
								</Text>
							</Stack>
							<Stack
								position={"relative"}
								justify="center"
								align="center">
								<Divider />
								<Heading
									bgColor="white"
									px={3}
									top={-4}
									position={"absolute"}
									size="xs">
									OR
								</Heading>
							</Stack>
						</Stack>
					</AlertDialogBody>
					<AlertDialogFooter display="flex" justifyContent={"center"}>
						<Button
							onClick={connectModalDisclosure.onOpen}
							colorScheme={
								config?.appearance?.globalTheme ?? "green"
							}>
							Connect to server
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<ConnectModal {...connectModalDisclosure} />
		</>
	);
}

export default VnStatIsNotInstalledAlert;
