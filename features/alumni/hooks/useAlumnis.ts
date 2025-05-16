import { useDebounce } from "@/hooks/useDebounce";
import { Links, Meta } from "@/types/pagination";
import { useEffect, useState } from "react";
import { getAllAlumnis } from "../api/alumni-api";
import { Alumni } from "../types/Alumni";

export const useAlumnis = () => {
	const [alumnis, setAlumnis] = useState<Alumni[]>();
	const [loading, setLoading] = useState(true);
	const [paginator, setPaginator] = useState<Meta & Links>();
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [query, setQuery] = useState<{ search?: string; tahunMulai?: string; tahunLulus?: string }>();
	const { debouncedValue: debouncedQuery, isDebouncing } = useDebounce(query, 1000);

	useEffect(() => {
		fetchAlumnis();
	}, [debouncedQuery]);

	async function fetchAlumnis() {
		try {
			setLoading(true);
			const { data, meta, links } = await getAllAlumnis({ ...debouncedQuery });

			setAlumnis(data);
			setPaginator({ meta, links });
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	async function loadMore() {
		try {
			if (paginator?.meta.next_cursor && !isFetchingMore) {
				setIsFetchingMore(true);
				const { data, links, meta } = await getAllAlumnis({
					cursor: paginator?.meta.next_cursor,
					...debouncedQuery,
				});
				setAlumnis((prev) => [...prev!, ...data]);
				setPaginator({ meta, links });
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsFetchingMore(false);
		}
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
	};
};
