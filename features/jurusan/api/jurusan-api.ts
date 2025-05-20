import { Api } from "@/config/api";
import { formatDateToMySQLDateTime } from "@/helper/date";
import { Links, Meta } from "@/types/pagination";
import { Jurusan } from "../types/Jurusan";

type GetAllJurusans = { data: Jurusan[] } & Links & Meta;
export async function getAllJurusans({
	search,
	cursor,
}: {
	search?: string;
	cursor?: string;
}): Promise<GetAllJurusans> {
	try {
		const query = new URLSearchParams();
		if (search) query.append("search", search);
		if (cursor) query.append("cursor", cursor);

		const { data } = await Api.get<GetAllJurusans>(`jurusans?${query.toString()}`);
		console.log(data);
		return data;
	} catch (error: any) {
		console.error(error.response);
		throw error;
	}
}

export async function createJurusan({ nama, tglBerdiri }: { nama: string; tglBerdiri: Date }) {
	try {
		const reqBody = {
			nama,
			tgl_berdiri: formatDateToMySQLDateTime(tglBerdiri),
		};

		await Api.post("jurusans", reqBody);
	} catch (error) {
		console.log(error);
		throw error;
	}
}
