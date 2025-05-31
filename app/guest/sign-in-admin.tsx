import { ArrowBack } from "@/components/ArrowBack";
import { Container } from "@/components/Container";
import { AdminSignInForm } from "@/features/auth/components/AdminSignInForm";
import { theme } from "@/theme";
import { KeyboardAvoidingView } from "react-native";

export default function SigninPage() {
	return (
		<Container
			style={{
				backgroundColor: theme.colors.primary,
				paddingHorizontal: theme.paddings.horizontal,
				paddingVertical: theme.paddings.vertical,
			}}
		>
			<ArrowBack />
			<KeyboardAvoidingView style={{ flex: 1, justifyContent: "center" }} behavior="padding">
				<AdminSignInForm />
			</KeyboardAvoidingView>
		</Container>
	);
}
