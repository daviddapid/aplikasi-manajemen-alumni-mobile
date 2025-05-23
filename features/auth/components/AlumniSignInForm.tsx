import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Row } from "@/components/Row";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { theme } from "@/theme";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const AlumniSignInForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
	});

	async function onSignIn() {
		router.replace("/auth/alumni");
	}

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
			<Button onPress={handleSubmit(onSignIn)}>Sign In</Button>
			<Row gap={5} style={{ justifyContent: "center", marginTop: 10 }}>
				<Text>Belum Punya Akun?</Text>
				<TouchableOpacity onPress={() => router.push("/guest/register-siswa")}>
					<Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>Register di Sini</Text>
				</TouchableOpacity>
			</Row>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		width: "100%",
		marginHorizontal: "auto",
		marginVertical: "auto",
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
