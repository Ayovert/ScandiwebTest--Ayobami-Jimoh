import { useState } from "react";
import './header.scss'

const currency = [
  {
    symbol: "$",
    name: "USD",
  },
  {
    symbol: '£',
    name: "GBP",
  },
  {
    symbol: "A$",
    name: "AUD",
  },
  {
    symbol: "¥",
    name: "JPY",
  },
  {
    symbol: "₽",
    name: "RUB",
  },
];

export default function CurrencyList() {
  const [open, setOpen] = useState(false);

  const handleCurrency = (index: number) => {
    setOpen(!open);
    document.cookie = `currency=${index}`;
  };
  return (
    <>
  
    
      <div className="currencyList" >
        <ul style={{
          listStyle: 'none',
           padding:0
           }}>
          {currency.map(({ symbol, name }, index) => {
            return (
              <li key ={name} className="currencyListItem" onClick={() => handleCurrency(index)}>
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
