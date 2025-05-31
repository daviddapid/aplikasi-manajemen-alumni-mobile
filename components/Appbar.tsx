import { theme } from "@/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "./Text";

type Props = {
	title?: string;
	action?: ReactNode;
};

export const Appbar = (props: Props) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => router.back()} style={{ zIndex: 3 }}>
				<AntDesign name="arrowleft" size={25} />
			</TouchableOpacity>
			{props.title && <Text style={styles.title}>{props.title}</Text>}
			{props.action && props.action}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.white,
		paddingHorizontal: theme.paddings.horizontal,
		paddingVertical: 10,
		flexDirection: "row",
		alignItems: "center",
		position: "relative",
		justifyContent: "space-between",
		boxShadow: theme.shadows.sm,
		zIndex: 3,
	},
	title: {
		fontSize: theme.fontSizes.lg,
		fontWeight: "semibold",
		position: "absolute",
		marginLeft: theme.paddings.horizontal,
		width: "100%",
		textAlign: "center",
		left: 0,
	},
});
