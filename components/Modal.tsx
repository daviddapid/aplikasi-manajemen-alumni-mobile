import { theme } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Pressable, Modal as RNModal, TouchableOpacity } from "react-native";
import { Card } from "./Card";
import { Divider } from "./Divider";
import { Row } from "./Row";
import { Text } from "./Text";

type Props = {
	visible: boolean;
	closeModal: () => void;
	title?: string;
	children: ReactNode;
};

export const Modal = (props: Props) => {
	return (
		<RNModal visible={props.visible} backdropColor={"transparent"} animationType="fade">
			<Pressable
				style={{ flex: 1, justifyContent: "center", paddingHorizontal: theme.paddings.horizontal }}
				onPress={props.closeModal}
			>
				<Card>
					<Row
						style={{
							justifyContent: "space-between",
						}}
					>
						<Text style={{ fontSize: theme.fontSizes.lg }}>{props.title}</Text>
						<TouchableOpacity onPress={props.closeModal}>
							<MaterialIcons name="close" size={25} />
						</TouchableOpacity>
					</Row>
					<Divider style={{ marginBottom: 20 }} />
					{props.children}
				</Card>
			</Pressable>
		</RNModal>
	);
};
