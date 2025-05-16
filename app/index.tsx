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
import { ActivityIndicator, FlatList, View } from "react-native";

export default function IndexPage() {
	const { alumnis, fetchAlumnis, loading, isFetchingMore, loadMore, isDebouncing, setQuery } = useAlumnis();

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
				<View style={{ marginTop: theme.spaces.xl, gap: theme.spaces.md }}>
					<Text>Cari Alumni</Text>
					<Row gap={10} enableScroll>
						<TextInput
							inputStyle={{ minWidth: 210 }}
							placeholder="Nama/Tempat Kerja/Kuliah..."
							onChangeText={(val) => setQuery((prev) => ({ ...prev, search: val }))}
						/>
						<TextInput
							inputStyle={{ minWidth: 100 }}
							placeholder="tahun masuk"
							keyboardType="numeric"
							onChangeText={(val) => setQuery((prev) => ({ ...prev, tahunMulai: val }))}
						/>
						<TextInput
							inputStyle={{ minWidth: 100 }}
							placeholder="tahun lulus"
							keyboardType="numeric"
							onChangeText={(val) => setQuery((prev) => ({ ...prev, tahunLulus: val }))}
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
