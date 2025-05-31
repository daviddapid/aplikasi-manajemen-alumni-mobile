import { useDebounce } from "@/hooks/useDebounce";
import { Pagination } from "@/types/Response";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { getAllAlumnis } from "../api/alumni-api";
import { Alumni } from "../types/Alumni";

export const useAlumnis = () => {
	const [alumnis, setAlumnis] = useState<Alumni[]>();
	const [loading, setLoading] = useState(true);
	const [paginator, setPaginator] = useState<Pagination>();
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [query, setQuery] = useState<{ search?: string; tahunMulai?: string; tahunLulus?: string }>();
	const { debouncedValue: debouncedQuery, isDebouncing } = useDebounce(query, 1000);

	useEffect(() => {
		fetchAlumnis();
	}, [debouncedQuery]);

	async function fetchAlumnis() {
		setLoading(true);
		try {
			const res = await getAllAlumnis({ ...debouncedQuery });
			if (res?.status === "fail") {
				Toast.show({
					type: "error",
					text1: res.message,
				});
				return;
			} else {
				setAlumnis(res?.data);
				setPaginator(res?.pagination);
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	async function loadMore() {
		console.log(paginator);

		if (paginator?.next_page_url && !isFetchingMore) {
			setIsFetchingMore(true);
			const res = await getAllAlumnis({
				cursor: paginator?.next_page_url,
				...debouncedQuery,
			});
			setAlumnis((prev) => [...prev!, ...res?.data!]);
			setPaginator(res?.pagination);
			setIsFetchingMore(false);
		}
	}

	function resetQuery() {
		setQuery({});
	}

	return {
		alumnis,
		fetchAlumnis,
		loading,
		isFetchingMore,
		loadMore,
		isDebouncing,
		setQuery,
		query,
		resetQuery,
	};
};
