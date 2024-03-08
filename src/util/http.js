const fetchMeals = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        throw new Error('Error fetching meals');
    }
    return data;

}

export { fetchMeals };