import { theme } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Text } from "./Text";

type Props = {
	text: string;
};

export const Badge = (props: Props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{props.text}</Text>
			<MaterialIcons name="info" color={theme.colors.primary} size={20} />
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
	text: { color: theme.colors.primary, fontWeight: "bold", fontSize: theme.fontSizes.md },
});
