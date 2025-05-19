import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { theme } from "@/theme";
import { router } from "expo-router";
import { View } from "react-native";

export default function SigninPage() {
	async function handleSignIn() {
		router.replace("/alumni");
	}
	return (
		<Container>
			<Card
				style={{
					width: "90%",
					marginHorizontal: "auto",
					marginVertical: "auto",
					paddingVertical: 20,
					boxShadow: theme.shadows.sm,
				}}
			>
				<Text
					style={{
						fontSize: theme.fontSizes.lg,
						fontWeight: "semibold",
						textAlign: "center",
					}}
				>
					Sign In
				</Text>
				<View style={{ gap: 8, marginVertical: theme.spaces.xl }}>
					<TextInput label="Username" />
					<TextInput label="Password" />
				</View>
				<Button onPress={handleSignIn}>Sign In</Button>
			</Card>
		</Container>
	);
}
