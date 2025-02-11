import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { MutationModel } from "./../models/MutationModel";

export const useMutationHook = <TData = unknown, TError = unknown, TVariables = unknown>({
  mutationKey,
  options,
}: MutationModel<TData, TError, TVariables>): UseMutationResult<TData, TError, TVariables> => {
  return useMutation<TData, TError, TVariables>({ mutationKey, ...options });
};
