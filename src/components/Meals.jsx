import useFetch from "../hooks/useFetch";
import MealItem from "./MealItem";
import Error from "./Error";

const requestConfig = {};
const Meals = () => {
    const { data: loadedMeals, isLoading, error } = useFetch('http://localhost:3000/meals', requestConfig, []);
    if (isLoading) return <p style={{ textAlign: 'center' }}>Loading meal items...</p>
    if (error) return <Error title="Failed to fetch meals" message={error} />
    return (

        <ul id="meals">
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