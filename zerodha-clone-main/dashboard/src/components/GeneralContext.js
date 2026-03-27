import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  openSellWindow: (uid) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [windowMode, setWindowMode] = useState("BUY");

  const handleOpenBuyWindow = (uid) => { setWindowMode("BUY"); setSelectedStockUID(uid); setIsWindowOpen(true); };
  const handleOpenSellWindow = (uid) => { setWindowMode("SELL"); setSelectedStockUID(uid); setIsWindowOpen(true); };
  const handleCloseBuyWindow = () => { setIsWindowOpen(false); setSelectedStockUID(""); };

  return (
    <GeneralContext.Provider value={{
      openBuyWindow: handleOpenBuyWindow,
      openSellWindow: handleOpenSellWindow,
      closeBuyWindow: handleCloseBuyWindow,
    }}>
      {props.children}
      {isWindowOpen && <BuyActionWindow uid={selectedStockUID} initialMode={windowMode} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
