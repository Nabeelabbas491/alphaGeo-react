import axios from "axios";
import { useState } from "react";
import { environment } from "../../environments/environment.dev";
import { getJwtToken } from "../utils/auth";

function useJwtPostData(endPoint: string) {

    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const postData = async (payLoad: any) => {
        try {
            setLoading(true)
            const response = await axios.post(`${environment.BACKEND_URL}${endPoint}`, payLoad, {
                headers: { Authorization: `Bearer ${getJwtToken()}` },
            })
            setData(response)
        } catch (error: unknown | any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error, postData }
}

export default useJwtPostData;