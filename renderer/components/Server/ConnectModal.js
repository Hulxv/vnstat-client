import { ipcRenderer } from "electron";

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	Box,
	Stack,
	Input,
	Heading,
	IconButton,
	useToast,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useConfig } from "@Context/configuration";
import { useVnStat } from "@Context/vnstat";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function CustomIntervalModal({
	children,
	isClosable = false,
	isOpen = false,
	onOpen,
	onClose,
}) {
	const toast = useToast();

	const { config } = useConfig();
	const [address, setAddress] = useState("");
	const [password, setPassword] = useState("");


	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { reloading } = useVnStat();

	async function connectHandler() {
		if (ipcRenderer) {
			setIsLoading(true);
			let res = await ipcRenderer.invoke("server-connect", {
				address,
				password,
			});

			console.log("res:", res);
			toast({
				position: "top",
				isClosable: true,
				...res,
			});

			setIsLoading(false);
			if (res.status === "success") {
				onClose();
				reloading();
			}
		}
	}

	return (
		<>
			<Modal
				isOpen={isOpen}
				isCentered
				onClose={() => {
					onClose();
				}}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Connect to vnStat Server</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={8}>
							<Stack spacing={0.3}>
								<Heading opacity={0.7} size="xs">
									Address
								</Heading>
								<Input
									onChange={e => setAddress(e.target.value)}
									value={address}
									variant="filled"
									type="text"
									placeholder="http://0.0.0.0:8888"
								/>
							</Stack>
							<Stack spacing={0.3}>
								<Heading opacity={0.7} size="xs">
									Password
								</Heading>
								<Box position="relative">
									<IconButton
										onClick={() =>
											setIsPasswordVisible(
												!isPasswordVisible
											)
										}
										variant="ghost"
										zIndex={10}
										position="absolute"
										right={0}
										icon={
											isPasswordVisible ? (
												<AiFillEyeInvisible size="1.4em" />
											) : (
												<AiFillEye size="1.4em" />
											)
										}
									/>
									<Input
										onChange={e =>
											setPassword(e.target.value)
										}
										value={password}
										variant="filled"
										type={
											isPasswordVisible
												? "text"
												: "password"
										}
										placeholder="*******"
									/>
								</Box>
							</Stack>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button
							variant="ghost"
							mr={3}
							onClick={() => {
								onClose();
							}}>
							Close
						</Button>
						<Button
							isDisabled={!address || !password}
							isLoading={isLoading}
							colorScheme={
								config?.appearance?.globalTheme ?? "green"
							}
							onClick={async () => await connectHandler()}>
							Connect
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
