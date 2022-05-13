import "./App.css";
import { Route, Switch } from "react-router-dom";
import ProductDetails from "../../features/product/productDetails/productDetails";
import NotFound from "../../features/error/NotFound";
import CartPage from "../../features/Cart/cartPage";
import ProductListPage from "../../features/product/productsComponent";
import { AddtoCart, RemoveFromCart } from "../../features/Cart/cartSlice";
import { connect, ConnectedProps } from "react-redux";
import { PureComponent } from "react";
import { RootState } from "../redux/store";
import HeaderComponent from "./header/header";
import { getCookie } from "../util/util";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { CartParams } from "../model/Cart";
import { Query, QueryResult } from "@apollo/react-components";
import { GET_CATEGORIES } from "../api/queries";
import { Category } from "../model/Product";

interface DispatchProps {
  addToCart: (cartParams: CartParams) => void;
  removeFromCart: (cartParams: CartParams) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
): DispatchProps => ({
  addToCart: (cartParams: CartParams) => {
    dispatch(AddtoCart(cartParams));
  },
  removeFromCart: (cartParams: CartParams) => {
    dispatch(RemoveFromCart(cartParams));
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    cart: state.cart.cart,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropRedux = ConnectedProps<typeof connector>;

type AppState = {
  currency: number;
};

const currstr = getCookie("currency");

const currencyNum =
  currstr !== undefined && currstr !== "" ? parseInt(currstr) : 0;

class App extends PureComponent<PropRedux, AppState> {
  /*constructor(props:PropRedux){
    super(props);
    this.state={
      currency:0
    }
  }*/
  state: AppState = {
    currency: currencyNum,
  };

  handleCurrenc = () => {
    //this.setState({open: !this.state});

    const currstr = getCookie("currency");

    const currency =
      currstr !== undefined && currstr !== "" ? parseInt(currstr) : 0;

    this.setState({ currency: currency });
  };

  componentDidMount() {
    this.handleCurrenc();
  }
  render() {
    const { currency } = this.state;
    const { addToCart, cart, removeFromCart } = this.props;

    return (
      <>
        <Query query={GET_CATEGORIES}>
          {({ loading, error, data }: QueryResult) => {
            if (error) {
              console.log(error);
              return <h1>Error...</h1>;
            }
            if (loading || !data) return <h1>Loading...</h1>;

            const categoryData = data.categories as Category[];

            return (
              <>
                <HeaderComponent
                  cart={cart}
                  categories={categoryData}
                  handleCurrency={this.handleCurrenc}
                  addCart={addToCart}
                  removeFromCart={removeFromCart}
                  currency={currency}
                />
                <div style={{ margin: "85px 155px" }}>
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={() => (
                        <ProductListPage
                          categoryName={categoryData[0].name}
                          pageTitle={categoryData[0].name.toUpperCase()}
                          addCart={addToCart}
                          currency={currency}
                          handleCurrency={this.handleCurrenc}
                        />
                      )}
                    />

                    <Route
                      path="/cart"
                      render={() => (
                        <CartPage
                          cart={cart}
                          currency={currency}
                          addCart={addToCart}
                          removeFromCart={removeFromCart}
                        />
                      )}
                    />

                    {categoryData.map((values, index) => (
                      <Route key={index} path={`/${values.name}`}>
                        <Route exact path={`/${values.name}`}>
                          <ProductListPage
                            categoryName={values.name}
                            pageTitle={values.name.toUpperCase()}
                            addCart={addToCart}
                            currency={currency}
                            handleCurrency={this.handleCurrenc}
                          />
                        </Route>

                        <Route
                          path={`/${values.name}/:id`}
                          render={() => (
                            <ProductDetails
                              handleCurrency={this.handleCurrenc}
                              currency={currency}
                              addCart={addToCart}
                            />
                          )}
                        />
                      </Route>
                    ))}

                    <Route path="*" render={() => <NotFound />} />
                  </Switch>
                </div>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
