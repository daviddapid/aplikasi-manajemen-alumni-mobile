import { formatDateToText } from "@/helper/date";
import { theme } from "@/theme";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
	KeyboardTypeOptions,
	TextInput as RNTextInput,
	StyleProp,
	StyleSheet,
	TextStyle,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";
import { Text } from "./Text";

type Props = {
	label?: string;
	placeholder?: string;
	onChangeDate: (date: Date) => void;
	value?: Date;
	keyboardType?: KeyboardTypeOptions;
	inputStyle?: StyleProp<TextStyle>;
	containerStyle?: StyleProp<ViewStyle>;
};

export const DateInput = (props: Props) => {
	const [isShowDatePicker, setIsShowDatePicker] = useState(false);

	function onChange(event: DateTimePickerEvent, selectedDate?: Date) {
		setIsShowDatePicker(false);
		if (selectedDate) {
			props.onChangeDate(selectedDate);
		}
	}

	return (
		<>
			<View style={props.containerStyle}>
				{props.label && <Text style={styles.label}>{props.label}</Text>}
				<TouchableOpacity onPress={() => setIsShowDatePicker(true)}>
					<RNTextInput
						style={[styles.input, props.inputStyle]}
						placeholder={props.placeholder}
						value={props.value && formatDateToText(props.value)}
						readOnly
					/>
				</TouchableOpacity>
			</View>
			{isShowDatePicker && (
				<DateTimePicker
					testID="dateTimePicker"
					value={props.value ?? new Date()}
					is24Hour={true}
					onChange={onChange}
				/>
			)}
		</>
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
