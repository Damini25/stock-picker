import { cleanup } from "@testing-library/react";
import { STOCK_DETAILS } from "../mockData/stockDetails";
import { SYMBOL_SEARCH } from "../mockData/symbolSearch";
import { getStockDetails, getSuggestionsList } from "./service";

/**
 * these below test cases should be checked
 * 1. check for getSuggestionsList handler
 * 2. check for getStockDetails handler
 */

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
  })
);

afterEach(cleanup);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("[service] - test cases", () => {
  it("1. check for getSuggestionsList handler", async () => {
    // @ts-ignore
    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: jest.fn(() => SYMBOL_SEARCH),
      })
    );
    let response = await getSuggestionsList("nifty");
    expect(response).toStrictEqual(SYMBOL_SEARCH);

    // check for empty response
    // @ts-ignore
    fetch.mockImplementation(() =>
      Promise.resolve({
        text: jest.fn(() => 'error'),
      })
    );
    try{
        response = await getSuggestionsList("nifty");
        
    }catch(e){
        expect(e).toBe('error');
    }

    // check for failure
    // @ts-ignore
    fetch.mockImplementation(() =>
      Promise.reject('error')
    );
    try{
        response = await getSuggestionsList("nifty");
        
    }catch(e){
        expect(e).toBe('error');
    }
  });

  it("2. check for getStockDetails handler", async () => {
    // @ts-ignore
    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: jest.fn(() => STOCK_DETAILS),
      })
    );
    let response = await getStockDetails("nifty");
    expect(response).toStrictEqual(STOCK_DETAILS);

    // check for empty response
    // @ts-ignore
    fetch.mockImplementation(() =>
      Promise.resolve({
        text: jest.fn(() => 'error'),
      })
    );
    try{
        response = await getStockDetails("nifty");
        
    }catch(e){
        expect(e).toBe('error');
    }

    // check for failure
    // @ts-ignore
    fetch.mockImplementation(() =>
      Promise.reject('error')
    );
    try{
        response = await getStockDetails("nifty");
        
    }catch(e){
        expect(e).toBe('error');
    }

  });

});
