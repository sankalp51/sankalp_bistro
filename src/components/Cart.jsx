import { CartContext } from '../context/CartContext.jsx';
import Modal from './UI/Modal.jsx';
import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import UserProgressContext from '../context/UserProgress.jsx';
import CartItem from './CartItem.jsx';

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

    const handleGoToCheckOut = () => {
        userProgressContext.showCheckOut();
    }


    return (
        <Modal
            className='cart'
            open={userProgressContext.progress === 'cart'}
            onClose={userProgressContext.progress === 'cart' ? handleCloseCart : null}>
            <h2>Your cart</h2>
            <ul>
                {cartCtx.items.map(item => <CartItem
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    onIncrease={() => cartCtx.addItem(item)}
                    onDecrease={() => cartCtx.removeItem(item.id)}
                />)}
            </ul>
            <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
            <p className='modal-actions'>
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckOut}>Go to checkout</Button>}
            </p>
        </Modal>
    );
};

export default Cart;