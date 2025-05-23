import { theme } from "@/theme";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function GuestLayout() {
	return (
		<>
			<Stack
				screenOptions={{
					headerShown: false,
					animation: "slide_from_right",
					navigationBarColor: theme.colors.primary,
				}}
			>
				<Stack.Screen name="register-siswa" />
				<Stack.Screen name="sign-in-siswa" />
				<Stack.Screen name="sign-in-admin" />
			</Stack>
			<StatusBar backgroundColor={theme.colors.primary} barStyle={"light-content"} />
		</>
	);
}
