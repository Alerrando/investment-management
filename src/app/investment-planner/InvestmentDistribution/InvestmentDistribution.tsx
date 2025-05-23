"use client";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
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
    <main className="flex h-auto w-full flex-col items-start justify-center rounded-lg p-4 md:mt-[52px]">
      <h2 className="mb-3 text-xl font-semibold text-primary-t md:mb-6 md:text-2xl">Distribuição de Investimentos</h2>

      <div className="flex w-full flex-col gap-6 lg:flex-row">
        <div className="flex w-full flex-col rounded-lg border border-border/20 bg-foreground p-3 shadow-lg">
          <h3 className="mb-4 text-base font-bold text-purple-600 md:text-lg">Gráfico</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={dataInfos}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={"100%"} // Reduzido para mobile
                fill="#8884d8"
                dataKey="value"
              >
                {dataInfos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex w-full flex-wrap justify-center gap-4">
            {dataInfos.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: entry.color,
                    borderRadius: "50%",
                  }}
                ></div>
                <span className="text-xs text-primary-t md:text-sm">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex h-auto w-full flex-col rounded-lg border border-border/20 bg-foreground p-3 shadow-lg">
          <h3 className="mb-4 text-base font-bold text-purple-600 md:text-lg">Tabela de Investimentos</h3>
          <div className="overflow-x-auto">
            <Table className="w-full min-w-[400px] text-xs md:text-sm">
              <TableHeader>
                <tr className="border-border/20">
                  <th className="py-2 text-left text-primary-t">Investimento</th>
                  <th className="py-2 text-left text-primary-t">Percentual</th>
                  <th className="py-2 text-left text-primary-t">Valor</th>
                </tr>
              </TableHeader>
              <TableBody>
                {dataInfos.map((entry, index) => (
                  <tr key={index} className="border-b border-border/20">
                    <td className="py-2 text-left text-primary-t">{entry.name}</td>
                    <td className="py-2 text-left text-primary-t">{entry.value}%</td>
                    <td className="py-2 text-left text-primary-t">
                      {((investmentValue * entry.value) / 100).toFixed(2)}
                    </td>
                  </tr>
                ))}

                <tr className="border-t border-border/20 font-semibold">
                  <td className="py-2 text-left text-primary-t">Total</td>
                  <td className="py-2 text-left text-primary-t"></td>
                  <td className="py-2 text-left text-primary-t">{totalValue.toFixed(2)}</td>
                </tr>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex h-full w-full flex-col gap-3 rounded-lg border border-border/20 bg-foreground p-3 shadow-lg">
          <div className="flex w-full items-center justify-between">
            <h3 className="text-base font-bold text-purple-600 md:text-lg">Configurações</h3>
            <PopoverAddConfig dataInfos={dataInfos} setDataInfos={setDataInfos} />
          </div>
          <div className="flex h-full w-full flex-col items-start justify-center gap-4">
            {dataInfos.map((item, index: number) => (
              <div key={item.name} className="flex w-full flex-col">
                <div className="flex w-full items-center justify-between">
                  <div className="mb-1 text-xs font-semibold text-primary-t md:text-sm">
                    {`${item.name.charAt(0).toUpperCase() + item.name.slice(1)} ${item.value}%`}
                  </div>
                  <Trash
                    size={14}
                    className="cursor-pointer text-primary-t"
                    onClick={() => handleDeleteConfig(index)}
                  />
                </div>
                <Slider
                  onValueChange={(value) => handleChangeSlider(index, value[0])}
                  style={{ height: "16px" }}
                  value={[item.value]}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs font-semibold text-primary-t md:text-sm">
            <span className={`${totalPercentage > 100 && "text-red-600"}`}>
              Soma das porcentagens: {totalPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Input de Valor */}
      <div className="mt-6 flex w-full items-center gap-4 rounded-full border border-border bg-foreground px-4 py-2 shadow-sm">
        <input
          type="number"
          value={investmentValue}
          onChange={handleInputChange}
          placeholder="Insira o valor"
          className="w-full appearance-none bg-transparent text-xs text-primary-t outline-none md:text-sm"
        />
        <Button variant="default" className="rounded-full text-xs md:text-sm">
          Calcular
        </Button>
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
