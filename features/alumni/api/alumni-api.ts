import { Api } from "@/config/api";
import { Response } from "@/types/Response";
import { Alumni, AlumniChart } from "../types/Alumni";
import { CreateAlumniDTO, UpdateAlumniDTO } from "../types/AlumniDTO";

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

type GetDetailAlumni = Response<Alumni>;
export async function getDetailAlumni(id: number | string | string[]) {
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
		const { data } = await Api.post<PostCreateAlumni>("check-email-exist", { email });

		return data;
	} catch (error: any) {
		console.log(error.response);
	}
}

type PostCreateAlumni = Response<Alumni>;
export async function createAlumni(createAlumniDTO: CreateAlumniDTO) {
	try {
		const { data } = await Api.post<PostCreateAlumni>("alumnis", createAlumniDTO);
		return data;
	} catch (error) {
		console.log({ error });
	}
}

type PutUpdateAlumni = Response<Alumni>;
export async function updateAlumni(id: number, updateAlumniDTO: UpdateAlumniDTO) {
	try {
		const { data } = await Api.put<PutUpdateAlumni>(`alumnis/${id}`, updateAlumniDTO);
		return data;
	} catch (error) {
		console.log(error);
	}
}

type DeleteAlumni = Response;
export async function deleteAlumni(id: number) {
	try {
		const { data } = await Api.delete<DeleteAlumni>(`alumnis/${id}`);
		return data;
	} catch (error) {
		console.log(error);
	}
}

type GetChartData = Response<AlumniChart>;
export async function getChartData(tahunLulus?: string) {
	try {
		const query = new URLSearchParams();
		if (tahunLulus) query.append("tahun_lulus", tahunLulus);
		console.log(query.toString());

		const { data } = await Api.get<GetChartData>(`alumnis/chart?${query.toString()}`);
		return data;
	} catch (error) {
		console.log(error);
	}
}
