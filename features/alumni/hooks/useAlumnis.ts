import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getAllAlumnis } from "../api/alumni-api";

export const useAlumnis = () => {
	const { data: _data, ...query } = useInfiniteQuery({
		queryKey: ["alumnis"],
		queryFn: getAllAlumnis,
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => lastPage.meta.next_cursor,
	});

	const data = useMemo(() => _data?.pages.flatMap((page) => page.data), [_data]);

	return { data, ...query };
};
