import axios from "axios";
import { useEffect, useState } from "react";
import { environment } from "../../environments/environment.dev";

function useFetch(endpoint: string) {

    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        axios.get(`${environment.BACKEND_URL}${endpoint}`)
            .then((response) => {
                setData(response)
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [endpoint])

    return { data, loading, error }

}

export default useFetch;