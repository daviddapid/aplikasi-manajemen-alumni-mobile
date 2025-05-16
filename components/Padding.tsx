import { theme } from "@/theme";
import { memo, ReactNode } from "react";
import { View } from "react-native";

type Props = {
	children: ReactNode;
	horizontal?: number;
	vertical?: number;
};

export const Padding = memo(
	({ horizontal = theme.paddings.horizontal, vertical = theme.paddings.vertical, children }: Props) => {
		return <View style={{ paddingHorizontal: horizontal, paddingVertical: vertical }}>{children}</View>;
	}
);
Padding.displayName = "Padding";
