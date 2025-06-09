import { Row } from "@/components/Row";
import { Text } from "@/components/Text";
import { theme } from "@/theme";
import { colors } from "@/theme/color";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { JSX, useRef, useState } from "react";
import { RegisterOptions, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import { formatDateToMySQLDateTime } from "@/helper/date";
import PagerView from "react-native-pager-view";
import Toast from "react-native-toast-message";
import { createAlumni } from "../api/alumni-api";
import { CreateAlumniDTO } from "../types/AlumniDTO";
import { Step1Form, Step1FormValues } from "./FormSteps/Step1Form";
import { Step2Form, Step2FormValues } from "./FormSteps/Step2Form";
import { Step3Form, Step3FormValues } from "./FormSteps/Step3Form";
import { Step4Form, Step4FormValues } from "./FormSteps/Step4Form";

type Props = {
	onSuccess: () => void;
};

export const FormCreateAlumni = (props: Props) => {
	const [currentStep, setCurrentStep] = useState(0);
	const stepsRef = useRef<PagerView>(null);
	const step1 = useForm<Step1FormValues>();
	const step2 = useForm<Step2FormValues>();
	const step3 = useForm<Step3FormValues>();
	const step4 = useForm<Step4FormValues>();

	const validation = {
		required: {
			value: true,
			message: "Tidak boleh kosong",
		},
	} satisfies RegisterOptions;

	const handleSubmit = async () => {
		const dto: CreateAlumniDTO = {
			...step1.getValues(),
			...step2.getValues(),
			...step3.getValues(),
			...step4.getValues(),
			tgl_lahir: formatDateToMySQLDateTime(step1.getValues("tgl_lahir")),
		};
		console.log(dto);

		const res = await createAlumni(dto);
		if (res?.status === "fail") {
			Toast.show({
				type: "error",
				text1: res.message,
			});
			return;
		}

		Toast.show({
			type: "success",
			text1: res?.message,
		});

		props.onSuccess();
	};

	return (
		<View style={{ flex: 1 }}>
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
				// scrollEnabled={false}
			>
				<Step1Form form={step1} currentStep={currentStep} stepsRef={stepsRef} validation={validation} />
				<Step2Form form={step2} currentStep={currentStep} stepsRef={stepsRef} validation={validation} />
				<Step3Form form={step3} currentStep={currentStep} stepsRef={stepsRef} />
				<Step4Form form={step4} currentStep={currentStep} stepsRef={stepsRef} onSubmit={handleSubmit} />
			</PagerView>
		</View>
	);
};

const StepIndicator = ({ text, icon, active }: { text: string; icon: JSX.Element; active: boolean }) => {
	return (
		<View style={styles.stepWrapper}>
			<View style={[styles.stepIcon, active && { backgroundColor: theme.colors.primary }]}>
				{active ? <MaterialIcons name="check" size={23} color={"white"} /> : icon}
			</View>
			<Text>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	stepWrapper: { justifyContent: "center", alignItems: "center", gap: theme.spaces.sm },
	stepIcon: {
		backgroundColor: theme.colors.softPrimary,
		borderColor: theme.colors.primary,
		borderWidth: 1,
		borderRadius: 50,
		width: 35,
		height: 35,
		justifyContent: "center",
		alignItems: "center",
	},
});
