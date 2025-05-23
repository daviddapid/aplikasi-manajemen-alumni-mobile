import { ArrowBack } from "@/components/ArrowBack";
import { Container } from "@/components/Container";
import { AlumniSignInForm } from "@/features/auth/components/AlumniSignInForm";
import { theme } from "@/theme";

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
			<AlumniSignInForm />
		</Container>
	);
}
