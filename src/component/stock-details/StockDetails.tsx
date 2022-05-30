import React, { FC } from "react";
import { hasKeys } from "../../utilities/utilities";
import "./StockDetails.scss";
import { StockDetailsPropTypes } from "./StockDetailsTypes";

const StockDetails: FC<StockDetailsPropTypes> = (props) => {
  const { stockData } = props;
  const {
    Symbol,
    Currency,
    Name,
    Description,
    Exchange,
    Industry,
    PERatio,
    MarketCapitalization,
  } = stockData;

  return (
    <div className="stock-details-container">
      {hasKeys(stockData) ? (
        <div className="stock-details">
          <div className="left-section">
            <div className="stock-item">
              <p>Symbol: </p>
              <p className="value">{Symbol}</p>
            </div>

            <div className="stock-item">
              <p>Currency: </p>
              <p className="value">{Currency}</p>
            </div>

            <div className="stock-item">
              <p>Name: </p>
              <p className="value">{Name}</p>
            </div>

            <div className="stock-item">
              <p>Exchange: </p>
              <p className="value">{Exchange}</p>
            </div>

            <div className="stock-item">
              <p>Industry: </p>
              <p className="value">{Industry}</p>
            </div>

            <div className="stock-item">
              <p>PERatio: </p>
              <p className="value">{PERatio}</p>
            </div>

            <div className="stock-item">
              <p>MarketCapitalization: </p>
              <p className="value">{MarketCapitalization}</p>
            </div>
          </div>

          <div className="right-section">
            <p>Description</p>
            <p className="value">{Description}</p>
          </div>
        </div>
      ) : (
        <p>Stock Not Found</p>
      )}
    </div>
  );
};

export default StockDetails;
