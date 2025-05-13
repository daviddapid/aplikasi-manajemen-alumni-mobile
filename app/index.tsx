import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Row } from "@/components/Row";
import { Spacing } from "@/components/Spacing";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { theme } from "@/theme";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { FlatList } from "react-native";

export default function IndexPage() {
	return (
		<Container>
			<Card style={{ borderRadius: 0, boxShadow: theme.shadows.sm, zIndex: 2 }}>
				<Row gap={8}>
					<Button trailing={<Entypo name="plus" color={"white"} size={15} />}>Tambah Alumni</Button>
					<Button
						onPress={() => router.push("/chart")}
						variant="secondary"
						trailing={<Entypo name="pie-chart" color={"white"} size={15} />}
					>
						Lihat Grafik
					</Button>
				</Row>
				<Row gap={10} style={{ marginTop: theme.spaces.xl }}>
					<TextInput label="Cari Alumni" placeholder="Nama/Tempat Kerja/Tempat Kuliah..." />
					<TextInput label="Angkatan" className="flex-1" />
				</Row>
			</Card>
			<FlatList
				contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 14 }}
				data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
				ItemSeparatorComponent={() => <Spacing vertical={4} />}
				renderItem={() => (
					<Card style={theme.borders.base}>
						<Text style={{ fontWeight: "bold", fontSize: theme.fontSizes.md }}>Sarah Olivia</Text>
						<Text style={{ marginTop: theme.spaces.sm }}>IT, Fullstack Dev at PT. Bangkrut</Text>
					</Card>
				)}
			/>
		</Container>
	);
}
