import { Appbar } from "@/components/Appbar";
import { Container } from "@/components/Container";
import { FormCreateAlumni } from "@/features/alumni/components/FormCreateAlumni";
import { router } from "expo-router";

export default function CreateAlumniPage() {
	return (
		<Container>
			<Appbar title="Tambah Data Alumni" />
			<FormCreateAlumni onSuccess={() => router.replace("/")} />
		</Container>
	);
}
