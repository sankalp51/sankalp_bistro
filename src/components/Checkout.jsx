import { useContext } from 'react';
import Modal from './UI/Modal';
import { CartContext } from '../context/CartContext';
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../context/UserProgress';
import useFetch from '../hooks/useFetch';
import Error from './Error';

const config = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }

}

const Checkout = () => {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const { data, isLoading: isSending, error, sendRequest, clearData } = useFetch('http://localhost:3000/orders', config)


    const cartTotal = cartContext.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price
    },
        0);


    function handleClose() {
        userProgressContext.hideCheckOut();
    }

    function handleFinish() {
        userProgressContext.hideCheckOut();
        cartContext.clearCart();
        clearData();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const customerData = Object.fromEntries(formData.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartContext.items,
                customer: customerData
            }
        }))
    }

    let actions = (
        <>
            <Button onClick={handleClose} type="button" textOnly>Close</Button>
            <Button>Submit Order</Button>
        </>)

    if (isSending) {
        actions = <span>Sending order data</span>
    }

    if (data && !error) {
        return <Modal open={userProgressContext.progress === 'checkout'} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully</p>
            <p>We will get back to you via email in the next few minutes</p>
            <p className='modal-actions'>
                <Button onClick={handleFinish}>Ok</Button>
            </p>
        </Modal>
    }

    return (
        <Modal open={userProgressContext.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Ammount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="Email" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className='control-row'>
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                {error && <Error title="Failed to submit order" message={error} />}
                <p className='modal-actions'>
                    {actions}
                </p>
            </form>
        </Modal>
    );
};

export default Checkout;