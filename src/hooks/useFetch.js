import { useState, useEffect } from "react";
import { fetchMeals } from "../util/http";

const useFetch = (url, defaultValue) => {
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState(defaultValue);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                setIsFetching(true);
                const meals = await fetchMeals(url);
                setData(meals);
                setIsFetching(false);
            } catch (error) {
                setError(error.message);
                setIsFetching(false)
            }
        }
        fetchData();
    }, [url]);
    return { isFetching, data, error }

};

export default useFetch;