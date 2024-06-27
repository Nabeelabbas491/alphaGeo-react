import axios from "axios";
import { useState } from "react";
import { environment } from "../../environments/environment.dev";

function usePostData(endPoint: string) {

    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const postData = async (payLoad: any) => {
        try {
            setLoading(true)
            const response = await axios.post(`${environment.BACKEND_URL}${endPoint}`, payLoad)
            setData(response)
        } catch (error: unknown | any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error, postData }
}

export default usePostData;