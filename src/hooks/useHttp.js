import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config)
    const resData = await response.json();
    if (!response.ok) {
        throw new Error(resData.message || 'Something Wnt wrong')
    }

    return resData
}

export default function useHttp(url, config , initalData) {
    const [data, setData] = useState(initalData);
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    const sendRequest = useCallback(async function sendRequest() {
        setIsLoading(true)
        try {
            const resData = await sendHttpRequest(url, config);
            setData(resData)
        }
        catch (error) {
            setError(error.message || 'Something Wnt wrong')
        }
        setIsLoading(false)
    }, [url, config])


    useEffect(() => {
        if((config && (config.method === 'GET'  || !config.method)) || !config){
            sendRequest();
        }
    }, [sendRequest ,config])

    return {
        data,
        isLoading,
        error,
        sendRequest
    }
}