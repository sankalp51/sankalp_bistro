import { CartContext } from '../context/CartContext.jsx';
import Modal from './UI/Modal.jsx';
import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import UserProgressContext from '../context/UserProgress.jsx';

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price
    },
        0);

    const handleCloseCart = () => {
        userProgressContext.hideCart();
    }


    return (
        <Modal className='cart' open={userProgressContext.progress === 'cart'} >
            <h2>Your cart</h2>
            <ul>
                {cartCtx.items.map(item => <li key={item.id}>{item.name}-{item.quantity}</li>)}
            </ul>
            <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
            <p className='modal-actions'>
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                <Button onClick={handleCloseCart}>Go to checkout</Button>
            </p>
        </Modal>
    );
};

export default Cart;