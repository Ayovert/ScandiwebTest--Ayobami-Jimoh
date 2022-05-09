import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../features/home/homepage';
import ProductDetails from '../../features/product/productDetails'
import NotFound from '../../features/error/NotFound';
import CartPage from '../../features/Cart/cartPage';
import ProductListPage2 from '../../features/product/productsComponent';
import { AddtoCart, RemoveFromCart, removeFromCart } from '../../features/Cart/cartSlice';
import { Product } from '../model/Product';
import { connect, ConnectedProps } from 'react-redux';
import { PureComponent } from 'react';
import { RootState } from '../redux/store';
import HeaderComponent from './header/header';
import { getCookie } from '../util/util';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { CartParams } from '../model/Cart';


interface DispatchProps{
  addToCart :(cartParams : CartParams) => void;
  removeFromCart :(cartParams : CartParams) => void;
}


const mapDispatchToProps = (dispatch:ThunkDispatch<RootState,void, AnyAction>):DispatchProps => ({
  addToCart : (cartParams: CartParams) =>{dispatch(AddtoCart(cartParams))},
  removeFromCart : (cartParams:CartParams) =>{dispatch(RemoveFromCart(cartParams))}
  
});


const mapStateToProps = (state : RootState) => {
  return{
    cart : state.cart.cart
  }
}


/*const mapDispatchToProps =(dispatch: any) => ({
   
  addToCart : (product:Product, quantity?:number) =>{dispatch(AddtoCart({product,quantity}))}
})*/



const connector = connect(mapStateToProps,mapDispatchToProps);

type PropRedux = ConnectedProps<typeof connector>


type AppState ={
  currency:number;
}


const routes =[
  {path:'/shop' , categoryName:'all', pageTitle: 'SHOP'},
  {path:'/tech' , categoryName:'tech', pageTitle: 'TECH'},
  {path:'/clothes' , categoryName:'clothes', pageTitle: 'CLOTHES'},

]

class App extends PureComponent<PropRedux, AppState> {

  constructor(props:PropRedux){
    super(props);
    this.state={
      currency:0
    }
  }

  /*state: AppState={
    currency: 0
  }*/


  handleCurrenc = () => {
    
    
    //this.setState({open: !this.state});

   
    const currstr = getCookie('currency');
 
    const currency =
      currstr === "" || currstr === undefined ? 0 : parseInt(currstr);
    


      this.setState({currency:currency});

     
    
  };

  componentDidMount(){
    this.handleCurrenc();
  }

 

  render(){

    const { currency} =this.state;
    const {addToCart, cart, removeFromCart} = this.props;



   
  



    return (
      <>
      <HeaderComponent cart={cart} handleCurrency={this.handleCurrenc} addCart={addToCart} removeFromCart ={removeFromCart}
      currency={currency}
      />
      <div style={{margin: '85px 155px'}}>
        <Switch>
          <Route exact path='/' render={() =><HomePage/>}/>
  
         {routes.map((values, index) =>(
           <Route key={index} path={values.path}>

             <Route exact path={values.path}>
             <ProductListPage2  categoryName={values.categoryName} pageTitle={values.pageTitle} addCart={addToCart} currency={currency} handleCurrency={this.handleCurrenc}/>
             </Route>

<Route path={`${values.path}/:id`} render={() =><ProductDetails handleCurrency={this.handleCurrenc} currency={currency} addCart={addToCart}/>} /> 

             </Route>
          
         ))}
        

          
          <Route path="/cart" render={() =><CartPage cart={cart} currency={currency} addCart={addToCart} removeFromCart ={removeFromCart}/>}/>
  
          <Route path="*" render={() =><NotFound/>}/>
  
          
        </Switch>
      </div>
      </>
    );
  }
 
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
