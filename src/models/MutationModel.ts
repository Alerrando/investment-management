import { UseMutationOptions } from "@tanstack/react-query";

export interface MutationModel<TData = unknown, TError = unknown, TVariables = unknown> {
  mutationKey: unknown[];
  options: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationKey">;
}
