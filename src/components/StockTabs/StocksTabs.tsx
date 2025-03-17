import { ChevronDown, Users } from "lucide-react";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStockShareholdersDetails } from "@/provider/StockDataDetails/StockShareholdersDataDetails";

import Title from "../Title/Title";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TabsOverview from "./TabsOverview/TabsOverview";
import TabsQuotes from "./TabsQuotes/TabsQuotes";

export function StockTabs() {
  const { stockShareholdersDetails } = useStockShareholdersDetails();
  const [activeTab, setActiveTab] = useState("overview");

  function handleTabChange(tab: string) {
    setActiveTab(tab);
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} defaultValue="overview" className="w-full">
      <TabsList className="flex items-center justify-between border border-border bg-card">
        <TabsTrigger
          value="overview"
          className="h-full w-full data-[state=active]:border data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:text-primary-t"
        >
          Overview
        </TabsTrigger>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`${activeTab !== "overview" && activeTab !== "quotes" ? "border border-border bg-background text-primary-t" : ""} h-full w-full`}
            >
              Information <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 px-0">
            <DropdownMenuItem
              className={`${activeTab === "shareholders" && "bg-tertiary text-primary focus:bg-tertiary/80"}`}
            >
              <TabsTrigger
                value="shareholders"
                className="px-0 hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                onClick={() => setActiveTab("shareholders")}
              >
                Main Shareholders
              </TabsTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>Administration</DropdownMenuItem>
            <DropdownMenuItem>Relevant Facts</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TabsTrigger
          className="h-full w-full data-[state=active]:border data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:text-primary-t"
          value="quotes"
        >
          Quotes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <TabsOverview />
      </TabsContent>
      <TabsContent value="quotes">
        <TabsQuotes />
      </TabsContent>

      <TabsContent value="shareholders" className="flex flex-col gap-2 pt-4">
        <Title name="Principais Acionistas" icon={<Users size={20} />} />

        <div className="flex items-center justify-between">
          <Card className="rounded-lg border border-border bg-card px-5 pt-4">
            <CardHeader className="p-0">
              <CardTitle className="text-lg text-primary-t">Ações ordinárias </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <Table>
                <TableHeader>
                  <TableRow className="!border-b-0 bg-tertiary hover:bg-tertiary/80">
                    <TableHead className="text-primary-t">Acionista</TableHead>
                    <TableHead className="text-right text-primary-t">Participação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockShareholdersDetails.commonShares.map((shareholder, index) => (
                    <TableRow key={index} className="border-border hover:bg-background">
                      <TableCell className="text-primary-t">{shareholder.name}</TableCell>
                      <TableCell className="text-right text-primary-t">{shareholder.percentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="rounded-lg border border-border bg-card px-5 pt-4">
            <CardHeader className="p-0">
              <CardTitle className="text-lg text-primary-t">Capital total</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <Table>
                <TableHeader>
                  <TableRow className="!border-b-0 bg-tertiary hover:bg-tertiary/80">
                    <TableHead className="text-primary">Acionista</TableHead>
                    <TableHead className="text-right text-primary">Participação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockShareholdersDetails.totalCapital.map((shareholder, index) => (
                    <TableRow key={index} className="border-border hover:bg-background">
                      <TableCell className="text-primary-t">{shareholder.name}</TableCell>
                      <TableCell className="text-right text-primary-t">{shareholder.percentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
