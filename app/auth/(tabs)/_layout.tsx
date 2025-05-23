import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function AppLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name="alumni"
				options={{
					tabBarIcon: ({ color }) => <MaterialIcons size={28} name="people" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="jurusan"
				options={{
					tabBarIcon: ({ color }) => <MaterialIcons size={28} name="category" color={color} />,
				}}
			/>
		</Tabs>
	);
}
