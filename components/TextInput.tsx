import { theme } from "@/theme";
import { TextInput as RNTextInput, StyleSheet, View } from "react-native";
import { Text } from "./Text";

type Props = {
	label?: string;
	placeholder?: string;
	className?: string;
	onChangeText?: (text: string) => void;
	value?: string;
};

export const TextInput = (props: Props) => {
	return (
		<View className={props.className}>
			{props.label && <Text style={styles.label}>{props.label}</Text>}
			<RNTextInput
				style={styles.input}
				placeholder={props.placeholder}
				value={props.value}
				onChangeText={props.onChangeText}
			/>
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
