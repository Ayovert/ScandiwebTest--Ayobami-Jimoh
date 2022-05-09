import { type } from "@testing-library/user-event/dist/type";
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
  currencyActive:number;
}

type CurrencyState={
  currencyNum:number;
}

class CurrencyList extends PureComponent<Props> {
state:CurrencyState={
  currencyNum: this.props.currencyActive
}


  handleCurrenc = (index: number) => {
    
    
    //this.setState({open: !this.state});
    document.cookie = `currency=${index}`;
  };

 


  
  

  

  render(): ReactNode {

    const {handleCurrency} = this.props;
    const {currencyNum} = this.state;
    console.log(currencyNum);
    return (
      <>
    
      
        <div className="currencyList" >
          <ul style={{
            listStyle: 'none',
             padding:0
             }}>
            {currency.map(({ symbol, name }, index) => {

              
              return (
                <li key ={name} className="currencyListItem"
                style={{
                  backgroundColor: `${currencyNum === index  ? '#8df3a4': ""}`
                }}
                
                onClick={() => {
                  console.log(index)
                  this.setState({currencyNum: index})
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