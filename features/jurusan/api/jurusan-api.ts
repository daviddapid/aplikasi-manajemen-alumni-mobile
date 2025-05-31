import { Api } from "@/config/api";
import { formatDateToMySQLDateTime } from "@/helper/date";
import { Response } from "@/types/Response";
import { Jurusan } from "../types/Jurusan";

type GetAllJurusans = Response<Jurusan[]>;
export async function getAllJurusans({
	search,
	cursor,
}: {
	search?: string;
	cursor?: string;
}): Promise<GetAllJurusans> {
	const query = new URLSearchParams();
	if (search) query.append("search", search);

	const endpoint = cursor ? `${cursor}&${query.toString()}` : `jurusans?${query.toString()}`;
	const { data } = await Api.get<GetAllJurusans>(endpoint);

	return data;
}

export async function createJurusan({ nama, tglBerdiri }: { nama: string; tglBerdiri: Date }) {
	const reqBody = {
		nama,
		tgl_berdiri: formatDateToMySQLDateTime(tglBerdiri),
	};

	await Api.post("jurusans", reqBody);
}
