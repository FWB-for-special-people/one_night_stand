import { useInfiniteQuery } from 'react-query';
import { API } from 'src/constants/api_routes.ts';
import { useAxios } from 'src/hooks/useAxios.ts';
import { Paginated } from 'src/types.ts';

type Card = {
  id: number;
  text: string;
  created_by: number;
  created_at: string;
  tags: string[];
  like_count: number;
  view_count: number;
  channels: number[];
}

export function useCardsQuery() {
  const axios = useAxios();

  return useInfiniteQuery<Card[], unknown, Card[], [string]>({
    queryKey: [API.cards],
    queryFn: async ({ queryKey: [url] }) => {
      const response = await axios.get<Paginated<Card[]>>(url);
      return response.data.results;
    },
    enabled: axios !== null,
  });
}