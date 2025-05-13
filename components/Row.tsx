import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type Props = {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
	gap?: number;
};

export const Row = (props: Props) => {
	return <View style={[styles.row, { gap: props.gap }, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
});
