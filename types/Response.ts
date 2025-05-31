export type Response<T = null> = {
	status: "fail" | "success";
	data?: T;
	message?: string;
	errors?: object;
	pagination?: Pagination;
};

export type Pagination = {
	next_page_url?: string;
	previous_page_url?: string;
};
