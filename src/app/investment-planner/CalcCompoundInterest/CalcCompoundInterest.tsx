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
      className="flex w-full flex-col items-start justify-start gap-8 rounded-lg border border-border bg-card p-6 text-primary-t shadow-lg"
      onSubmit={handleSubmit(submit)}
    >
      <h2 className="text-2xl font-semibold text-primary-t">Calculadora de Juros Compostos</h2>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
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
            <div>
              <select
                className="w-auto cursor-pointer rounded-md border bg-gray-600 px-4 py-2 text-[14px] text-white focus:border focus-visible:border focus-visible:outline-none"
                value={valueInterestSelected}
                onChange={(e) => setValueInterestSelected(e.target.value)}
              >
                {valueInterestRate.map((interest) => (
                  <option key={interest.value} value={interest.value}>
                    {interest.label}
                  </option>
                ))}
              </select>
            </div>
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
            <div>
              <select
                className="w-auto cursor-pointer rounded-md border bg-gray-600 px-4 py-2 text-[14px] text-white focus:border focus-visible:border focus-visible:outline-none"
                value={valueTimesSelected}
                onChange={(e) => setValueTimesSelected(e.target.value)}
              >
                {valueTimes.map((interest) => (
                  <option key={interest.value} value={interest.value}>
                    {interest.label}
                  </option>
                ))}
              </select>
            </div>
          }
        />
      </div>

      <div className="mt-6 flex w-full justify-end gap-4">
        <Button
          type="submit"
          className="border border-primary/10 bg-foreground text-primary-t hover:bg-secondary"
          onClick={() => reset()}
        >
          Limpar
        </Button>
        <Button type="submit" variant="default">
          Calcular
        </Button>
      </div>

      {valuesInterest.length > 0 && (
        <div className="mt-8 grid w-full grid-cols-1 justify-center gap-6 sm:grid-cols-3">
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg sm:w-auto dark:bg-gray-800">
            <span className="text-lg font-medium text-gray-700 dark:text-white">Montante Total</span>
            <span className="mt-2 text-2xl font-semibold text-purple-600 dark:text-purple-400">
              {Number(valuesInterest[0]).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg sm:w-auto dark:bg-gray-800">
            <span className="text-lg font-medium text-gray-700 dark:text-white">Juros Acumulados</span>
            <span className="mt-2 text-2xl font-semibold text-purple-600 dark:text-purple-400">
              {Number(valuesInterest[1]).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg sm:w-auto dark:bg-gray-800">
            <span className="text-lg font-medium text-gray-700 dark:text-white">Contribuições Mensais Totais</span>
            <span className="mt-2 text-2xl font-semibold text-purple-600 dark:text-purple-400">
              {Number(valuesInterest[2]).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>
      )}

      {monthlyData.length > 0 && (
        <div className="mt-8 w-full">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">Tabela de Juros Mensais</h3>
          <div className="h-[25.125rem] overflow-auto">
            <table className="mt-4 w-full table-auto border-collapse dark:text-white">
              <thead className="sticky top-0 bg-white dark:bg-gray-800">
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Mês</th>
                  <th className="px-4 py-2 text-left">Total Investido (R$)</th>
                  <th className="px-4 py-2 text-left">Juros Acumulados (R$)</th>
                  <th className="px-4 py-2 text-left">Total Juros (R$)</th>
                  <th className="px-4 py-2 text-left">Total Acumulados (R$)</th>
                </tr>
              </thead>
              <tbody className="">
                {monthlyData.map((data, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{data.month}</td>
                    <td className="px-4 py-2">
                      {data.totalAmount.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-4 py-2">
                      {data.accumulatedInterest.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-4 py-2">
                      {data.amountAllCalc.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-4 py-2">
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
        <div className="mt-8 flex w-full flex-col gap-6">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">Gráfico de Juros Compostos</h3>
          <ResponsiveContainer width="100%" height={400}>
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
                activeDot={{ r: 8 }}
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
