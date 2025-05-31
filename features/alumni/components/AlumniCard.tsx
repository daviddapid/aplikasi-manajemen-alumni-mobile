import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import { theme } from "@/theme";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Alumni } from "../types/Alumni";

type Props = {
	alumni: Alumni;
};

export const AlumniCard = ({ alumni }: Props) => {
	const info = useMemo(() => alumni.tempat_kerja ?? alumni.tempat_kuliah, [alumni]);

	return (
		<TouchableOpacity onPress={() => router.push(`/auth/detail/${alumni.id}`)}>
			<Card style={styles.card}>
				<Image style={styles.avatar} />
				<View>
					<Text style={{ fontWeight: "bold", fontSize: theme.fontSizes.md }}>{alumni.nama}</Text>
					<Text style={{ marginTop: theme.spaces.sm }}>{info ?? "-"}</Text>
				</View>
			</Card>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: { ...theme.borders.base, flexDirection: "row", gap: 20 },
	avatar: { width: 50, height: 50, backgroundColor: theme.colors.gray, borderRadius: 50 },
});
