import { theme } from "@/theme";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text } from "./Text";

type Props = {
	label?: string;
	containerStyle?: StyleProp<ViewStyle>;
	errorMessage?: string;
	children: ReactNode;
	enableBorder?: boolean;
};

export const InputWrapper = (props: Props) => {
	return (
		<View style={props.containerStyle}>
			{props.label && <Text style={styles.label}>{props.label}</Text>}
			<View style={[props.enableBorder && styles.input, props.errorMessage && { borderColor: theme.colors.red }]}>
				{props.children}
			</View>
			{props.errorMessage && (
				<Text style={{ color: theme.colors.red, marginTop: theme.spaces.sm }}>{props.errorMessage}</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	label: { marginBottom: 6 },
	input: {
		borderWidth: 1,
		borderColor: theme.colors.gray,
		borderRadius: theme.radius.base,
		paddingHorizontal: 12,
	},
});
