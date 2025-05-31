import { Button, OutlineButton } from "@/components/Button";
import { Card } from "@/components/Card";
import { Padding } from "@/components/Padding";
import { Row } from "@/components/Row";
import { TextInput } from "@/components/TextInput";
import { theme } from "@/theme";
import { RefObject } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import PagerView from "react-native-pager-view";
import { checkEmailExist } from "../../api/alumni-api";

export type Step2FormValues = {
	no_tlp: string;
	email: string;
	alamat: string;
};
type StepForm = {
	form: UseFormReturn<Step2FormValues>;
	validation: any;
	stepsRef: RefObject<PagerView | null>;
	currentStep: number;
};
export const Step2Form = ({ form, validation, stepsRef, currentStep }: StepForm) => {
	const handleCheckEmail = async () => {
		const emailExist = await checkEmailExist(form.getValues("email") ?? "");
		console.log(emailExist);

		if (emailExist) {
			form.setError("email", {
				type: "validate",
				message: "Email sudah dipakai",
			});
			return;
		}
		stepsRef.current?.setPage(currentStep + 1);
	};
	return (
		<Padding>
			<Card style={{ gap: theme.spaces.lg, boxShadow: theme.shadows.sm }}>
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
				<Row gap={15} style={{ marginTop: theme.spaces.lg }}>
					<OutlineButton style={{ flex: 1 }} onPress={() => stepsRef.current?.setPage(currentStep - 1)}>
						Sebelumnya
					</OutlineButton>
					<Button style={{ flex: 1 }} onPress={form.handleSubmit(handleCheckEmail)}>
						Selanjutnya
					</Button>
				</Row>
			</Card>
		</Padding>
	);
};
