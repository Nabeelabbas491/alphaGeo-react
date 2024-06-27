import { useEffect, useState } from "react";

function useGetParams() {

    const [data, setData] = useState<any>({})

    useEffect(() => {
        console.log("r43dew")
        const urlParams: any = new URLSearchParams(window.location.search);
        const params = Object.assign({})

        // Iterate over all keys and values in the URLSearchParams object
        for (const [key, value] of urlParams.entries()) {
            params[key] = value;
        }

        setData(params)
    }, [])

    return data
}

export default useGetParams;