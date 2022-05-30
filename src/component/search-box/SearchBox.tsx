import React, {
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import useDebounce from "../../hooks/useDebounce";
import { getStockDetails, getSuggestionsList } from "../../service/service";
import { hasKeys } from "../../utilities/utilities";
import StockDetails from "../stock-details/StockDetails";
import { StockDataTypes } from "../stock-details/StockDetailsTypes";
import SuggestionList from "../suggestions-list/SuggestionsList";
import './SearchBox.scss';

const SearchBox: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedVal = useDebounce(inputValue, 1000);
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [stockData, setStockData] = useState({} as StockDataTypes);
  const [showList, setShowList] = useState(false);
  const [showStockData, setShowStockData] = useState(false);
 

  /**
   * debounce the getSuggestions function call
   */
    useEffect(() => {
      getSuggestions(debouncedVal);
  }, [debouncedVal]);

  /**
   * get suggestions list data
   * @param value {string}
   */
  const getSuggestions = async (value: string) => {
    try {
      const response = await getSuggestionsList(value);
      if(response?.bestMatches){
        setShowList(true);
        setShowStockData(false);
        setSuggestionsList(response?.bestMatches);
      }
    } catch (error) {
    }
  };

  /**
   * on symbol change
   * @param event {React.ChangeEvent<HTMLInputElement>}
   */
  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  /**
   * get stock data on keyboard enter
   * @param event {React.KeyboardEvent<HTMLInputElement>}
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>)=>{
      if (event.code === "Enter") {
        event.preventDefault();
        getStockData(inputValue);
      }
  }
  /**
   * get stock detailed data
   * @param symbol {string}
   */
  const getStockData = useCallback(async (symbol: string) => {
    try {
      setShowList(false);
      setShowStockData(true);
      const response = await getStockDetails(symbol);
      if (hasKeys(response) && response.Symbol) {
        setStockData(response);
      }
    } catch (error) {
      setShowStockData(false);
    }
  }, []);

  return (
    <>
    <h2 className="main-header">Symbol Search</h2>
      <input
        type="text"
        onChange={onInputChangeHandler}
        value={inputValue}
        className="search-input"
        onKeyDown={handleKeyDown}
      />
      <button type="submit" onClick={()=> getStockData(inputValue)} className="search-btn">Search</button>

      {!!(inputValue && showList) && <SuggestionList suggestionsList = {suggestionsList} getStockData={getStockData} />}
      {showStockData && <StockDetails stockData ={stockData} />}
    </>
  );
};

export default SearchBox;
