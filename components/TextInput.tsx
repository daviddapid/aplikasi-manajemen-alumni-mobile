import { theme } from "@/theme";
import {
	KeyboardTypeOptions,
	TextInput as RNTextInput,
	StyleProp,
	StyleSheet,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";
import { Text } from "./Text";

type Props = {
	label?: string;
	placeholder?: string;
	onChangeText?: (text: string) => void;
	value?: string;
	keyboardType?: KeyboardTypeOptions;
	inputStyle?: StyleProp<TextStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	errorMessage?: string;
};

export const TextInput = (props: Props) => {
	return (
		<View style={props.containerStyle}>
			{props.label && <Text style={styles.label}>{props.label}</Text>}
			<RNTextInput
				keyboardType={props.keyboardType}
				style={[styles.input, props.inputStyle, props.errorMessage && { borderColor: theme.colors.red }]}
				placeholder={props.placeholder}
				value={props.value}
				onChangeText={props.onChangeText}
			/>
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
