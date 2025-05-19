import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import { formatDateFromString } from "@/helper/date";
import { theme } from "@/theme";
type Props = {
	nama: string;
	tglBerdiri: string;
};
export const JurusanCard = (props: Props) => {
	return (
		<Card style={[{ flex: 1, gap: theme.spaces.base, maxWidth: "50%" }, theme.borders.base]}>
			<Text style={{ fontSize: theme.fontSizes.md }}>{props.nama}</Text>
			<Text style={{ fontSize: theme.fontSizes.sm, color: theme.colors.darkGray }}>
				Didirikan: {formatDateFromString(props.tglBerdiri)}
			</Text>
		</Card>
	);
};
