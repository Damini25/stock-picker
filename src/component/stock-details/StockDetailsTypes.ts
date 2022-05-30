export interface StockDetailsPropTypes {
  stockData: StockDataTypes;
}

export interface StockDataTypes{
  Symbol: string;
  Name: string;
  Description: string;
  Exchange: string;
  Currency: string;
  Industry: string;
  PERatio: string;
  MarketCapitalization: string;
}