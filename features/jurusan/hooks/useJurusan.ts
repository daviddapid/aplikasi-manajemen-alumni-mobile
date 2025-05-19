import { useDebounce } from "@/hooks/useDebounce";
import { Links, Meta } from "@/types/pagination";
import { useEffect, useState } from "react";
import { createJurusan, getAllJurusans } from "../api/jurusan-api";
import { Jurusan } from "../types/Jurusan";

export const useJurusan = () => {
	const [refreshing, setRefreshing] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [jurusans, setJurusans] = useState<Jurusan[]>();
	const [paginator, setPaginator] = useState<Meta & Links>();
	const [search, setSearch] = useState<string>();
	const { debouncedValue, isDebouncing } = useDebounce(search, 1000);
	const [nama, setNama] = useState<{ val?: string; err?: string }>();
	const [tglBerdiri, setTglBerdiri] = useState<{ val?: Date; err?: string }>();

	useEffect(() => {
		fetchJurusans().then(() => setIsLoading(false));
	}, [debouncedValue]);

	async function fetchJurusans() {
		try {
			setRefreshing(true);
			const { data, meta, links } = await getAllJurusans({ search: debouncedValue });
			setJurusans(data);
			setPaginator({ meta, links });
		} catch (error) {
			console.log(error);
		} finally {
			setRefreshing(false);
		}
	}

	async function fetchMore() {
		try {
			if (paginator?.meta.next_cursor) {
				setIsFetchingMore(true);
				const { data, meta, links } = await getAllJurusans({
					search: debouncedValue,
					cursor: paginator.meta.next_cursor,
				});
				setJurusans(data);
				setPaginator({ meta, links });
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsFetchingMore(false);
		}
	}

	async function handleCreateJurusan(onSuccess: () => void) {
		if (!nama?.val || !tglBerdiri?.val) {
			if (!nama?.val) {
				setNama({ err: "nama tidak boleh kosong" });
			}
			if (!tglBerdiri?.val) {
				setTglBerdiri({ err: "Tanggal berdiri tidak boleh kosong" });
			}
			return;
		}
		try {
			await createJurusan({ nama: nama.val, tglBerdiri: tglBerdiri.val });
			setNama({});
			setTglBerdiri({});
			onSuccess();
		} catch (error: any) {
			console.log(error.response);
		}
	}

	return {
		jurusans,
		search,
		setSearch,
		isDebouncing,
		fetchMore,
		isFetchingMore,
		isLoading,
		setTglBerdiri,
		tglBerdiri,
		setNama,
		nama,
		handleCreateJurusan,
		fetchJurusans,
		refreshing,
	};
};
