import { theme } from "@/theme";
import { JSX, useCallback } from "react";
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Text } from "./Text";

type Props = {
	children: string;
	variant?: "primary" | "secondary" | "gray";
	trailing?: JSX.Element;
	leading?: JSX.Element;
	className?: string;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
};

export const Button = ({ variant = "primary", ...props }: Props) => {
	const getBgColor = useCallback(() => {
		switch (variant) {
			case "primary":
				return theme.colors.primary;
			case "secondary":
				return theme.colors.secondary;
		}
	}, [variant]);

	return (
		<TouchableOpacity onPress={props.onPress} style={[styles.btn, { backgroundColor: getBgColor() }, props.style]}>
			{props.leading}
			<Text style={styles.text}>{props.children}</Text>
			{props.trailing}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btn: {
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderRadius: theme.radius.base,
		gap: 8,
		flexDirection: "row",
		alignItems: "center",
	},
	text: { color: theme.colors.white, fontWeight: "semibold", marginHorizontal: "auto" },
});
