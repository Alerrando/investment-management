export interface StockShareholdersModel {
  commonShares: StockShareholdersDetailsModel[];
  totalCapital: StockShareholdersDetailsModel[];
}

export interface StockShareholdersDetailsModel {
  name: string;
  percentage: string;
}
