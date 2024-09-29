// @ts-nocheck
import { useMutation, useQueryClient } from "react-query";
import { API } from "src/constants/api_routes.ts";
import { useAxios } from "src/hooks/useAxios.ts";
import {Card} from "src/types.ts";


export function useCreateCardMutation() {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation<Card, unknown, Card>(
    async (newChannel: Card) => {
      const response = await axios.post<Card>(API.cardContent);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([API.channels]);
      },
    }
  );
}