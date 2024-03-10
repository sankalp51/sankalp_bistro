import { useContext } from 'react';
import Modal from './UI/Modal';
import { CartContext } from '../context/CartContext';
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../context/UserProgress';

const Checkout = () => {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);
    const cartTotal = cartContext.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price
    },
        0);


    function handleClose() {
        userProgressContext.hideCheckOut();
    }

    return (
        <Modal open={userProgressContext.progress === 'checkout'} onClose={handleClose}>
            <form>
                <h2>Checkout</h2>
                <p>Total Ammount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="full-name" />
                <Input label="Email" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className='control-row'>
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                <p className='modal-actions'>
                    <Button onClick={handleClose} type="button" textOnly>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    );
};

export default Checkout;