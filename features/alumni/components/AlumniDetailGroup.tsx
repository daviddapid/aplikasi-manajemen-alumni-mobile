import { Text } from "@/components/Text";
import { theme } from "@/theme";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
	text: string;
	children: ReactNode;
};

export const AlumniDetailGroup = (props: Props) => {
	return (
		<View>
			<View style={styles.groupDivider}>
				<Text>{props.text}</Text>
			</View>
			<View style={styles.container}>{props.children}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	groupDivider: {
		backgroundColor: theme.colors.softPrimary,
		paddingVertical: 8,
		alignItems: "center",
	},
	container: { paddingHorizontal: 15, marginTop: theme.spaces.lg, marginBottom: theme.spaces.xl, gap: 8 },
});
