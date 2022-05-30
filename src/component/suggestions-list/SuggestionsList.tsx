import React, { FC } from "react";
import {
  SuggestionsListPropTypes,
} from "./SuggestionsListTypes";
import "./SuggestionsList.scss";

const SuggestionsList: FC<SuggestionsListPropTypes> = (props) => {
  const { suggestionsList, getStockData } = props;
  
  return (
    <div className="list-container">
      <div className="list-header">
        <p>Symbol</p>
        <p>Description</p>
      </div>
      {suggestionsList.length > 0 &&
        suggestionsList.map((item, index) => {
          return (
            <div className={`list-item-${index} list-item`} onClick={() => getStockData(item["1. symbol"])} key={item["1. symbol"]}>
              <div className="list-item-left">
                <p>{item["1. symbol"]}</p>
                <p className="desc">{item["2. name"].toLowerCase()}</p>
              </div>
              <p>{item["3. type"]}</p>
            </div>
          );
        })}
    </div>
  );
};

export default SuggestionsList;
