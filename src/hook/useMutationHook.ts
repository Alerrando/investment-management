import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { MutationModel } from "./../models/MutationModel";

export const useMutationHook = <TData = unknown, TError = unknown>({
  mutationKey,
  options,
}: MutationModel<TData, TError>): UseMutationResult<TData, TError> => {
  return useMutation<TData, TError>(mutationKey, options);
};
