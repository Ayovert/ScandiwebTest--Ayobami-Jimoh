import { useState } from "react";
import './header.scss'

const currency = [
  {
    symbol: "$",
    name: "USD",
  },
  {
    symbol: "E",
    name: "EUR",
  },
  {
    symbol: "Y",
    name: "JPY",
  },
];

export default function CurrencyList() {
  const [open, setOpen] = useState(false);

  const handleCurrency = (currency:string) => {
    setOpen(!open);
    document.cookie = `currency=${currency}`;
  };
  return (
    <>
  
    
      <div className="currencyList" >
        <ul style={{listStyle: 'none', padding:0 }}>
          {currency.map(({ symbol, name }) => {
            return (
              <li key ={name} className="currencyListItem" onClick={() => handleCurrency(name)}>
                <span>{symbol} </span>
                <span> {name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    
     
    </>
  );
}
