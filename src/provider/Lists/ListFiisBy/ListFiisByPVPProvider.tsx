import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getListFiisByPVP } from "@/app/api/findListFiis/getListFiisByPvp";
import { initialStateFiisProvider } from "@/lib/utils";
import { ListFiisModel } from "@/models/Lists/ListFiisModel";

interface ListFiisByPVPState {
  dataListFiisByPVP: ListFiisModel;
  setDataListFiisByPVP: (data: ListFiisModel) => void;
}

const useListFiisByPVPStore = create<ListFiisByPVPState>()(
  persist(
    (set) => ({
      dataListFiisByPVP: initialStateFiisProvider,
      setDataListFiisByPVP: (data) => set({ dataListFiisByPVP: data }),
    }),
    {
      name: "list-fiis-by-pvp-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dataListFiisByPVP: state.dataListFiisByPVP }),
    },
  ),
);

export function useListFiisByPVP() {
  const { setDataListFiisByPVP, dataListFiisByPVP } = useListFiisByPVPStore();

  const { isLoading, error } = useQuery({
    queryKey: ["list-fiis-by-pvp"],
    queryFn: async () => {
      if (dataListFiisByPVP?.content?.length) return { content: dataListFiisByPVP };

      const data = await getListFiisByPVP();
      setDataListFiisByPVP(data);
      return data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      setDataListFiisByPVP(data);
    },
  });

  return { dataListFiisByPVP: dataListFiisByPVP, isLoadingListFiisByPVP: isLoading, error };
}
