import { theme } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Text } from "./Text";

export const ArrowBack = () => {
	return (
		<TouchableOpacity style={{ flexDirection: "row", gap: 8, alignItems: "center" }} onPress={router.back}>
			<MaterialIcons name="arrow-back" size={25} color={"white"} />
			<Text style={{ color: theme.colors.white, fontSize: 20 }}>Kembali</Text>
		</TouchableOpacity>
	);
};
