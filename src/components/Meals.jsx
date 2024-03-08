import { useEffect, useState } from "react";
import MealItem from "./MealItem";
const Meals = () => {
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            const response = await fetch('http://localhost:3000/meals');
            if (!response.ok) {
                ///
            }
            const data = await response.json();
            setLoadedMeals(data);
        }
        fetchMeals();
    }, []);

    return (
        <ul id="meals">
            {!loadedMeals && <p>fetching meals</p>}
            {loadedMeals.map(items => <MealItem
                key={items.id}
                id={items.id}
                name={items.name}
                price={items.price}
                description={items.description}
                image={items.image}
            />)}
        </ul>
    );
};

export default Meals;