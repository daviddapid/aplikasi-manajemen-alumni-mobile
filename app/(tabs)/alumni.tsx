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
import { MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function IndexPage() {
	const { alumnis, fetchAlumnis, loading, isFetchingMore, loadMore, isDebouncing, setQuery, resetQuery, query } =
		useAlumnis();

	return (
		<Container>
			<Card style={{ borderRadius: 0, boxShadow: theme.shadows.sm, zIndex: 2, paddingHorizontal: 0 }}>
				<Row gap={8} enableScroll style={{ paddingHorizontal: 15 }}>
					<Button
						onPress={() => router.push("/create")}
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
					<Button variant="gray" onPress={resetQuery} trailing={<MaterialIcons name="history" size={15} />}>
						Reset Filter
					</Button>
				</Row>
				<View style={{ marginTop: theme.spaces.xl, gap: theme.spaces.md }}>
					<Text style={{ marginLeft: 15 }}>Cari Alumni</Text>
					<Row gap={10} enableScroll style={{ paddingHorizontal: 15 }}>
						<TextInput
							inputStyle={{ minWidth: 210 }}
							placeholder="Nama/Tempat Kerja/Kuliah..."
							onChangeText={(val) => setQuery((prev) => ({ ...prev, search: val }))}
							value={query?.search}
						/>
						<TextInput
							inputStyle={{ minWidth: 100 }}
							placeholder="tahun masuk"
							keyboardType="numeric"
							onChangeText={(val) => setQuery((prev) => ({ ...prev, tahunMulai: val }))}
							value={query?.tahunMulai}
						/>
						<TextInput
							inputStyle={{ minWidth: 100 }}
							placeholder="tahun lulus"
							keyboardType="numeric"
							onChangeText={(val) => setQuery((prev) => ({ ...prev, tahunLulus: val }))}
							value={query?.tahunLulus}
						/>
					</Row>
				</View>
			</Card>
			<FlatList
				initialNumToRender={10}
				onRefresh={fetchAlumnis}
				onEndReached={loadMore}
				refreshing={loading}
				contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 14 }}
				data={alumnis}
				ItemSeparatorComponent={() => <Spacing vertical={4} />}
				renderItem={({ item }) => <AlumniCard alumni={item} />}
				ListHeaderComponent={() =>
					!loading &&
					isDebouncing && (
						<Text style={{ marginBottom: spaces.lg, textAlign: "center" }}>sedang mencari...</Text>
					)
				}
				ListFooterComponent={() =>
					isFetchingMore && <ActivityIndicator color={"black"} style={{ marginTop: spaces.lg }} />
				}
				ListEmptyComponent={() => !loading && <Badge text="Tidak ada data" />}
			/>
		</Container>
	);
}
