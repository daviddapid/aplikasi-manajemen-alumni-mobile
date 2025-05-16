import { ReactNode } from "react";
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type Props = {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
	gap?: number;
	enableScroll?: boolean;
};

export const Row = (props: Props) => {
	if (props.enableScroll) {
		return (
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<View style={[styles.row, { gap: props.gap }, props.style]}>{props.children}</View>
			</ScrollView>
		);
	}

	return <View style={[styles.row, { gap: props.gap }, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
});
