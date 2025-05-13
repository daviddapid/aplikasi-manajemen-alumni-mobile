import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="sign-in" />
					<Stack.Screen name="index" />
					<Stack.Screen name="create" />
					<Stack.Screen name="chart" />
				</Stack>
			</QueryClientProvider>
			<StatusBar style="light" backgroundColor="white" />
		</>
	);
}
