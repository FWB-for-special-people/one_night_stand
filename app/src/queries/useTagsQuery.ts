import {useQuery} from "react-query";
import {API} from "src/constants/api_routes.ts";
import {useAxios} from "src/hooks/useAxios.ts";


export function useTagsQuery() {
    const axios = useAxios()

    return useQuery({
        queryKey: [API.cardTags],
        queryFn: async ({queryKey: [url]}) => {
            const response = await axios.get<string[]>(url)
            return response.data
        },
        enabled: axios !== null
    })
}