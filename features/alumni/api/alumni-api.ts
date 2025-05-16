import { Api } from "@/config/api";
import { Links, Meta } from "@/types/pagination";
import { Alumni } from "../types/Alumni";

type GetAllAlumnis = { data: Alumni[] } & Links & Meta;
export async function getAllAlumnis({ search, cursor }: { search?: string; cursor?: string | null }) {
	try {
		const query = new URLSearchParams();
		if (cursor) query.append("cursor", cursor);
		if (search) query.append("search", search);

		const { data } = await Api.get<GetAllAlumnis>(`alumnis?${query.toString()}`);

		return data;
	} catch (error: any) {
		console.error(error);
		console.error(error.response);
		throw error;
	}
}

type GetDetailAlumni = { data: Alumni };
export async function getDetailAlumni(id: number | string) {
	try {
		const { data } = await Api.get<GetDetailAlumni>(`alumnis/${id}`);

		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
