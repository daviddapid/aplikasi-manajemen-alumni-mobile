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
			case "gray":
				return theme.colors.gray;
		}
	}, [variant]);

	const getTextColor = useCallback(() => {
		switch (variant) {
			case "primary":
				return theme.colors.white;
			case "secondary":
				return theme.colors.white;
			case "gray":
				return theme.colors.black;
		}
	}, [variant]);

	return (
		<TouchableOpacity onPress={props.onPress} style={[styles.btn, { backgroundColor: getBgColor() }, props.style]}>
			{props.leading}
			<Text style={[styles.text, { color: getTextColor() }]}>{props.children}</Text>
			{props.trailing}
		</TouchableOpacity>
	);
};

export const OutlineButton = ({ variant = "primary", ...props }: Props) => {
	const getBorderColor = useCallback(() => {
		switch (variant) {
			case "primary":
				return theme.colors.primary;
			case "secondary":
				return theme.colors.secondary;
			case "gray":
				return theme.colors.gray;
		}
	}, [variant]);

	const getTextColor = useCallback(() => {
		switch (variant) {
			case "primary":
				return theme.colors.primary;
			case "secondary":
				return theme.colors.secondary;
			case "gray":
				return theme.colors.gray;
		}
	}, [variant]);

	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={[styles.btn, { borderWidth: 1, borderColor: getBorderColor() }, props.style]}
		>
			{props.leading}
			<Text style={[styles.text, { color: getTextColor() }]}>{props.children}</Text>
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
	text: { fontWeight: "semibold", marginHorizontal: "auto" },
});
