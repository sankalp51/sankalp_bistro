import { currencyFormatter } from '../util/formatting.js';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import Button from './UI/Button.jsx';

const MealItem = (meal) => {

    const cartCtx = useContext(CartContext);

    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    }
    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt="meal-picture" />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add to cart</Button>
                </p>
            </article>
        </li>
    );
};

export default MealItem;