import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native";
import { useJurusan } from "../hooks/useJurusan";

type Props = {
	onChange: (val: number) => void;
};

export const JurusanPicker = (props: Props) => {
	const { jurusans, isLoading } = useJurusan();

	if (isLoading) {
		return <ActivityIndicator style={{ marginVertical: 10, marginLeft: "auto" }} />;
	}

	return (
		<Picker onValueChange={(val) => props.onChange(val as number)}>
			<Picker.Item style={{ fontSize: 14 }} label={"---pilih jurusan---"} value={undefined} enabled={false} />
			{jurusans?.map((val, idx) => (
				<Picker.Item key={`jurusan-picker-${idx}`} style={{ fontSize: 14 }} label={val.nama} value={val.id} />
			))}
		</Picker>
	);
};
