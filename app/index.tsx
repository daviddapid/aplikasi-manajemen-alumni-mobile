import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Text } from "@/components/Text";
import { theme } from "@/theme";
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function IndexPage() {
	return (
		<Container>
			<ImageBackground
				source={require("@/assets/images/landing-page-bg.jpg")}
				style={styles.bg}
				contentFit="cover"
			>
				<View>
					<Image source={require("@/assets/svg/logo.svg")} style={styles.logo} contentFit="contain" />
					<Text style={styles.title}>Selamat Datang Di E-Alumni</Text>
					<Text style={styles.subtitle}>Kelola data alumni dengan mudah</Text>
				</View>
				<View style={{ gap: theme.spaces.lg }}>
					<Button style={styles.btn} onPress={() => router.push("/guest/sign-in-siswa")}>
						Masuk Sebagai Siswa
					</Button>
					<Button style={styles.btn} variant="white" onPress={() => router.push("/guest/sign-in-admin")}>
						Masuk Sebagai Admin
					</Button>
				</View>
			</ImageBackground>
		</Container>
	);
}

const styles = StyleSheet.create({
	bg: {
		flex: 1,
		justifyContent: "space-between",
		paddingHorizontal: theme.paddings.horizontal,
		paddingVertical: theme.paddings.vertical,
	},
	logo: { width: 250, height: 150, marginHorizontal: "auto", marginTop: 30 },
	title: {
		color: theme.colors.white,
		fontSize: theme.fontSizes.title,
		textAlign: "center",
		fontWeight: "bold",
		marginTop: 25,
		marginBottom: 10,
		textShadowOffset: { height: 3, width: 0 },
		textShadowColor: "black",
		textShadowRadius: 5,
	},
	subtitle: {
		color: theme.colors.white,
		fontSize: theme.fontSizes.lg,
		textAlign: "center",
		textShadowOffset: { height: 3, width: 0 },
		textShadowColor: "black",
		textShadowRadius: 5,
	},
	btn: { paddingVertical: 15, boxShadow: theme.shadows.base },
});
