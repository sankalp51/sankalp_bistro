import logo from '../assets/logo.jpg';
import Button from './UI/Button';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import UserProgressContext from '../context/UserProgress';

const Header = () => {
    const totalCartItems = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);
    const totalItems = totalCartItems.items.reduce((totalItems, item) => {
        return totalItems + item.quantity
    }, 0);

    const handleShowCart = () => {
        userProgressContext.showCart();
    }


    return (
        <header id='main-header'>
            <div id='title'>
                <h1>Sankalp's Bistro</h1>
                <img src={logo} alt='restaurant-logo' />
            </div>
            <nav>
                <Button textOnly
                    onClick={handleShowCart}>
                    Cart ({totalItems})
                </Button>
            </nav>
        </header>
    );
};

export default Header;