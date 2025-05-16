import { ReactNode } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
};

export const Container = (props: Props) => {
	return <SafeAreaView style={[styles.container, props.style]}>{props.children}</SafeAreaView>;
};

const styles = StyleSheet.create({
	container: { flex: 1 },
});
