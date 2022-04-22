import { NavLink } from 'react-router-dom';
import CartOverlay from './cartOverlay';
import CurrencyList from './currencylist';
import './header.scss'
import {ReactComponent as CartIcon} from '../../images/cart.svg'
import cartImg from "../../images/cart.svg";

const navLinks = [
    { title: "WOMEN", path: "/women" },
    { title: "MEN", path: "/men" },
    { title: "KIDS", path: "/kids" },
  ];

export default function Header(){
    return(
        <header className="navHeader" >
            <div className='subHeader'>

                <div className='homeHeader'>
                    <NavLink to='/'
                    style={{
                        textDecoration:'none'
                    }}
                    >
                    <h3>
                    Home
                    </h3>
                    </NavLink>
                    
                    
                    </div>

                    <nav>
                        <ul className='navList'>
                            {navLinks.map(({title, path}) =>{
                                return(
                                    <li key={path}>
                                        <NavLink to={path} className='navItem'>
                                            {title}
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    <div className='currencyDiv'>
                    <button type='button' className="currencyButton">
        <span>$</span> 
        <span className='currencyArrow' 
        style={{
            display: 'inline-block',
  transform: 'rotateX(180deg)',
  WebkitTransform: 'rotateX(180deg)',
  fontSize: 20,
  position: 'relative',
  bottom: '10%', 
  margin: 5
        }}
        >
            ^
        </span>
      </button>
      <CurrencyList/>
                    </div>
                    

                    
                    
                    <div className='cartOverlay'>
                        <span className='cartButton' 
                        style={{
                            transform: "scaleX(-1)",
                          }}
                        >
                            <CartIcon
                            height={25}
                            width={25}
                            />
                        </span>
                    <CartOverlay />
                    </div>
                    
            </div>
        </header>
    )
}