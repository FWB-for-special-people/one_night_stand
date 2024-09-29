import {useQuery, useQueryClient} from "react-query";
import {API} from "src/constants/api_routes.ts";
import {useAxios} from "src/hooks/useAxios.ts";
import {User} from "src/types.ts";
import {useDecodedToken} from "src/hooks/useDecodedToken.ts";

export function useUserQuery() {
    const axios = useAxios()
    const tokenData = useDecodedToken()

    return useQuery({
        queryKey: [API.userDetail(tokenData?.user_id || 1)],
        queryFn: async ({queryKey: [url]}) => {
            const response = await axios.get<User>(url)
            return response.data
        },
        enabled: axios !== null || tokenData === null
    })
}

export function useUpdateUserQuery() {
    const queryClient = useQueryClient()
    const tokenData = useDecodedToken()

    return (user: User) => queryClient.setQueryData(
      [API.userDetail(tokenData?.user_id || 1)],
      () => user
    )
}
