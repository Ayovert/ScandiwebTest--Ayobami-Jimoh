import { PureComponent, ReactNode, useState } from "react";
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

type Props={
  handleCurrency:()=>void
}


class CurrencyList extends PureComponent<Props> {



  handleCurrenc = (index: number) => {
    
    
    //this.setState({open: !this.state});
    document.cookie = `currency=${index}`;
  };

  

  

  render(): ReactNode {

    const {handleCurrency} = this.props;
    return (
      <>
    
      
        <div className="currencyList" >
          <ul style={{
            listStyle: 'none',
             padding:0
             }}>
            {currency.map(({ symbol, name }, index) => {
              return (
                <li key ={name} className="currencyListItem" onClick={() => {
                  this.handleCurrenc(index)
                  handleCurrency()
                  }}>
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

  
 
}

export default CurrencyList;