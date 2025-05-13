import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import { theme } from "@/theme";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

type Props = {
	name: string;
	info: string;
};

export const AlumniCard = (props: Props) => {
	return (
		<Card style={styles.card}>
			<Image style={styles.avatar} />
			<View>
				<Text style={{ fontWeight: "bold", fontSize: theme.fontSizes.md }}>{props.name}</Text>
				<Text style={{ marginTop: theme.spaces.sm }}>{props.info}</Text>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: { ...theme.borders.base, flexDirection: "row", gap: 20 },
	avatar: { width: 50, height: 50, backgroundColor: theme.colors.gray, borderRadius: 50 },
});
