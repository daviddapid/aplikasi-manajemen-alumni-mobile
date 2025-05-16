import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { spaces } from "@/theme/layout";
import { router } from "expo-router";
import { View } from "react-native";

export default function Step1Page() {
	return (
		<View style={{ gap: 10 }}>
			<TextInput label="Nama" />
			<TextInput label="Tanggal Lahir" />
			<TextInput label="Angkatan" />
			<Button style={{ marginTop: spaces.xl }} onPress={() => router.push("/create/step2")}>
				Next
			</Button>
		</View>
	);
}
