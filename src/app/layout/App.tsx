import logo from './logo.svg';
import './App.css';
import Header from './header/header';
import { Route, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { EXCHANGE_RATES } from '../api/queries';
import ProductListPage from '../../features/product/products';
import HomePage from '../../features/home/homepage';
import ProductDetails from '../../features/product/productDetails'
import NotFound from '../../features/error/NotFound';
import CartPage from '../../features/Cart/cartPage';


function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }: any) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}


function App() {
  return (
    <>
    <Header/>
    <div style={{margin: 100}}>
      <Switch>
        <Route exact path='/' render={() =><HomePage/>}/>

       

        <Route path='/women' render={() =><ProductListPage categoryName='clothes'/>} />
        <Route path='/men' render={() =><ProductListPage categoryName='tech'/>}/>
        <Route path='/kids' render={() =><ProductListPage  categoryName='tech'/>}/>
        <Route path="/product/:id" render={() =><ProductDetails />} />

        <Route path="*" render={() =><NotFound/>}/>

        <Route path="/cart" render={() =><CartPage/>}/>
      </Switch>
    </div>
    </>
  );
}

export default App;
