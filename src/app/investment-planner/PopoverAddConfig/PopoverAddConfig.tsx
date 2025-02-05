import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PopoverAddConfigProprs {
  dataInfos: {
    name: string;
    color: string;
    value: number;
  }[];
  setDataInfos: (dataInfos: { name: string; color: string; value: number }[]) => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  color: Yup.string()
    .required("Cor é obrigatória")
    .matches(/^#[0-9A-F]{6}$/i, "Cor inválida"),
});

type FormData = Yup.InferType<typeof validationSchema>;

export default function PopoverAddConfig({ dataInfos, setDataInfos }: PopoverAddConfigProprs) {
  const [color, setColor] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      color: color,
    },
  });

  const onSubmit = (data: FormData) => {
    setDataInfos([...dataInfos, { name: data.name, color: data.color, value: 0 }]);
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    setColor(color);
    setValue("color", color);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Popover>
            <PopoverTrigger asChild={true} onClick={generateRandomColor}>
              <div className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                Adicionar
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label className="w-[25%]" htmlFor="name">
                    Título:{" "}
                  </Label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input {...field} id="name" type="text" className="h-8 w-full" />}
                  />
                  {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>

                <div className="flex items-center gap-2">
                  <Label
                    style={{ color: color, fontWeight: color ? "bold" : "normal" }}
                    className={`w-[25%] ${color && "text-bold"}`}
                    htmlFor="color"
                  >
                    Cor:{" "}
                  </Label>
                  <Controller
                    name="color"
                    control={control}
                    render={({ field }) => <Input {...field} id="color" className="h-8 w-full" />}
                  />
                  {errors.color && <span className="text-red-500">{errors.color.message}</span>}
                </div>

                <Button type="submit" variant="outline" className="mt-4">
                  Salvar
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        </TooltipTrigger>
        <TooltipContent>Clique para adicionar uma nova configuração</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
