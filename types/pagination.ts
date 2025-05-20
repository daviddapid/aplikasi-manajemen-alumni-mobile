export type Links = {
	links: {
		first: string | null;
		last: string | null;
		next: string | null;
		prev: string | null;
	};
};

export type Meta = {
	meta: {
		next_cursor: string | null;
		path: string;
		per_page: number;
		prev_cursor: string | null;
	};
};
