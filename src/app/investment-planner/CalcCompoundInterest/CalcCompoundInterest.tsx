"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import * as Yup from "yup";

import InputForm from "@/components/InputForm/InputForm";
import { Button } from "@/components/ui/button";

const schemaData = Yup.object({
  valueInitial: Yup.number().required("Campo obrigatório"),
  valueMonthly: Yup.number().required("Campo obrigatório"),
  interestRate: Yup.number().required("Campo obrigatório"),
  months: Yup.number().required("Campo obrigatório"),
});

type SchemaDataType = Yup.InferType<typeof schemaData>;

const valueTimes = [
  {
    value: "month",
    label: "Mês (s)",
  },
  {
    value: "year",
    label: "Ano (s)",
  },
];

const valueInterestRate = [
  {
    value: "monthly",
    label: "Mensal",
  },
  {
    value: "yearly",
    label: "Anual",
  },
];

export default function CalcCompoundInterest() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaData),
    defaultValues: {
      valueInitial: 0,
      valueMonthly: 0,
      interestRate: 0,
      months: 12,
    },
  });
  const [valueTimesSelected, setValueTimesSelected] = useState("month");
  const [valueInterestSelected, setValueInterestSelected] = useState("monthly");
  const [valuesInterest, setValuesInterest] = useState<string[]>([]);
  const [monthlyData, setMonthlyData] = useState<
    { month: number; totalAmount: number; amountAllCalc: number; accumulatedInterest: number }[]
  >([]);

  return (
    <form
      className="flex w-full flex-col items-start justify-start gap-6 rounded-lg border border-border bg-card p-4 text-primary-t shadow-lg sm:gap-8 sm:p-6"
      onSubmit={handleSubmit(submit)}
    >
      <h2 className="text-xl font-semibold text-primary-t sm:text-2xl">Calculadora de Juros Compostos</h2>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <InputForm
          errors={errors}
          register={register}
          spanText="R$"
          title="Valor inicial"
          type="number"
          placeholder="0,00"
          htmlFor="valor-inicial"
          name="valueInitial"
        />

        <InputForm
          errors={errors}
          register={register}
          spanText="R$"
          title="Contribuição mensal"
          type="number"
          placeholder="0,00"
          htmlFor="contribuicao-mensal"
          name="valueMonthly"
        />

        <InputForm
          errors={errors}
          register={register}
          spanText="%"
          title="Taxa de Juros (%):"
          type="number"
          placeholder="0,00"
          htmlFor="taxa-juros"
          name="interestRate"
          options={
            <select
              className="h-full w-auto cursor-pointer rounded-md border bg-gray-600 px-3 py-1 text-xs text-white focus:border focus-visible:border focus-visible:outline-none sm:px-4 sm:py-2 sm:text-sm"
              value={valueInterestSelected}
              onChange={(e) => setValueInterestSelected(e.target.value)}
            >
              {valueInterestRate.map((interest) => (
                <option key={interest.value} value={interest.value}>
                  {interest.label}
                </option>
              ))}
            </select>
          }
        />

        <InputForm
          errors={errors}
          register={register}
          title="Quantidade de meses"
          type="number"
          placeholder="0"
          htmlFor="quantidade-meses"
          name="months"
          options={
            <select
              className="h-full w-auto cursor-pointer rounded-md border bg-gray-600 px-3 py-1 text-xs text-white focus:border focus-visible:border focus-visible:outline-none sm:px-4 sm:py-2 sm:text-sm"
              value={valueTimesSelected}
              onChange={(e) => setValueTimesSelected(e.target.value)}
            >
              {valueTimes.map((interest) => (
                <option key={interest.value} value={interest.value}>
                  {interest.label}
                </option>
              ))}
            </select>
          }
        />
      </div>

      <div className="mt-4 flex w-full justify-between gap-4 sm:gap-6 md:justify-end">
        <Button
          type="submit"
          variant="outline"
          className="border border-primary/10 bg-primary text-xs text-primary-t transition-colors hover:text-red-600 sm:text-sm"
          onClick={() => reset()}
        >
          Limpar
        </Button>
        <Button type="submit" variant="default" className="text-xs sm:text-sm">
          Calcular
        </Button>
      </div>

      {valuesInterest.length > 0 && (
        <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg sm:p-6 dark:bg-gray-800">
            <span className="text-sm font-medium text-gray-700 sm:text-lg dark:text-white">Montante Total</span>
            <span className="mt-2 text-xl font-semibold text-purple-600 sm:text-2xl dark:text-purple-400">
              {Number(valuesInterest[0]).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg sm:p-6 dark:bg-gray-800">
            <span className="text-sm font-medium text-gray-700 sm:text-lg dark:text-white">Juros Acumulados</span>
            <span className="mt-2 text-xl font-semibold text-purple-600 sm:text-2xl dark:text-purple-400">
              {Number(valuesInterest[1]).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg sm:p-6 dark:bg-gray-800">
            <span className="text-sm font-medium text-gray-700 sm:text-lg dark:text-white">
              Contribuições Mensais Totais
            </span>
            <span className="mt-2 text-xl font-semibold text-purple-600 sm:text-2xl dark:text-purple-400">
              {Number(valuesInterest[2]).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>
      )}

      {monthlyData.length > 0 && (
        <div className="mt-6 w-full">
          <h3 className="text-lg font-semibold text-gray-700 sm:text-xl dark:text-white">Tabela de Juros Mensais</h3>
          <div className="h-[20rem] overflow-auto sm:h-[25.125rem]">
            <table className="mt-4 w-full min-w-[600px] table-auto border-collapse text-xs sm:text-sm dark:text-white">
              <thead className="sticky top-0 bg-white dark:bg-gray-800">
                <tr className="border-b">
                  <th className="px-3 py-2 text-left sm:px-4 sm:py-2">Mês</th>
                  <th className="px-3 py-2 text-left sm:px-4 sm:py-2">Total Investido (R$)</th>
                  <th className="px-3 py-2 text-left sm:px-4 sm:py-2">Juros Acumulados (R$)</th>
                  <th className="px-3 py-2 text-left sm:px-4 sm:py-2">Total Juros (R$)</th>
                  <th className="px-3 py-2 text-left sm:px-4 sm:py-2">Total Acumulados (R$)</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-3 py-2 sm:px-4 sm:py-2">{data.month}</td>
                    <td className="px-3 py-2 sm:px-4 sm:py-2">
                      {data.totalAmount.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-2">
                      {data.accumulatedInterest.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-2">
                      {data.amountAllCalc.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-2">
                      {Number(data.totalAmount + data.accumulatedInterest).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {monthlyData.length > 0 && (
        <div className="mt-6 flex w-full flex-col gap-4 sm:gap-6">
          <h3 className="text-lg font-semibold text-gray-700 sm:text-xl dark:text-white">Gráfico de Juros Compostos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  borderRadius: "8px",
                  padding: "10px",
                }}
                labelFormatter={(label) => `Mês ${label}`}
                formatter={(value) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalAmount"
                stroke="#8884d8"
                activeDot={{ r: 6 }}
                name="Total Investido"
              />
              <Line type="monotone" dataKey="accumulatedInterest" stroke="#82ca9d" name="Juros Acumulados" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </form>
  );

  function submit(e: SchemaDataType) {
    const { valueInitial, valueMonthly, interestRate, months } = e;

    let totalAmount = valueInitial;
    let accumulatedInterest = 0;
    let totalContributed = valueInitial;
    const monthRate =
      valueInterestSelected === "monthly" ? interestRate / 100 : Math.pow(1 + interestRate / 100, 1 / 12) - 1;

    const monthsLoop = valueTimesSelected === "month" ? months : months * 12;

    const monthlyInterestData = [];

    for (let i = 1; i <= monthsLoop; i++) {
      const interestForMonth = totalAmount * monthRate;
      accumulatedInterest += interestForMonth;

      totalAmount += valueMonthly + interestForMonth;

      totalContributed += valueMonthly;

      monthlyInterestData.push({
        month: i,
        totalAmount: Number(totalContributed),
        accumulatedInterest: Number(accumulatedInterest),
        amountAllCalc: Number(totalAmount),
      });
    }

    setMonthlyData(monthlyInterestData);
    setValuesInterest([totalAmount.toFixed(2), accumulatedInterest.toFixed(2), totalContributed.toFixed(2)]);
  }
}
