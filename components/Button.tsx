import { theme } from "@/theme";
import { JSX, useCallback } from "react";
import { ActivityIndicator, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Text } from "./Text";

type Props = {
	children: string;
	variant?: "primary" | "secondary" | "gray" | "white" | "danger" | "green";
	trailing?: JSX.Element;
	leading?: JSX.Element;
	className?: string;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
	isLoading?: boolean;
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
			case "white":
				return theme.colors.white;
			case "danger":
				return theme.colors.red;
			case "green":
				return theme.colors.green;
		}
	}, [variant]);

	const getTextColor = useCallback(() => {
		switch (variant) {
			case "primary":
			case "secondary":
			case "danger":
			case "green":
				return theme.colors.white;
			case "white":
			case "gray":
				return theme.colors.black;
		}
	}, [variant]);

	return (
		<TouchableOpacity
			disabled={props.isLoading}
			onPress={props.onPress}
			style={[styles.btn, { backgroundColor: getBgColor() }, props.style]}
		>
			{props.leading}
			{props.isLoading ? (
				<ActivityIndicator color={"white"} style={{ marginHorizontal: "auto" }} />
			) : (
				<Text style={[styles.text, { color: getTextColor() }]}>{props.children}</Text>
			)}
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
	text: { fontWeight: "bold", marginHorizontal: "auto" },
});
