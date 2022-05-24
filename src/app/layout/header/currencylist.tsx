import { Query, QueryResult } from "@apollo/react-components";
import { PureComponent, ReactNode } from "react";
import { GET_CURRENCIES } from "../../api/queries";
import { Currency } from "../../model/Product";
import { ReactComponent as ArrowIcon } from "../../../images/arrowR.svg";
import "./header.scss";
import { getCurrency } from "../../util/util";

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

  setCurrency = (index: number) => {
    //this.setState({open: !this.state});
    document.cookie = `currency=${index}`;
  };

  render(): ReactNode {
    const { handleCurrency } = this.props;

    return (
      <>
        <Query query={GET_CURRENCIES} variables={{}}>
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
                  <span>{currencyData[getCurrency()].symbol}</span>
                  <span className="currencyArrow">
                    <ArrowIcon height={12} width={12} />
                  </span>
                </button>

                {/**currencyLIst */}
                <div className="currencyList">
                  <ul>
                    {currencyData.map(({ symbol, label }, index) => {
                      return (
                        <li
                          key={label}
                          className="currencyListItem"
                          style={{
                            backgroundColor: `${
                              getCurrency() === index ? "#cfcfcf" : ""
                            }`,
                          }}
                          onClick={() => {
                            this.setState({ currencyNum: index });
                            this.setCurrency(index);
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
