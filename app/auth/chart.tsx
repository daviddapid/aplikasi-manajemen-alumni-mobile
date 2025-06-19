import { Appbar } from "@/components/Appbar";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Padding } from "@/components/Padding";
import { Row } from "@/components/Row";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { getChartData } from "@/features/alumni/api/alumni-api";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { BarChart, barDataItem, PieChart, pieDataItem } from "react-native-gifted-charts";

export default function ChartPage() {
	const [barData, setBarData] = useState<barDataItem[]>();
	const [pieData, setPieData] = useState<pieDataItem[]>();
	const barColor = ["#4E79A7", "#F28E2B", "#59A14F", "#E15759"];
	const pieColor = ["#F77F00", "#3A86FF", "#D62828"];
	const [refreshing, setRefreshing] = useState(false);
	const [tahunLulus, setTahunLulus] = useState<string>();

	useEffect(() => {
		fetchChartData();
	}, []);

	const fetchChartData = async () => {
		const res = await getChartData(tahunLulus);
		const barData: barDataItem[] = [
			{ value: res?.data?.bar_data.total_kuliah, frontColor: barColor[0] },
			{ value: res?.data?.bar_data.total_kerja, frontColor: barColor[1] },
			{ value: res?.data?.bar_data.total_kuliah_dan_kerja, frontColor: barColor[2] },
			{ value: res?.data?.bar_data.total_pengangguran, frontColor: barColor[3] },
		];
		const pieData: pieDataItem[] = [
			{
				value: res?.data?.pie_data.pct_kuliah_sesuai!,
				color: pieColor[0],
				text: res?.data?.pie_data.pct_kuliah_sesuai! + "%",
			},
			{
				value: res?.data?.pie_data.pct_kerja_sesuai!,
				color: pieColor[1],
				text: res?.data?.pie_data.pct_kerja_sesuai! + "%",
			},
			{
				value: res?.data?.pie_data.pct_tidak_sesuai!,
				color: pieColor[2],
				text: res?.data?.pie_data.pct_tidak_sesuai! + "%",
			},
		];
		setBarData(barData);
		setPieData(pieData);
	};

	return (
		<Container>
			<Appbar title="Grafik Alumni" />
			<ScrollView
				style={{ flex: 1 }}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={() => {
							setRefreshing(true);
							fetchChartData().then(() => setRefreshing(false));
						}}
					/>
				}
			>
				<Padding>
					<Card style={{ flexDirection: "row", alignItems: "flex-end", gap: 15, marginBottom: 10 }}>
						<TextInput
							label="Tahun Lulus"
							placeholder="masukkan tahun lulus"
							keyboardType="numeric"
							containerStyle={{ flex: 1 }}
							value={tahunLulus}
							onChangeText={setTahunLulus}
						/>
						<Row gap={5}>
							<Button
								style={{ paddingBlock: 12 }}
								variant="gray"
								onPress={() => {
									setTahunLulus(undefined);
									fetchChartData();
								}}
							>
								Reset
							</Button>
							<Button style={{ paddingBlock: 12 }} onPress={fetchChartData}>
								Filter
							</Button>
						</Row>
					</Card>
					<Card>
						<Text style={{ fontSize: 20, fontWeight: 500, textAlign: "center" }}>Sebaran Alumni</Text>
						<View style={{ alignItems: "center", marginTop: 20 }}>
							<View>
								<BarChart data={barData} />
							</View>
							<Row gap={12} style={{ flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
								<AlumniLegendItem text="Kuliah" color={barColor[0]} />
								<AlumniLegendItem text="Bekerja" color={barColor[1]} />
								<AlumniLegendItem text="Kuliah & Bekerja" color={barColor[2]} />
								<AlumniLegendItem text="Jobless" color={barColor[3]} />
							</Row>
						</View>
					</Card>
					<Card style={{ marginTop: 20 }}>
						<Text style={{ fontSize: 20, fontWeight: 500, textAlign: "center" }}>
							Persentase Kesesuaian Kuliah Alumni
						</Text>
						<View style={{ alignItems: "center", marginTop: 20 }}>
							<PieChart
								donut
								data={pieData ?? []}
								showText
								// showTextBackground
								textSize={15}
								fontWeight={"800"}
								textColor="white"
								showValuesAsLabels
							/>
						</View>
						<Row
							gap={12}
							style={{ flexWrap: "wrap", alignItems: "center", justifyContent: "center", marginTop: 15 }}
						>
							<AlumniLegendItem text="Kuliah Sesuai" color={pieColor[0]} />
							<AlumniLegendItem text="Kerja Sesuai" color={pieColor[1]} />
							<AlumniLegendItem text="Tidak Sesuai" color={pieColor[2]} />
						</Row>
					</Card>
				</Padding>
			</ScrollView>
		</Container>
	);
}

export const AlumniLegendItem = ({ text, color }: { text: string; color: string }) => {
	return (
		<Row gap={5}>
			<View style={{ width: 10, aspectRatio: 1, backgroundColor: color, borderRadius: 100 }} />
			<Text>{text}</Text>
		</Row>
	);
};
