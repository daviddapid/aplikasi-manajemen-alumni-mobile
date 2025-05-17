import { theme } from "@/theme";
import { JSX } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "./Text";

type Props = {
	text: string;
	trailing?: JSX.Element;
	leading?: JSX.Element;
};

export const Badge = (props: Props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{props.text}</Text>
			{props.trailing}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.softPrimary,
		borderWidth: 1,
		borderColor: theme.colors.primary,
		borderRadius: theme.radius.base,
		padding: 15,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		justifyContent: "center",
	},
	text: { color: theme.colors.primary, fontSize: theme.fontSizes.md },
});
