import {useInfiniteQuery} from "react-query";
import {API} from "src/constants/api_routes.ts";
import {useAxios} from "src/hooks/useAxios.ts";
import {Paginated, User} from "src/types.ts";

type Comment = {
    id: number;
    text: string;
    created_by: User,
    created_at: string;
}

export function useCardCommentsQuery(cardId: number) {
    const axios = useAxios()

    return useInfiniteQuery({
        queryKey: [API.cardComments(cardId)],
        queryFn: async ({queryKey: [url]}) => {
            const response = await axios.get<Paginated<Comment[]>>(url)
            return response.data
        },
        getNextPageParam: (lastPage) => lastPage.next,
        enabled: axios !== null
    })
}