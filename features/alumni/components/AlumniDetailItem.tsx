import { Text } from "@/components/Text";
import { View } from "react-native";

type Props = {
	text1: string;
	text2: string | undefined | null;
};

export const AlumniDetailItem = (props: Props) => {
	return (
		<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
			<Text>{props.text1}</Text>
			<Text>{props.text2 ?? "-"}</Text>
		</View>
	);
};
