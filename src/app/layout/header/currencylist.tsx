import { Query, QueryResult } from "@apollo/react-components";
import { PureComponent, ReactNode } from "react";
import { GET_CURRENCIES } from "../../api/queries";
import { Currency } from "../../model/Product";
import "./header.scss";

type Props = {
  handleCurrency: () => void;
  currencyActive: number;
};

type CurrencyState = {
  currencyNum: number;
};

class CurrencyList extends PureComponent<Props> {
  state: CurrencyState = {
    currencyNum: this.props.currencyActive,
  };

  handleCurrenc = (index: number) => {
    //this.setState({open: !this.state});
    document.cookie = `currency=${index}`;
  };

  render(): ReactNode {
    const { handleCurrency } = this.props;
    const { currencyNum } = this.state;

    return (
      <>
        <Query query={GET_CURRENCIES}>
          {({ loading, error, data }: QueryResult) => {
            if (error) {
              console.log(error);
              return <h1>Error...</h1>;
            }
            if (loading || !data) return <h1>Loading...</h1>;

            const currencyData = data.currencies as Currency[];

            return (
              <div className="currencyDiv">
                <button type="button" className="currencyButton">
                  <span>{currencyData[currencyNum].symbol}</span>
                  <span
                    className="currencyArrow"
                    style={{
                      display: "inline-block",
                      transform: "rotateX(180deg)",
                      WebkitTransform: "rotateX(180deg)",
                      fontSize: 20,
                      position: "relative",
                      bottom: "10%",
                      margin: 5,
                    }}
                  >
                    ^
                  </span>
                </button>

                {/**currencyLIst */}
                <div className="currencyList">
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                    }}
                  >
                    {currencyData.map(({ symbol, label }, index) => {
                      return (
                        <li
                          key={label}
                          className="currencyListItem"
                          style={{
                            backgroundColor: `${
                              currencyNum === index ? "#cfcfcf" : ""
                            }`,
                          }}
                          onClick={() => {
                            this.setState({ currencyNum: index });
                            this.handleCurrenc(index);
                            handleCurrency();
                          }}
                        >
                          <span>{symbol} </span>
                          <span> {label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/**currencyLIst */}
              </div>
            );
          }}
        </Query>
      </>
    );
  }
}

export default CurrencyList;
