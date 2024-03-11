import { useCallback, useEffect, useState } from "react";
import { sendHttpRequest } from "../util/http";

const useFetch = (url, config, initialData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(initialData);
    const [error, setError] = useState(undefined);

    const clearData = () => {
        setData(initialData);
    }

    const sendRequest = useCallback(async function sendRequest(data) {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, { ...config, body: data });
            setData(resData);
        } catch (error) {
            setError(error.message || "Something went wrong");
        }
        setIsLoading(false);
    }, [url, config])

    useEffect(() => {
        if (config?.method === 'GET' || !config.method || !config) sendRequest();
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
};

export default useFetch;