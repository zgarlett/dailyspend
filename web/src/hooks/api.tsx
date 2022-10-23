import { useEffect, useState } from 'react';

export function ApiFetch(url: string, options: any) {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>();
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        fetch(url,options)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(true);
                setLoading(false);
            });
    }, [url, options]);

    return { loading, data, error };
}