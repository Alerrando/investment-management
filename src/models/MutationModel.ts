import { UseMutationOptions } from "@tanstack/react-query";

export interface MutationModel<TData = unknown, TError = unknown> {
  mutationKey: unknown[];
  options: Omit<UseMutationOptions<TData, TError>, "mutationKey">;
}
