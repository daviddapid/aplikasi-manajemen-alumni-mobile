import { Card } from "@/components/Card";
import { Row } from "@/components/Row";
import { Text } from "@/components/Text";
import { theme } from "@/theme";
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
				<View>
					<Row style={{ justifyContent: "space-between", width: "100%" }}>
						<Text style={{ fontWeight: "bold", fontSize: theme.fontSizes.md }}>{alumni.nama}</Text>
						<Row
							style={{
								backgroundColor: theme.colors.softPrimary,
								justifyContent: "center",
								borderWidth: 1,
								borderColor: theme.colors.primary,
								borderRadius: 8,
								width: "auto",
								paddingVertical: 2,
								paddingHorizontal: 5,
							}}
							gap={3}
						>
							<Text style={{ fontSize: 12, color: theme.colors.primary }}>{alumni.tahun_mulai}</Text>
							<Text style={{ fontSize: 12, color: theme.colors.primary }}>-</Text>
							<Text style={{ fontSize: 12, color: theme.colors.primary }}>{alumni.tahun_lulus}</Text>
						</Row>
					</Row>
					<Text style={{ marginTop: theme.spaces.sm }}>{info ?? "-"}</Text>
				</View>
			</Card>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: { ...theme.borders.base, flexDirection: "row", gap: 20 },
});
