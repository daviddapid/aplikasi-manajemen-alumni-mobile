import { View } from "react-native";

export const Spacing = ({ vertical, horizontal }: { vertical?: number; horizontal?: number }) => {
	return <View style={{ marginHorizontal: horizontal, marginVertical: vertical }}></View>;
};
