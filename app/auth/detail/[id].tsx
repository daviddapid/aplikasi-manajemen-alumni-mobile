import { Appbar } from "@/components/Appbar";
import { Button, OutlineButton } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { DateInput } from "@/components/DateInput";
import { InputWrapper } from "@/components/InputWrapper";
import { Modal } from "@/components/Modal";
import { Padding } from "@/components/Padding";
import { Row } from "@/components/Row";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { deleteAlumni, getDetailAlumni, updateAlumni } from "@/features/alumni/api/alumni-api";
import { Step1FormValues } from "@/features/alumni/components/FormSteps/Step1Form";
import { Step2FormValues } from "@/features/alumni/components/FormSteps/Step2Form";
import { Step3FormValues } from "@/features/alumni/components/FormSteps/Step3Form";
import { Step4FormValues } from "@/features/alumni/components/FormSteps/Step4Form";
import { UpdateAlumniDTO } from "@/features/alumni/types/AlumniDTO";
import { JurusanPicker } from "@/features/jurusan/components/JurusanPicker";
import { formatDateToMySQLDateTime } from "@/helper/date";
import { theme } from "@/theme";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView } from "react-native";
import Toast from "react-native-toast-message";

type FormValues = Step1FormValues & Step2FormValues & Step3FormValues & Step4FormValues;

export default function AlumniDetailPage() {
	const { id } = useLocalSearchParams();
	const [isLoading, setIsLoading] = useState(true);
	const [isDeleting, setisDeleting] = useState(false);
	const form = useForm<FormValues>();
	const [askModalDelete, setAskModalDelete] = useState(false);
	useEffect(() => {
		fetchDetail();
	}, []);

	const validation = {
		required: {
			value: true,
			message: "Tidak boleh kosong",
		},
	} satisfies RegisterOptions;

	const fetchDetail = async () => {
		const res = await getDetailAlumni(id);
		const alumni = {
			...res.data,
			tgl_lahir: new Date(res.data?.tgl_lahir!),
			jurusan_id: res.data?.jurusan.id!,
		};
		form.reset(alumni as FormValues);
		setIsLoading(false);
	};

	const onUpdate: SubmitHandler<FormValues> = async (data) => {
		console.log(data);
		const dto: UpdateAlumniDTO = {
			...data,
			tgl_lahir: formatDateToMySQLDateTime(data.tgl_lahir),
		};
		const res = await updateAlumni(parseInt(id as string), dto);

		if (res?.status === "fail") {
			Toast.show({
				type: "error",
				text1: res.message,
			});
			return;
		}

		const alumni = {
			...res?.data,
			tgl_lahir: new Date(res?.data?.tgl_lahir!),
			jurusan_id: res?.data?.jurusan.id!,
		};
		Toast.show({
			text1: res?.message,
		});
		form.reset(alumni as FormValues);
	};

	const handleDelete = async () => {
		setisDeleting(true);
		const res = await deleteAlumni(parseInt(id as string));
		setisDeleting(false);
		Toast.show({
			type: "success",
			text1: res?.message,
		});
		router.replace("/auth/alumni");
	};

	return (
		<Container>
			<Appbar
				title="Alumni Detail"
				action={
					<Button
						onPress={form.handleSubmit(onUpdate)}
						trailing={<FontAwesome5 name="save" color="white" size={15} />}
					>
						Save
					</Button>
				}
			/>
			{isLoading ? (
				<ActivityIndicator size={"large"} />
			) : (
				<ScrollView style={{ flex: 1 }}>
					<Padding flexGap={15}>
						<Card style={{ boxShadow: theme.shadows.sm, gap: 12 }}>
							<Text style={{ fontSize: 23, marginBottom: 10, fontWeight: 600 }}>Biodata</Text>
							<Controller
								control={form.control}
								name="nama"
								rules={validation}
								render={({ field: { value, onChange } }) => (
									<TextInput
										label="Nama"
										value={value}
										onChangeText={onChange}
										errorMessage={form.formState.errors.nama?.message}
									/>
								)}
							/>
							<Controller
								control={form.control}
								name="tgl_lahir"
								rules={validation}
								render={({ field: { value, onChange } }) => (
									<DateInput
										label="Tanggal Lahir"
										value={value}
										onChangeDate={(date) => {
											onChange(date);
										}}
										errorMessage={form.formState.errors.nama?.message}
									/>
								)}
							/>
							<Row gap={15}>
								<Controller
									control={form.control}
									name="tahun_mulai"
									rules={validation}
									render={({ field: { value, onChange } }) => (
										<TextInput
											keyboardType="numeric"
											label="Tahun Masuk"
											containerStyle={{ flex: 1 }}
											value={value}
											onChangeText={onChange}
											errorMessage={form.formState.errors.tahun_mulai?.message}
										/>
									)}
								/>
								<Controller
									control={form.control}
									name="tahun_lulus"
									rules={validation}
									render={({ field: { value, onChange } }) => (
										<TextInput
											keyboardType="numeric"
											label="Tahun Lulus"
											containerStyle={{ flex: 1 }}
											value={value}
											onChangeText={onChange}
											errorMessage={form.formState.errors.tahun_lulus?.message}
										/>
									)}
								/>
							</Row>
							<Controller
								control={form.control}
								name="jurusan_id"
								rules={validation}
								render={({ field: { value, onChange } }) => (
									<InputWrapper
										label="Jurusan"
										enableBorder
										errorMessage={form.formState.errors.jurusan_id?.message}
									>
										<JurusanPicker value={value} onChange={onChange} />
									</InputWrapper>
								)}
							/>
						</Card>
						<Card style={{ boxShadow: theme.shadows.sm, gap: 12 }}>
							<Text style={{ fontSize: 23, marginBottom: 10, fontWeight: 600 }}>Kontak</Text>
							<Controller
								control={form.control}
								name="no_tlp"
								rules={validation}
								render={({ field: { value, onChange } }) => (
									<TextInput
										keyboardType="phone-pad"
										label="Nomor Telepon"
										value={value}
										onChangeText={onChange}
										errorMessage={form.formState.errors.no_tlp?.message}
									/>
								)}
							/>
							<Controller
								control={form.control}
								name="email"
								rules={{
									...validation,
									pattern: {
										value: /^\S+@\S+$/i,
										message: "Email tidak valid",
									},
								}}
								render={({ field: { value, onChange } }) => (
									<TextInput
										keyboardType="email-address"
										label="Email"
										value={value}
										onChangeText={onChange}
										errorMessage={form.formState.errors.email?.message}
									/>
								)}
							/>
							<Controller
								control={form.control}
								name="alamat"
								rules={validation}
								render={({ field: { value, onChange } }) => (
									<TextInput
										label="Alamat"
										value={value}
										onChangeText={onChange}
										errorMessage={form.formState.errors.alamat?.message}
									/>
								)}
							/>
						</Card>
						<Card style={{ boxShadow: theme.shadows.sm, gap: 12 }}>
							<Text style={{ fontSize: 23, marginBottom: 10, fontWeight: 600 }}>Perkuliahan</Text>
							<Controller
								control={form.control}
								name="tempat_kuliah"
								render={({ field: { value, onChange } }) => (
									<TextInput
										label="Tempat Kuliah"
										value={value}
										onChangeText={onChange}
										errorMessage={form.formState.errors.tempat_kuliah?.message}
									/>
								)}
							/>
							<Controller
								control={form.control}
								name="prodi_kuliah"
								render={({ field: { value, onChange } }) => (
									<TextInput
										label="Prodi Kuliah"
										value={value}
										onChangeText={onChange}
										errorMessage={form.formState.errors.prodi_kuliah?.message}
									/>
								)}
							/>
							<Controller
								control={form.control}
								name="kesesuaian_kuliah"
								render={() => (
									<InputWrapper label="Kesesuaian Kuliah">
										<Checkbox
											value={form.getValues("kesesuaian_kuliah") ? true : false}
											onValueChange={(val) => form.setValue("kesesuaian_kuliah", val as any)}
											color={
												form.getValues("kesesuaian_kuliah") ? theme.colors.primary : undefined
											}
										/>
									</InputWrapper>
								)}
							/>
						</Card>
						<Card style={{ boxShadow: theme.shadows.sm, gap: 12 }}>
							<Text style={{ fontSize: 23, marginBottom: 10, fontWeight: 600 }}>Pekerjaan</Text>
							<Controller
								control={form.control}
								name="tempat_kerja"
								render={({ field: { value, onChange } }) => (
									<TextInput
										label="Tempat Kerja"
										value={value}
										onChangeText={onChange}
										errorMessage={form.formState.errors.tempat_kerja?.message}
									/>
								)}
							/>
							<Controller
								control={form.control}
								name="jabatan_kerja"
								render={({ field: { value, onChange } }) => (
									<TextInput
										label="Jabatan"
										value={value}
										onChangeText={onChange}
										errorMessage={form.formState.errors.jabatan_kerja?.message}
									/>
								)}
							/>
							<Controller
								control={form.control}
								name="kesesuaian_kerja"
								render={() => (
									<InputWrapper label="Kesesuaian Kerja">
										<Checkbox
											value={form.getValues("kesesuaian_kerja") ? true : false}
											onValueChange={(val) => form.setValue("kesesuaian_kerja", val as any)}
											color={
												form.getValues("kesesuaian_kerja") ? theme.colors.primary : undefined
											}
										/>
									</InputWrapper>
								)}
							/>
						</Card>
						<Button
							variant="danger"
							style={{ paddingVertical: 15 }}
							trailing={<MaterialIcons name="delete" color={"white"} size={24} />}
							onPress={() => setAskModalDelete(true)}
							isLoading={isDeleting}
						>
							Hapus Data Alumni
						</Button>
					</Padding>
				</ScrollView>
			)}

			<Modal title="Konfirmasi" visible={askModalDelete} closeModal={() => setAskModalDelete(false)}>
				<Text>Apa anda yakin menghapus data alumni ini?</Text>
				<Row style={{ justifyContent: "flex-end", marginTop: 20 }} gap={5}>
					<OutlineButton
						onPress={() => setAskModalDelete(false)}
						variant="white"
						style={{ paddingHorizontal: 20, paddingVertical: 10 }}
					>
						Batal
					</OutlineButton>
					<Button
						onPress={handleDelete}
						variant="danger"
						style={{ paddingHorizontal: 20, paddingVertical: 10 }}
					>
						Yakin
					</Button>
				</Row>
			</Modal>
		</Container>
	);
}
