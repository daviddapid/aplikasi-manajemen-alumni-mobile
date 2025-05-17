import { Appbar } from "@/components/Appbar";
import { Badge } from "@/components/Badge";
import { Button, OutlineButton } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { DateInput } from "@/components/DateInput";
import { Padding } from "@/components/Padding";
import { Row } from "@/components/Row";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { theme } from "@/theme";
import { colors } from "@/theme/color";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { JSX, useRef, useState } from "react";
import { View } from "react-native";
import PagerView from "react-native-pager-view";

export default function CreateAlumniPage() {
	const [currentStep, setCurrentStep] = useState(0);
	const stepsRef = useRef<PagerView>(null);
	const [tglLahir, setTglLahir] = useState<Date>();

	return (
		<Container>
			<Appbar title="Tambah Data Alumni" />
			<Row gap={10} style={{ justifyContent: "space-evenly", marginTop: theme.spaces.xl }}>
				<StepIndicator
					active={currentStep > 0}
					text="Biodata"
					icon={<MaterialIcons name="person" color={colors.primary} size={23} />}
				/>
				<StepIndicator
					active={currentStep > 1}
					text="Kontak"
					icon={<MaterialIcons name="phone" color={colors.primary} size={23} />}
				/>
				<StepIndicator
					active={currentStep > 2}
					text="Perkuliahan"
					icon={<FontAwesome name="mortar-board" color={colors.primary} size={18} />}
				/>
				<StepIndicator
					active={currentStep > 3}
					text="Pekerjaan"
					icon={<MaterialCommunityIcons name="bag-checked" color={colors.primary} size={22} />}
				/>
			</Row>
			<PagerView
				ref={stepsRef}
				onPageSelected={(e) => setCurrentStep(e.nativeEvent.position)}
				style={{
					flex: 1,
				}}
			>
				<Padding>
					<Card style={{ gap: theme.spaces.lg, boxShadow: theme.shadows.sm }}>
						<TextInput label="Nama" />
						<DateInput label="Tanggal Lahir" value={tglLahir} onChangeDate={setTglLahir} />
						<Row gap={15}>
							<TextInput label="Tahun Masuk" containerStyle={{ flex: 1 }} />
							<TextInput label="Tahun Lulus" containerStyle={{ flex: 1 }} />
						</Row>

						<Button
							onPress={() => stepsRef.current?.setPage(currentStep + 1)}
							style={{ marginTop: theme.spaces.lg }}
						>
							Selanjutnya
						</Button>
					</Card>
				</Padding>
				<Padding>
					<Card style={{ gap: theme.spaces.lg, boxShadow: theme.shadows.sm }}>
						<TextInput label="Nomor Telepon" />
						<TextInput label="Email" />
						<TextInput label="Alamat" />
						<Row gap={15} style={{ marginTop: theme.spaces.lg }}>
							<OutlineButton
								style={{ flex: 1 }}
								onPress={() => stepsRef.current?.setPage(currentStep - 1)}
							>
								Sebelumnya
							</OutlineButton>
							<Button style={{ flex: 1 }} onPress={() => stepsRef.current?.setPage(currentStep + 1)}>
								Selanjutnya
							</Button>
						</Row>
					</Card>
				</Padding>
				<Padding>
					<Card style={{ gap: theme.spaces.lg, boxShadow: theme.shadows.sm }}>
						<Badge text="Biarkan kosong jika alumni tidak berkuliah" />
						<TextInput label="Tempat Kerja" />
						<TextInput label="Jabatan" />
						<TextInput label="Kesesuaian Kerja" />
						<Row gap={15} style={{ marginTop: theme.spaces.lg }}>
							<OutlineButton
								style={{ flex: 1 }}
								onPress={() => stepsRef.current?.setPage(currentStep - 1)}
							>
								Sebelumnya
							</OutlineButton>
							<Button style={{ flex: 1 }} onPress={() => stepsRef.current?.setPage(currentStep + 1)}>
								Selanjutnya
							</Button>
						</Row>
					</Card>
				</Padding>
				<Padding>
					<Card style={{ gap: theme.spaces.lg, boxShadow: theme.shadows.sm }}>
						<Badge text="Biarkan kosong jika alumni tidak bekerja" />
						<TextInput label="Tempat Kerja" />
						<TextInput label="Jabatan" />
						<TextInput label="Kesesuaian Kerja" />
						<Row gap={15} style={{ marginTop: theme.spaces.lg }}>
							<OutlineButton
								style={{ flex: 1 }}
								onPress={() => stepsRef.current?.setPage(currentStep - 1)}
							>
								Sebelumnya
							</OutlineButton>
							<Button style={{ flex: 1 }} onPress={() => stepsRef.current?.setPage(currentStep + 1)}>
								Simpan
							</Button>
						</Row>
					</Card>
				</Padding>
			</PagerView>
		</Container>
	);
}

export const StepIndicator = ({ text, icon, active }: { text: string; icon: JSX.Element; active: boolean }) => {
	return (
		<View style={{ justifyContent: "center", alignItems: "center", gap: theme.spaces.sm }}>
			<View
				style={[
					{
						backgroundColor: theme.colors.softPrimary,
						borderColor: theme.colors.primary,
						borderWidth: 1,
						borderRadius: 50,
						width: 35,
						height: 35,
						justifyContent: "center",
						alignItems: "center",
					},
					active && { backgroundColor: theme.colors.primary },
				]}
			>
				{active ? <MaterialIcons name="check" size={23} color={"white"} /> : icon}
			</View>
			<Text>{text}</Text>
		</View>
	);
};
