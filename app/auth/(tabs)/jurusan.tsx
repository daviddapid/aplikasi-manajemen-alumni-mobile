import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { DateInput } from "@/components/DateInput";
import { Modal } from "@/components/Modal";
import { Padding } from "@/components/Padding";
import { Row } from "@/components/Row";
import { Spacing } from "@/components/Spacing";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { Api } from "@/config/api";
import { JurusanCard } from "@/features/jurusan/components/JurusanCard";
import { useJurusan } from "@/features/jurusan/hooks/useJurusan";
import { Jurusan } from "@/features/jurusan/types/Jurusan";
import { formatDateToMySQLDateTime } from "@/helper/date";
import { theme } from "@/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function JurusanPage() {
	const {
		jurusans,
		search,
		setSearch,
		isLoading,
		isDebouncing,
		nama,
		setNama,
		tglBerdiri,
		setTglBerdiri,
		handleCreateJurusan,
		fetchJurusans,
		refreshing,
	} = useJurusan();
	const [showModalCreate, setShowModalCreate] = useState(false);

	const [selectedJurusan, setSelectedJurusan] = useState<Jurusan | null>(null);

	const editJurusan = (jurusan: Jurusan) => {
		setSelectedJurusan(jurusan);
		setNama({ val: jurusan.nama });
		setTglBerdiri({ val: new Date(jurusan.tgl_berdiri) });
	};

	const submitUpdateJurusan = async () => {
		const { data } = await Api.put(`jurusans/${selectedJurusan?.id}`, {
			...selectedJurusan,
			nama: nama?.val,
			tgl_berdiri: formatDateToMySQLDateTime(tglBerdiri?.val!),
		});
		console.log(data);

		fetchJurusans();
		onCloseEditJurusan();
	};

	const submitDeleteJurusan = async () => {
		const { data } = await Api.delete(`jurusans/${selectedJurusan?.id}`);
		console.log(data);

		fetchJurusans();
		onCloseEditJurusan();
	};

	const onCloseEditJurusan = () => {
		setSelectedJurusan(null);
		setNama({});
		setTglBerdiri({});
	};

	return (
		<>
			<Container>
				<Card style={{ borderRadius: 0, boxShadow: theme.shadows.sm }}>
					<Row gap={15}>
						<TextInput
							value={search}
							onChangeText={setSearch}
							containerStyle={{ flex: 1 }}
							placeholder="Cari Jurusan..."
						/>
						<Button
							style={{ height: "100%" }}
							trailing={<MaterialCommunityIcons name="plus" color={"white"} size={15} />}
							onPress={() => setShowModalCreate(true)}
						>
							Tambah Jurusan
						</Button>
					</Row>
				</Card>
				<Padding>
					{isLoading ? (
						<ActivityIndicator size={"large"} />
					) : (
						<FlatList
							data={jurusans}
							numColumns={2}
							onRefresh={fetchJurusans}
							refreshing={refreshing}
							renderItem={({ item }) => (
								<JurusanCard
									nama={item.nama}
									tglBerdiri={item.tgl_berdiri}
									onPress={() => editJurusan(item)}
								/>
							)}
							columnWrapperStyle={{ gap: theme.spaces.base }}
							ItemSeparatorComponent={() => <Spacing vertical={theme.spaces.base} />}
							ListHeaderComponent={() =>
								isDebouncing && (
									<Text style={{ textAlign: "center", marginBottom: theme.spaces.lg }}>
										sedang mencari...
									</Text>
								)
							}
						/>
					)}
				</Padding>
			</Container>
			<Modal title="Buat Jurusan Baru" visible={showModalCreate} closeModal={() => setShowModalCreate(false)}>
				<View style={{ gap: 15, marginBottom: 35 }}>
					<TextInput
						label="Nama Jurusan"
						value={nama?.val}
						onChangeText={(text) => setNama({ val: text })}
						errorMessage={nama?.err}
					/>
					<DateInput
						label="Tanggal Berdiri"
						onChangeDate={(date) => setTglBerdiri({ val: date })}
						value={tglBerdiri?.val}
						errorMessage={tglBerdiri?.err}
					/>
				</View>
				<Button onPress={() => handleCreateJurusan(() => setShowModalCreate(false))}>Simpan</Button>
			</Modal>
			<Modal title="Edit Jurusan" visible={!!selectedJurusan} closeModal={onCloseEditJurusan}>
				<View style={{ gap: 15, marginBottom: 35 }}>
					<TextInput
						label="Nama Jurusan"
						value={nama?.val}
						onChangeText={(text) => setNama({ val: text })}
						errorMessage={nama?.err}
					/>
					<DateInput
						label="Tanggal Berdiri"
						onChangeDate={(date) => setTglBerdiri({ val: date })}
						value={tglBerdiri?.val}
						errorMessage={tglBerdiri?.err}
					/>
				</View>
				<Row gap={5} style={{ justifyContent: "flex-end" }}>
					<Button variant="danger" onPress={submitDeleteJurusan}>
						Hapus
					</Button>
					<Button onPress={submitUpdateJurusan}>Update</Button>
				</Row>
			</Modal>
		</>
	);
}
