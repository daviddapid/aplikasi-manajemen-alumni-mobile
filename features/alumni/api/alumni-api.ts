import { Api } from "@/config/api";
import { Links, Meta } from "@/types/pagination";
import { QueryFunctionContext } from "@tanstack/react-query";
import { Alumni } from "../types/Alumni";

type GetAllAlumnis = { data: Alumni[] } & Links & Meta;

export async function getAllAlumnis({ pageParam }: QueryFunctionContext) {
	try {
		console.log("fetch alumnis");

		const { data } = await Api.get<GetAllAlumnis>(`alumnis?cursor=${pageParam ?? ""}`);

		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
