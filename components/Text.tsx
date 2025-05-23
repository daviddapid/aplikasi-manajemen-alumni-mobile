import { theme } from "@/theme";
import { ReactNode } from "react";
import { Text as RNText, StyleProp, StyleSheet, TextStyle } from "react-native";

type Props = {
	children: ReactNode;
	style?: StyleProp<TextStyle>;
};

export const Text = ({ ...props }: Props) => {
	return <RNText style={[styles.text, props.style]}>{props.children}</RNText>;
};

const styles = StyleSheet.create({
	text: { fontSize: theme.fontSizes.base },
});
