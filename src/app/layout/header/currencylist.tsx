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

  const handleClick = (event: any) => {
    setOpen(!open);
  };
  return (
    <>
  
    
      <div className="currencyList" >
        <ul style={{listStyle: 'none' }}>
          {currency.map(({ symbol, name }) => {
            return (
              <li key ={name} className="currencyListItem">
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
