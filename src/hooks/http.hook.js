import { useCallback } from 'react'

const useHttp = () => {
    const request = useCallback( async (url, method = 'GET' , body = null, headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }) => {
        try {
            if (body) {
                body = JSON.stringify(body)
            }
            const response = await fetch(url, { method, headers: {...headers, body} })
            const data = await response.json()

            if (!response.ok) {
                throw data.message || 'Что-то пошло не так'
            }
            return data
        } catch (e) {
            console.log('catch ' ,e)
            throw e
        }
    },[])
    return { request }
}

export default useHttp