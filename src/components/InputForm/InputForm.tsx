import React, { ComponentProps } from "react";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

type InputFormProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  spanText?: string;
  options?: React.ReactNode;
  name: Path<T>;
} & ComponentProps<"input"> &
  ComponentProps<"label">;

export default function InputForm<T extends FieldValues>({
  title,
  htmlFor,
  spanText,
  register,
  errors,
  name,
  type,
  placeholder,
  options,
}: InputFormProps<T>) {
  return (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-primary">
        {title}:
      </Label>
      <div className="flex w-full items-center overflow-hidden rounded-lg border border-primary/40 bg-card">
        {spanText && (
          <span className="flex items-center justify-center bg-gray-600 px-4 py-2 text-sm text-white">{spanText}</span>
        )}
        <Input
          id={htmlFor}
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className="h-full w-full rounded-r-lg border-none bg-transparent px-4 py-2 text-lg text-primary focus:outline-none focus:ring-2 focus:ring-purple-500 focus-visible:ring-0"
        />
        {options}
      </div>

      {errors[name] && <span className="text-red-500">{String(errors[name]?.message)}</span>}
    </div>
  );
}
