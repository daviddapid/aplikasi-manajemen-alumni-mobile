import { Api } from "@/config/api";
import { Response } from "@/types/Response";
import { Alumni } from "../types/Alumni";
import { CreateAlumniDTO } from "../types/CreateAlumniDTO";

type GetAllAlumnis = Response<Alumni[]>;
export async function getAllAlumnis({
	search,
	tahunMulai,
	tahunLulus,
	cursor,
}: {
	search?: string;
	cursor?: string | null;
	tahunMulai?: string | null;
	tahunLulus?: string | null;
}) {
	try {
		const query = new URLSearchParams();
		if (search) query.append("search", search);
		if (tahunMulai) query.append("tahun_mulai", tahunMulai);
		if (tahunLulus) query.append("tahun_lulus", tahunLulus);

		const endpoint = cursor ? `${cursor}&${query.toString()}` : `alumnis?${query.toString()}`;
		const { data } = await Api.get<GetAllAlumnis>(endpoint);

		return data;
	} catch (error) {
		console.log(error);
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

export async function checkEmailExist(email: string) {
	try {
		const { data } = await Api.post("check-email-exist", { email });
		console.log(data);

		return data;
	} catch (error: any) {
		console.log(error.response);
	}
}

export async function createAlumni(createAlumniDTO: CreateAlumniDTO) {
	try {
		await Api.post("alumnis", createAlumniDTO);
	} catch (error) {
		console.log({ error });
	}
}
