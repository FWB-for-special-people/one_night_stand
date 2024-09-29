import {useInfiniteQuery} from "react-query";
import {API} from "src/constants/api_routes.ts";
import {useAxios} from "src/hooks/useAxios.ts";
import {Paginated} from "src/types.ts";
import {Channel} from "src/types";

export function useChannelsQuery() {
    const axios = useAxios()

    return useInfiniteQuery({
        queryKey: [API.channels],
        queryFn: async ({queryKey: [url]}) => {
            const response = await axios.get<Paginated<Channel[]>>(url)
            return response.data
        },
        getNextPageParam: (lastPage) => lastPage.next,
        enabled: axios !== null
    })
}