"use client";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableHeader } from "@/components/ui/table";

import PopoverAddConfig from "../PopoverAddConfig/PopoverAddConfig";

export default function InvestmentDistribution() {
  const [investmentValue, setInvestmentValue] = useState(1000);

  const [dataInfos, setDataInfos] = useState([
    { name: "Criptomoeda", value: 25, color: "#0088FE" },
    { name: "Tesouro Direto", value: 35, color: "#00C49F" },
    { name: "Ações", value: 20, color: "#FFBB28" },
    { name: "FIIs", value: 20, color: "#FF8042" },
  ]);

  const totalPercentage = dataInfos.reduce((acc, entry) => acc + entry.value, 0);

  const totalValue = dataInfos.reduce((acc, entry) => acc + (investmentValue * entry.value) / 100, 0);

  return (
    <main className="mt-[52px] flex h-[calc(85vh_-_52px)] w-full flex-col items-start justify-center rounded-lg">
      <h2 className="mb-6 text-3xl font-semibold text-primary-t">Distribuição de Investimentos</h2>

      <div className="flex w-full items-center justify-between gap-6">
        <div className="flex w-full flex-col rounded-lg border border-primary/20 bg-foreground p-3 shadow-lg">
          <h3 className="mb-4 text-lg font-bold text-purple-600">Gráfico</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={dataInfos}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {dataInfos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex w-full flex-wrap justify-center gap-6">
            {dataInfos.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    backgroundColor: entry.color,
                    borderRadius: "50%",
                  }}
                ></div>
                <span className="text-sm text-primary-t">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex h-full w-full flex-col rounded-lg border border-primary/20 bg-foreground p-3 shadow-lg">
          <h3 className="mb-4 text-lg font-bold text-purple-600">Tabela de Investimentos</h3>
          <Table className="w-full text-sm">
            <TableHeader>
              <tr className="border-primary/20">
                <th className="py-2 text-left text-primary-t">Investimento</th>
                <th className="py-2 text-left text-primary-t">Percentual</th>
                <th className="py-2 text-left text-primary-t">Valor</th>
              </tr>
            </TableHeader>
            <TableBody>
              {dataInfos.map((entry, index) => (
                <tr key={index} className="border-b border-primary/20">
                  <td className="py-2 text-left text-primary-t">{entry.name}</td>
                  <td className="py-2 text-left text-primary-t">{entry.value}%</td>
                  <td className="py-2 text-left text-primary-t">
                    {((investmentValue * entry.value) / 100).toFixed(2)}
                  </td>
                </tr>
              ))}

              <tr className="border-t border-primary/20 font-semibold">
                <td className="py-2 text-left text-primary-t">Total</td>
                <td className="py-2 text-left text-primary-t"></td>
                <td className="py-2 text-left text-primary-t">{totalValue.toFixed(2)}</td>
              </tr>
            </TableBody>
          </Table>
        </div>

        <div className="flex h-full w-full flex-col rounded-lg border border-primary/20 bg-foreground p-3 shadow-lg">
          <div className="flex w-full items-center justify-between">
            <h3 className="text-lg font-bold text-purple-600">Configurações</h3>

            <PopoverAddConfig dataInfos={dataInfos} setDataInfos={setDataInfos} />
          </div>
          <div className="flex h-full w-full flex-col items-start justify-center gap-4">
            {dataInfos.map((item, index: number) => (
              <div key={item.name} className="flex w-full flex-col">
                <div className="flex w-full items-center justify-between">
                  <div className="mb-1 text-[14px] font-semibold text-primary-t">
                    {`${item.name.charAt(0).toUpperCase() + item.name.slice(1)} ${item.value}%`}
                  </div>

                  <Trash
                    size={16}
                    className="cursor-pointer text-primary-t"
                    onClick={() => handleDeleteConfig(index)}
                  />
                </div>
                <Slider
                  onValueChange={(value) => handleChangeSlider(index, value[0])}
                  style={{ height: "20px" }}
                  value={[item.value]}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm font-semibold text-primary-t">
            <span className={`${totalPercentage > 100 && "text-red-600"}`}>
              Soma das porcentagens: {totalPercentage}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex w-full items-center gap-4 rounded-full border border-primary/40 bg-foreground px-4 py-2 shadow-sm">
        <input
          type="number"
          value={investmentValue}
          onChange={handleInputChange}
          placeholder="Insira o valor"
          className="w-full appearance-none bg-transparent text-sm text-primary-t outline-none"
        />
        <button className="rounded-full bg-purple-600 px-4 py-1 text-sm text-white hover:bg-purple-700">
          Calcular
        </button>
      </div>
    </main>
  );

  function handleChangeSlider(index: number, value: number) {
    const newDataInfos = [...dataInfos];
    newDataInfos[index].value = value;
    setDataInfos(newDataInfos);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInvestmentValue(Number(event.target.value));
  }

  function handleDeleteConfig(index: number) {
    const newDataInfos = [...dataInfos];
    newDataInfos.splice(index, 1);
    setDataInfos(newDataInfos);
  }
}
