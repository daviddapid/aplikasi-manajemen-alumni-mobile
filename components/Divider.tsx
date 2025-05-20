import { theme } from "@/theme";
import { StyleProp, View, ViewStyle } from "react-native";

export const Divider = ({ style }: { style?: StyleProp<ViewStyle> }) => {
	return <View style={[{ height: 0.8, backgroundColor: theme.colors.gray, marginVertical: 10 }, style]}></View>;
};
