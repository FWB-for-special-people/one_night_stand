import {useQuery} from "react-query";
import {API} from "src/constants/api_routes.ts";
import {useAxios} from "src/hooks/useAxios.ts";
import {User} from "src/types.ts";
import {useDecodedToken} from "src/hooks/useDecodedToken.ts";

export function useUserFollowers() {
    const axios = useAxios()
    const tokenData = useDecodedToken()

    return useQuery({
        queryKey: [API.userFollowers(tokenData!.user_id)],
        queryFn: async ({queryKey: [url]}) => {
            const response = await axios.get<User[]>(url)
            return response.data
        },
        enabled: axios !== null || tokenData === null
    })
}