// @ts-nocheck
import { useInfiniteQuery } from 'react-query';
import { API } from 'src/constants/api_routes.ts';
import { useAxios } from 'src/hooks/useAxios.ts';
import { Paginated } from 'src/types.ts';

type Image = {
  id: number;
  image: string;
  created_by: number;
  created_at: string;
  is_public: boolean;
}


export function useCardsImagesQuery() {
  const axios = useAxios();

  return useInfiniteQuery<Image[], unknown, Image[], [string]>({
    queryKey: [API.imagesCard],
    queryFn: async ({ queryKey: [url] }) => {
      const response = await axios.get<Paginated<Image[]>>(url);
      return response.data.results;
    },
    enabled: axios !== null,
  });
}
