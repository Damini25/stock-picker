import { STOCK_DETAILS } from "../mockData/stockDetails";
import { SYMBOL_SEARCH } from "../mockData/symbolSearch";

/**
 * to get the suggestions list
 * @param query {string}
 */
export const getSuggestionsList = async (query: string) => {
  try {
   // return SYMBOL_SEARCH;
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=1SA96WZUX22QRWCJ`;
    const response = await fetch(url, {
      method: "get",
    });
    
    if (response.ok) {
      const data = await response.json();
      return data
    }
    return Promise.reject(response.text());
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * to get the stock details
 * @param symbol {string}
 */
export const getStockDetails = async (symbol: string) => {
    try {
   //   return STOCK_DETAILS;
      const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=1SA96WZUX22QRWCJ`;
      const response = await fetch(url, {
        method: "get",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      return Promise.reject(response.text());
    } catch (error) {
      return Promise.reject(error);
    }
  };

