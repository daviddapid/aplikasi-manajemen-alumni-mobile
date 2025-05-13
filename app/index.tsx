import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Row } from "@/components/Row";
import { Spacing } from "@/components/Spacing";
import { TextInput } from "@/components/TextInput";
import { AlumniCard } from "@/features/alumni/components/AlumniCard";
import { useAlumnis } from "@/features/alumni/hooks/useAlumnis";
import { theme } from "@/theme";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { ActivityIndicator, FlatList } from "react-native";

export default function IndexPage() {
	const { data: alumnis, refetch, fetchNextPage, isFetchingNextPage } = useAlumnis();

	return (
		<Container>
			<Card style={{ borderRadius: 0, boxShadow: theme.shadows.sm, zIndex: 2 }}>
				<Row gap={8}>
					<Button
						trailing={
							<Entypo name="plus" color={"white"} size={15} onPress={() => router.push("/create")} />
						}
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
					<TextInput label="Cari Alumni" placeholder="Nama/Tempat Kerja/Tempat Kuliah..." />
					<TextInput label="Angkatan" className="flex-1" />
				</Row>
			</Card>
			<FlatList
				onRefresh={refetch}
				onEndReached={() => fetchNextPage()}
				refreshing={isFetchingNextPage}
				contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 14 }}
				data={alumnis}
				ItemSeparatorComponent={() => <Spacing vertical={4} />}
				renderItem={({ item }) => (
					<AlumniCard name={item.nama} info={item.tempat_kerja ?? item.tempat_kuliah ?? "-"} />
				)}
				ListFooterComponent={() => isFetchingNextPage ?? <ActivityIndicator size={"large"} color={"black"} />}
			/>
		</Container>
	);
}
