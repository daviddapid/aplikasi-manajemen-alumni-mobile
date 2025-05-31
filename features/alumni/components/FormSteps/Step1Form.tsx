import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { DateInput } from "@/components/DateInput";
import { InputWrapper } from "@/components/InputWrapper";
import { Padding } from "@/components/Padding";
import { Row } from "@/components/Row";
import { TextInput } from "@/components/TextInput";
import { JurusanPicker } from "@/features/jurusan/components/JurusanPicker";
import { theme } from "@/theme";
import { RefObject } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import PagerView from "react-native-pager-view";

export type Step1FormValues = {
	nama: string;
	tgl_lahir: Date;
	tahun_mulai: string;
	tahun_lulus: string;
	no_tlp: string;
	email: string;
	alamat: string;
	jurusan_id: string;
};
type StepForm1 = {
	form: UseFormReturn<Step1FormValues>;
	validation: any;
	stepsRef: RefObject<PagerView | null>;
	currentStep: number;
};
export const Step1Form = ({ form, validation, stepsRef, currentStep }: StepForm1) => {
	return (
		<Padding>
			<Card style={{ gap: theme.spaces.lg, boxShadow: theme.shadows.sm }}>
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
								console.log(date);
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
							<JurusanPicker onChange={onChange} />
						</InputWrapper>
					)}
				/>

				<Button
					onPress={form.handleSubmit(() => stepsRef.current?.setPage(currentStep + 1))}
					style={{ marginTop: theme.spaces.lg }}
				>
					Selanjutnya
				</Button>
			</Card>
		</Padding>
	);
};
