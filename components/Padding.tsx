import { theme } from "@/theme";
import { memo, ReactNode } from "react";
import { View } from "react-native";

type Props = {
	children: ReactNode;
	horizontal?: number;
	vertical?: number;
	flexGap?: number;
};

export const Padding = memo(
	({ horizontal = theme.paddings.horizontal, vertical = theme.paddings.vertical, children, flexGap }: Props) => {
		return (
			<View style={{ paddingHorizontal: horizontal, paddingVertical: vertical, gap: flexGap }}>{children}</View>
		);
	}
);
Padding.displayName = "Padding";
