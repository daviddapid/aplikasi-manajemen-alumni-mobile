import { Badge } from "@/components/Badge";
import { Button, OutlineButton } from "@/components/Button";
import { Card } from "@/components/Card";
import { InputWrapper } from "@/components/InputWrapper";
import { Padding } from "@/components/Padding";
import { Row } from "@/components/Row";
import { TextInput } from "@/components/TextInput";
import { theme } from "@/theme";
import Checkbox from "expo-checkbox";
import { RefObject } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import PagerView from "react-native-pager-view";

export type Step4FormValues = {
	tempat_kerja: string;
	jabatan_kerja: string;
	kesesuaian_kerja: boolean;
};
type StepForm = {
	form: UseFormReturn<Step4FormValues>;
	stepsRef: RefObject<PagerView | null>;
	currentStep: number;
	onSubmit: () => void;
};
export const Step4Form = ({ form, stepsRef, currentStep, onSubmit }: StepForm) => {
	return (
		<Padding>
			<Card style={{ gap: theme.spaces.lg, boxShadow: theme.shadows.sm }}>
				<Badge text="Biarkan kosong jika alumni tidak bekerja" />
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
								value={form.getValues("kesesuaian_kerja")}
								onValueChange={(val) => form.setValue("kesesuaian_kerja", val as any)}
								color={form.getValues("kesesuaian_kerja") ? theme.colors.primary : undefined}
							/>
						</InputWrapper>
					)}
				/>
				<Row gap={15} style={{ marginTop: theme.spaces.lg }}>
					<OutlineButton style={{ flex: 1 }} onPress={() => stepsRef.current?.setPage(currentStep - 1)}>
						Sebelumnya
					</OutlineButton>
					<Button style={{ flex: 1 }} onPress={onSubmit}>
						Simpan
					</Button>
				</Row>
			</Card>
		</Padding>
	);
};
