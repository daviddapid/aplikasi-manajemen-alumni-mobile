import { Stack } from "expo-router";

export default function AuthLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="(tabs)" />
			<Stack.Screen name="chart" />
			<Stack.Screen name="create" />
		</Stack>
	);
}
