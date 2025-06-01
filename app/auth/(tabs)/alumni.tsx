import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Modal } from "@/components/Modal";
import { Row } from "@/components/Row";
import { Spacing } from "@/components/Spacing";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { Api } from "@/config/api";
import { AlumniCard } from "@/features/alumni/components/AlumniCard";
import { useAlumnis } from "@/features/alumni/hooks/useAlumnis";
import { theme } from "@/theme";
import { spaces } from "@/theme/layout";
import { Response } from "@/types/Response";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import * as DocumentPicker from "expo-document-picker";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function IndexPage() {
	const { alumnis, fetchAlumnis, loading, isFetchingMore, loadMore, isDebouncing, setQuery, resetQuery, query } =
		useAlumnis();
	const [showModalExcel, setShowModalExcel] = useState(false);
	const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);

	const fileUrl = process.env.EXPO_PUBLIC_DONWLOAD_URL + "template_import_alumni.xlsx";

	const handleDownload = () => {
		Linking.openURL(fileUrl);
	};

	const handlePickFile = async () => {
		const result = await DocumentPicker.getDocumentAsync({
			type: "*/*", // atau 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' untuk .xlsx
			copyToCacheDirectory: true,
		});

		if (!result.canceled) {
			setSelectedFile(result);
		}
	};

	const handleSubmitExcel = async () => {
		if (!selectedFile) return;

		const formData = new FormData();
		if (!selectedFile.assets) {
			return;
		}
		formData.append("alumni_excel", {
			uri: selectedFile.assets[0].uri,
			name: selectedFile.assets[0].name,
			type: selectedFile.assets[0].mimeType,
		} as any);

		try {
			const response = await Api.post<Response>("alumnis/import", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			if (response.data.status === "fail") {
				Toast.show({
					type: "error",
					text1: response.data.message,
				});
				return;
			}
			setSelectedFile(null);
			setShowModalExcel(false);
			Toast.show({
				type: "success",
				text1: response.data.message,
			});
		} catch (error) {
			console.error("Upload error:", error);
		}
	};

	return (
		<Container>
			<Card style={{ borderRadius: 0, boxShadow: theme.shadows.sm, zIndex: 2, paddingHorizontal: 0 }}>
				<Row gap={8} enableScroll style={{ paddingHorizontal: 15 }}>
					<Button
						onPress={() => router.push("/auth/create")}
						trailing={<Entypo name="plus" color={"white"} size={15} />}
					>
						Tambah Alumni
					</Button>
					<Button
						onPress={() => router.push("/auth/chart")}
						variant="secondary"
						trailing={<Entypo name="pie-chart" color={"white"} size={15} />}
					>
						Lihat Grafik
					</Button>
					<Button variant="gray" onPress={resetQuery} trailing={<MaterialIcons name="history" size={15} />}>
						Reset Filter
					</Button>
					<Button
						variant="green"
						onPress={() => setShowModalExcel(true)}
						trailing={<MaterialCommunityIcons name="microsoft-excel" size={15} color={"white"} />}
					>
						Import
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
				style={{ flex: 1 }}
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
			<Modal visible={showModalExcel} closeModal={() => setShowModalExcel(false)} title="Import Excel">
				<Text>Klik link ini untuk donwload template import excel: </Text>
				<TouchableOpacity onPress={handleDownload}>
					<Text style={{ color: theme.colors.green, textDecorationLine: "underline" }}>
						Donwload Template
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={handlePickFile}
					style={{
						marginTop: 30,
						flexDirection: "row",
						justifyContent: "space-between",
						gap: 10,
						marginBottom: 30,
					}}
				>
					<TextInput
						value={selectedFile?.assets ? selectedFile?.assets[0].name : "belum ada file"}
						disable={true}
						containerStyle={{ flex: 1 }}
					/>
					<Button variant="gray" onPress={() => setSelectedFile(null)}>
						Reset
					</Button>
				</TouchableOpacity>
				<Button variant="green" onPress={handleSubmitExcel}>
					Submit
				</Button>
			</Modal>
		</Container>
	);
}
