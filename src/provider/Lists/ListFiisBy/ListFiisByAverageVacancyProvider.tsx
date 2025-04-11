import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListFiisByAverageVacancy } from "@/app/api/findListFiis/getListFiisByAverageVacancy";
import { initialStateFiisProvider } from "@/lib/utils";
import { ListFiisModel } from "@/models/Lists/ListFiisModel";

interface ListFiisByAverageVacancyState {
  dataListFiisByAverageVacancy: ListFiisModel;
  setDataListFiisByAverageVacancy: (data: ListFiisModel) => void;
}

const useListFiisByAverageVacancyStore = create<ListFiisByAverageVacancyState>()(
  persist(
    (set) => ({
      dataListFiisByAverageVacancy: initialStateFiisProvider,
      setDataListFiisByAverageVacancy: (data) => set({ dataListFiisByAverageVacancy: data }),
    }),
    {
      name: "list-fiis-by-average-vacancy-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dataListFiisByAverageVacancy: state.dataListFiisByAverageVacancy }),
    },
  ),
);

export function useListFiisByAverageVacancy() {
  const { setDataListFiisByAverageVacancy, dataListFiisByAverageVacancy } = useListFiisByAverageVacancyStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-fiis-by-average-vacancy"],
    queryFn: async () => {
      if (dataListFiisByAverageVacancy?.content?.length) return { content: dataListFiisByAverageVacancy };

      const data = await getListFiisByAverageVacancy();
      setDataListFiisByAverageVacancy(data);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListFiisByAverageVacancy(data);
    },
  });

  return {
    dataListFiisByAverageVacancy: dataListFiisByAverageVacancy,
    isLoadingListFiisByAverageVacancy: isLoading,
    error,
  };
}
