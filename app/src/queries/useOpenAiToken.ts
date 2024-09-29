import {useQuery} from "react-query";
import {PrefixedAPI} from "src/constants/api_routes.ts";
import axios from "axios";

export function useOpenAiToken() {
  return useQuery({
    queryKey: [PrefixedAPI.openai],
    queryFn: async ({queryKey: [url]}) => {
      const response = await axios.get<{token: string}>(url)
      return response.data.token
    }
  })
}