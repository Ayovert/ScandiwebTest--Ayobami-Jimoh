import logo from './logo.svg';
import './App.css';
import Header from './header/header';
import { Route, Routes } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { EXCHANGE_RATES } from '../api/queries';
import CategoryPage from '../../features/category/category';
import HomePage from '../../features/home/homepage';
import ProductDetails from '../../features/Product/productDetails'
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
      <Routes>
        <Route path='/' element={<HomePage/>}/>

       

        <Route path='/women' element={<CategoryPage categoryName='clothes'/>} />
        <Route path='/men' element={<CategoryPage categoryName='tech'/>} />
        <Route path='/kids' element={<CategoryPage categoryName='tech'/>}/>
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="*" element={<NotFound/>}/>

        <Route path="/cart" element={<CartPage/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
