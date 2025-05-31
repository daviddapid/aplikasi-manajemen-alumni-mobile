import store from "@/redux/store";
import { theme } from "@/theme";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import { Provider as ReduxProvider } from "react-redux";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	return (
		<>
			<ReduxProvider store={store}>
				<Stack
					screenOptions={{
						headerShown: false,
						animation: "slide_from_right",
						navigationBarColor: theme.colors.primary,
					}}
				>
					<Stack.Screen name="index" />
					<Stack.Screen name="auth" />
					<Stack.Screen name="guest" />
				</Stack>
				<Toast />
			</ReduxProvider>
			<StatusBar backgroundColor={theme.colors.primary} barStyle={"light-content"} />
		</>
	);
}
