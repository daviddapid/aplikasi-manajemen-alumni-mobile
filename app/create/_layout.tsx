import { Appbar } from "@/components/Appbar";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Text } from "@/components/Text";
import { colors } from "@/theme/color";
import { paddings, spaces } from "@/theme/layout";
import { MaterialIcons } from "@expo/vector-icons";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { JSX } from "react";
import { ScrollView, View } from "react-native";

export default function CreateLayout() {
	return (
		<Container>
			<Appbar title="Tambah Data Alumni" />
			<ScrollView style={{ paddingHorizontal: paddings.horizontal }}>
				<Card style={{ marginTop: paddings.vertical }}>
					<Tabs>
						<TabList style={{ justifyContent: "space-around" }}>
							<TabTrigger name="step1" href={"/create/step1"}>
								<TabItem
									text="Biodata"
									icon={<MaterialIcons name="person" size={20} color={"white"} />}
								/>
							</TabTrigger>
							<TabTrigger name="step2" href={"/create/step2"}>
								<TabItem
									text="Biodata"
									icon={<MaterialIcons name="phone" size={20} color={"white"} />}
								/>
							</TabTrigger>
							<TabTrigger name="step3" href={"/create/step3"}>
								<TabItem
									text="Biodata"
									icon={<MaterialIcons name="note" size={20} color={"white"} />}
								/>
							</TabTrigger>
						</TabList>
						<View style={{ marginTop: spaces.xl }}>
							<TabSlot />
						</View>
					</Tabs>
				</Card>
			</ScrollView>
		</Container>
	);
}

type Props = {
	text: string;
	icon: JSX.Element;
};
export const TabItem = (props: Props) => {
	return (
		<View style={{ alignItems: "center" }}>
			<View
				style={{
					width: 30,
					height: 30,
					backgroundColor: colors.primary,
					borderRadius: 30,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{props.icon}
			</View>
			<Text>{props.text}</Text>
		</View>
	);
};
