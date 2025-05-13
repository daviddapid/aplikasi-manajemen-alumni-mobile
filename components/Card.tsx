import { theme } from "@/theme";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type Props = {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
};

export const Card = (props: Props) => {
	return <View style={[styles.card, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: theme.colors.white,
		borderRadius: theme.radius.base,
		paddingHorizontal: 15,
		paddingVertical: 15,
	},
});
