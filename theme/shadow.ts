import { BoxShadowValue } from "react-native";

interface BoxShadowTokens {
	sm: BoxShadowValue[];
	base: BoxShadowValue[];
	// md: BoxShadowValue[];
	// xl: BoxShadowValue[];
}
// box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
// box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
export const shadows: BoxShadowTokens = {
	sm: [{ offsetX: 0, offsetY: 4, blurRadius: 12, color: "rgba(0, 0, 0, 0.08)" }],
	base: [
		{
			offsetX: 0,
			offsetY: 5,
			blurRadius: 5,
			color: "rgba(50, 50, 105, 0.15)",
		},
		{
			offsetX: 0,
			blurRadius: 1,
			offsetY: 1,
			color: "rgba(0, 0, 0, 0.05)",
		},
	],
};
