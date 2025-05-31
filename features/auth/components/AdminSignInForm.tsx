import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { Api } from "@/config/api";
import { theme } from "@/theme";
import { Response } from "@/types/Response";
import { router } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

// list input yang dibutuhkan oleh form
type FormValues = {
	username: string;
	password: string;
};

export const AdminSignInForm = () => {
	// react-hook-forms
	// hooks untuk menentukan form input & validasi apa aja
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>();

	// function yang akan dipanggil ketika button sign-in di klik
	const onSignIn: SubmitHandler<FormValues> = async (form) => {
		const { data } = await Api.post<Response>("admin/login", form);
		if (data.status === "fail") {
			Toast.show({
				text1: data.message,
				type: "error",
			});
			return;
		}

		router.replace("/auth/alumni");
	};

	return (
		<Card style={styles.card}>
			<Text style={styles.title}>Sign In</Text>
			<View style={styles.inputsWrapper}>
				<Controller
					name="username"
					control={control}
					rules={{
						required: { value: true, message: "username tidak boleh kosong" },
					}}
					render={({ field }) => (
						<TextInput
							label="Username"
							value={field.value}
							onChangeText={field.onChange}
							errorMessage={errors.username?.message}
						/>
					)}
				/>
				<Controller
					name="password"
					control={control}
					rules={{
						required: { value: true, message: "password tidak boleh kosong" },
					}}
					render={({ field }) => (
						<TextInput
							label="Password"
							value={field.value}
							onChangeText={field.onChange}
							errorMessage={errors.password?.message}
						/>
					)}
				/>
			</View>
			<Button onPress={handleSubmit(onSignIn)} isLoading={isSubmitting}>
				Sign In
			</Button>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		width: "100%",
		marginHorizontal: "auto",
		paddingVertical: 20,
		boxShadow: theme.shadows.sm,
	},
	title: {
		fontSize: theme.fontSizes.lg,
		fontWeight: "semibold",
		textAlign: "center",
	},
	inputsWrapper: { gap: 8, marginVertical: theme.spaces.xl },
});
