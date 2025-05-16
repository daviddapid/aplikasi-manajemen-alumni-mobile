import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
					<Stack.Screen name="sign-in" />
					<Stack.Screen name="index" />
					<Stack.Screen name="create" />
					<Stack.Screen name="chart" />
					<Stack.Screen name="detail/[id]" />
				</Stack>
			</QueryClientProvider>
			<StatusBar style="light" backgroundColor="white" />
		</>
	);
}
