import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import { formatDateFromString } from "@/helper/date";
import { theme } from "@/theme";
import { TouchableOpacity } from "react-native";
type Props = {
	nama: string;
	tglBerdiri: string;
	onPress: () => void;
};
export const JurusanCard = (props: Props) => {
	return (
		<TouchableOpacity onPress={props.onPress} style={{ flex: 1, maxWidth: "50%" }}>
			<Card style={[{ gap: theme.spaces.base }, theme.borders.base]}>
				<Text style={{ fontSize: theme.fontSizes.md }}>{props.nama}</Text>
				<Text style={{ fontSize: theme.fontSizes.sm, color: theme.colors.darkGray }}>
					Didirikan: {formatDateFromString(props.tglBerdiri)}
				</Text>
			</Card>
		</TouchableOpacity>
	);
};
