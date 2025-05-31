import { Badge } from "@/components/Badge";
import { Button, OutlineButton } from "@/components/Button";
import { Card } from "@/components/Card";
import { InputWrapper } from "@/components/InputWrapper";
import { Padding } from "@/components/Padding";
import { Row } from "@/components/Row";
import { TextInput } from "@/components/TextInput";
import { theme } from "@/theme";
import { Checkbox } from "expo-checkbox";
import { RefObject } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import PagerView from "react-native-pager-view";

export type Step3FormValues = {
	tempat_kuliah: string;
	prodi_kuliah: string;
	kesesuaian_kuliah: boolean;
};
type StepForm = {
	form: UseFormReturn<Step3FormValues>;
	stepsRef: RefObject<PagerView | null>;
	currentStep: number;
};
export const Step3Form = ({ form, stepsRef, currentStep }: StepForm) => {
	return (
		<Padding>
			<Card style={{ gap: theme.spaces.lg, boxShadow: theme.shadows.sm }}>
				<Badge text="Biarkan kosong jika alumni tidak berkuliah" />
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
								value={form.getValues("kesesuaian_kuliah")}
								onValueChange={(val) => form.setValue("kesesuaian_kuliah", val as any)}
								color={form.getValues("kesesuaian_kuliah") ? theme.colors.primary : undefined}
							/>
						</InputWrapper>
					)}
				/>
				<Row gap={15} style={{ marginTop: theme.spaces.lg }}>
					<OutlineButton style={{ flex: 1 }} onPress={() => stepsRef.current?.setPage(currentStep - 1)}>
						Sebelumnya
					</OutlineButton>
					<Button style={{ flex: 1 }} onPress={() => stepsRef.current?.setPage(currentStep + 1)}>
						Selanjutnya
					</Button>
				</Row>
			</Card>
		</Padding>
	);
};
