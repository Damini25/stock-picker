import React from "react";
import {
  cleanup,
  render,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBox from "./SearchBox";
import { SYMBOL_SEARCH } from "../../mockData/symbolSearch";
import { getStockDetails, getSuggestionsList } from "../../service/service";
import { STOCK_DETAILS } from "../../mockData/stockDetails";
import { hasKeys } from "../../utilities/utilities";

/**
 * these below test cases should be checked
 * 1. check for component to be present in document
 * 2. check for auto suggestion list to be shown when we change input
 * 3. check for getSuggestionsList error scenario
 * 4. check for getStockDetails call on list item click
 * 5. check for getStockDetails call on search button click
 */

afterEach(cleanup);

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock("../../service/service", () => {
  return {
    getSuggestionsList: jest.fn(),
    getStockDetails: jest.fn(),
  };
});

jest.mock("../../utilities/utilities", () => {
  return {
    hasKeys: jest.fn(()=>true),
  };
});

describe("[SearchBox Component] - test cases", () => {
  it("1. check for component to be present in document", () => {
    const { container } = render(<SearchBox />);
    const mainHeader = container.querySelector(".main-header");
    const searchInput = container.querySelector(".search-input");
    const searchBtn = container.querySelector(".search-btn");
    expect(mainHeader).toHaveTextContent("Symbol Search");
    expect(searchInput).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it("2. check for suggestionsListContainer to be shown when we change the input", async () => {
    jest.useFakeTimers();

    //@ts-ignore
    getSuggestionsList.mockImplementation(() => SYMBOL_SEARCH);

    const { container } = render(<SearchBox />);
    const searchInput = container.querySelector(".search-input");
    //@ts-ignore
    await waitFor(() => userEvent.type(searchInput, "nifty"));
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    await waitFor(() => expect(getSuggestionsList).toBeCalledWith("nifty"));
    const suggestionsListContainer = container.querySelector(".list-container");
    expect(suggestionsListContainer).toBeInTheDocument();
  });

  it("3. check for getSuggestionsList error scenario", async () => {
    jest.useFakeTimers();

    //@ts-ignore
    getSuggestionsList.mockImplementation(() =>
      Promise.reject("Something went wrong")
    );

    const { container } = render(<SearchBox />);
    const searchInput = container.querySelector(".search-input");
    //@ts-ignore
    await waitFor(() => userEvent.type(searchInput, "nifty"));
    act(() => {
      jest.advanceTimersByTime(10000);
    });
  
    try {
      await waitFor(() => expect(getSuggestionsList).toBeCalled());
    } catch (e) {
      expect(e).toBe("Something went wrong");
    }
  });

  it("4. check for getStockDetails call on list item click", async () => {
    jest.useFakeTimers();

    //@ts-ignore
    getSuggestionsList.mockImplementation(() => SYMBOL_SEARCH);

    //@ts-ignore
    getStockDetails.mockImplementation(() => STOCK_DETAILS);

     //@ts-ignore
     hasKeys.mockImplementation(() => true);

    const { container } = render(<SearchBox />);
    const searchInput = container.querySelector(".search-input");
    //@ts-ignore
    await waitFor(() => userEvent.type(searchInput, "nifty"));
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    await waitFor(() => expect(getSuggestionsList).toBeCalledWith("nifty"));
    const suggestionsListItem = container.querySelector(".list-item-0");
    expect(suggestionsListItem).toBeInTheDocument();

    //@ts-ignore
    await waitFor(() => userEvent.click(suggestionsListItem));
    expect(getStockDetails).toBeCalled();
  });

  it("5. check for getStockDetails call on search button click", async () => {
    jest.useFakeTimers();

    //@ts-ignore
    getSuggestionsList.mockImplementation(() => SYMBOL_SEARCH);

    //@ts-ignore
    getStockDetails.mockImplementation(() => STOCK_DETAILS);

     //@ts-ignore
     hasKeys.mockImplementation(() => true);

    const { container } = render(<SearchBox />);
    const searchInput = container.querySelector(".search-input");
    //@ts-ignore
    await waitFor(() => userEvent.type(searchInput, "nifty"));
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    await waitFor(() => expect(getSuggestionsList).toBeCalledWith("nifty"));
    const searchBtn = container.querySelector(".search-btn");
    expect(searchBtn).toBeInTheDocument();
    //@ts-ignore
    await waitFor(() => userEvent.click(searchBtn));
    expect(getStockDetails).toBeCalled();
  });

});
