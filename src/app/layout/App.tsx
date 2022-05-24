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
import { getCurrency } from "../util/util";
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

class App extends PureComponent<PropRedux, AppState> {
  state: AppState = {
    currency: getCurrency(),
  };

  handleCurrenc = () => {
    const currency = getCurrency();

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
              <div className="App">
                <HeaderComponent
                  cart={cart}
                  categories={categoryData}
                  handleCurrency={this.handleCurrenc}
                  addCart={addToCart}
                  removeFromCart={removeFromCart}
                  currency={currency}
                />
                <div className="AppBody">
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
                              addCart={addToCart}
                              removeFromCart={removeFromCart}
                              cart={cart}
                            />
                          )}
                        />
                      </Route>
                    ))}

                    <Route
                      path="/cart"
                      render={() => (
                        <CartPage
                        currency={currency}
                          cart={cart}
                          addCart={addToCart}
                          removeFromCart={removeFromCart}
                        />
                      )}
                    />

                    <Route path="*" render={() => <NotFound />} />
                  </Switch>
                </div>
              </div>
            );
          }}
        </Query>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
