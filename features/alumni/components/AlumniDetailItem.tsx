import { Text } from "@/components/Text";
import { inspect } from "@/helper/inspect";
import { View } from "react-native";

type Props = {
	text1: string;
	text2: string | undefined | null;
};

export const AlumniDetailItem = (props: Props) => {
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "flex-start",
				justifyContent: "space-between",
				gap: 10,

				...inspect("black"),
			}}
		>
			<View style={{ flex: 1 }}>
				<Text style={{ flexWrap: "wrap" }}>{props.text1}</Text>
			</View>
			<View style={{ flex: 1 }}>
				<Text style={{ flexWrap: "wrap" }}>{props.text2 ?? "-"}</Text>
			</View>
		</View>
	);
};
