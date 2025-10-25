import { useCallback, useEffect, useState, useMemo } from "react";
import useDebounce from "./useDebounce";
import type { Params, UseBasicFilterHelperOptions } from "../../Types";

const useBasicFilterHelper = ({ initialParams, debounceDelay = 300, sortKey = "userFilter" }: UseBasicFilterHelperOptions = {}) => {
  const [pageNumber, setPageNumber] = useState(initialParams?.page ?? 1);
  const [pageSize, setPageSize] = useState(initialParams?.limit ?? 10);
  const [searchTerm, setSearchTerm] = useState(initialParams?.search ?? "");
  const [sortBy, setSortBy] = useState<string | null>(initialParams?.[sortKey] ?? null);

  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  const [params, setParams] = useState<Params>({
    page: pageNumber,
    limit: pageSize,
    search: searchTerm,
    ...initialParams,
  });

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      search: debouncedSearchTerm,
      page: 1,
    }));
    setPageNumber(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setParams((prev) => {
      const updatedParams = { ...prev };
      if (sortBy) {
        updatedParams[sortKey] = sortBy;
      } else {
        delete updatedParams[sortKey];
      }
      return updatedParams;
    });
  }, [sortBy, sortKey]);

  const handlePaginationChange = useCallback((newPage: number, newPageSize: number) => {
    setPageNumber(newPage);
    setPageSize(newPageSize);
    setParams((prev) => ({
      ...prev,
      page: newPage,
      limit: newPageSize,
    }));
  }, []);

  const handleSetSearch = useCallback((value: string) => setSearchTerm(value), []);
  const handleSetSortBy = useCallback((value: string) => setSortBy(value || null), []);

  return useMemo(
    () => ({
      pageNumber,
      pageSize,
      searchTerm,
      sortBy,
      params,
      setParams,
      handleSetSearch,
      handleSetSortBy,
      handlePaginationChange,
    }),
    [pageNumber, pageSize, searchTerm, sortBy, params, handlePaginationChange]
  );
};

export default useBasicFilterHelper;
