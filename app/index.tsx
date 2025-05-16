import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Row } from "@/components/Row";
import { Spacing } from "@/components/Spacing";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { AlumniCard } from "@/features/alumni/components/AlumniCard";
import { useAlumnis } from "@/features/alumni/hooks/useAlumnis";
import { theme } from "@/theme";
import { spaces } from "@/theme/layout";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { ActivityIndicator, FlatList } from "react-native";

export default function IndexPage() {
	const { alumnis, search, setSearch, fetchAlumnis, loading, isFetchingMore, loadMore, isDebouncing } = useAlumnis();

	return (
		<Container>
			<Card style={{ borderRadius: 0, boxShadow: theme.shadows.sm, zIndex: 2 }}>
				<Row gap={8}>
					<Button
						onPress={() => router.push("/create/step1")}
						trailing={<Entypo name="plus" color={"white"} size={15} />}
					>
						Tambah Alumni
					</Button>
					<Button
						onPress={() => router.push("/chart")}
						variant="secondary"
						trailing={<Entypo name="pie-chart" color={"white"} size={15} />}
					>
						Lihat Grafik
					</Button>
				</Row>
				<Row gap={10} style={{ marginTop: theme.spaces.xl }}>
					<TextInput
						label="Cari Alumni"
						placeholder="Nama/Tempat Kerja/Tempat Kuliah..."
						onChangeText={setSearch}
						value={search}
					/>
					<TextInput label="Angkatan" className="flex-1" />
				</Row>
			</Card>
			<FlatList
				onRefresh={fetchAlumnis}
				onEndReached={loadMore}
				refreshing={loading}
				contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 14 }}
				data={alumnis}
				ItemSeparatorComponent={() => <Spacing vertical={4} />}
				renderItem={({ item }) => <AlumniCard alumni={item} />}
				ListHeaderComponent={() =>
					isDebouncing && (
						<Text style={{ marginBottom: spaces.lg, textAlign: "center" }}>sedang mencari...</Text>
					)
				}
				ListFooterComponent={() =>
					isFetchingMore && <ActivityIndicator color={"black"} style={{ marginTop: spaces.lg }} />
				}
				ListEmptyComponent={() => <Badge text="Tidak ada data" />}
			/>
		</Container>
	);
}
