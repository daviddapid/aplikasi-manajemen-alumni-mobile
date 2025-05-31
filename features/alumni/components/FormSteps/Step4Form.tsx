import { Badge } from "@/components/Badge";
import { Button, OutlineButton } from "@/components/Button";
import { Card } from "@/components/Card";
import { Padding } from "@/components/Padding";
import { Row } from "@/components/Row";
import { TextInput } from "@/components/TextInput";
import { theme } from "@/theme";
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
					render={() => <TextInput label="Tempat Kerja" />}
				/>
				<Controller control={form.control} name="jabatan_kerja" render={() => <TextInput label="Jabatan" />} />
				<Controller
					control={form.control}
					name="kesesuaian_kerja"
					render={() => <TextInput label="Kesesuaian Kerja" />}
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
