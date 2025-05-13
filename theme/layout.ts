interface SpacesToken {
	xs: number;
	sm: number;
	base: number;
	md: number;
	lg: number;
	xl: number;
}

interface PaddingTokens {
	horizontal: number;
	vertical: number;
}

interface BorderRadiusTokens {
	sm: number;
	base: number;
	lg: number;
	full: number;
}

export const spaces: SpacesToken = {
	xs: 2,
	sm: 4,
	base: 6,
	md: 8,
	lg: 15,
	xl: 25,
};

export const paddings: PaddingTokens = {
	horizontal: 15,
	vertical: 25,
};

export const radius: BorderRadiusTokens = {
	sm: 4,
	base: 8,
	lg: 15,
	full: Infinity,
};
