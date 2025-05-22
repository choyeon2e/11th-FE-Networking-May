import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPlace,
  deletePlace,
  getPlaceList,
  pinPlace,
  unpinPlace,
} from '../apis/fetchLocation';

export const usePlaceList = () => {
  return useQuery({
    queryKey: ['places'],
    queryFn: getPlaceList,
  });
};

export const useCreatePlace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });
};

export const useDeletePlace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePlace,

    onMutate: async (placeId) => {
      await queryClient.cancelQueries({ queryKey: ['places'] });

      const previousPlaces = queryClient.getQueryData(['places']);

      queryClient.setQueryData(['places'], (prev) =>
        prev?.filter((place) => place.placeId !== placeId)
      );

      return { previousPlaces };
    },

    onError: (_err, placeId, context) => {
      if (context?.previousPlaces) {
        queryClient.setQueryData(['places'], context.previousPlaces);
        alert('삭제에 실패했습니다.');
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });
};

export const useTogglePinPlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ placeId, isPinned }) => {
      if (isPinned) {
        await unpinPlace(placeId);
      } else {
        await pinPlace(placeId);
      }
    },
    onMutate: async ({ placeId, isPinned }) => {
      await queryClient.cancelQueries({ queryKey: ['places'] });

      const previousPlaces = queryClient.getQueryData(['places']);

      queryClient.setQueryData(['places'], (prev) =>
        prev?.map((place) =>
          place.placeId === placeId ? { ...place, isPinned: !isPinned } : place
        )
      );

      return { previousPlaces };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousPlaces) {
        queryClient.setQueryData(['places'], context.previousPlaces);
        alert('핀 변경에 실패했습니다.');
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });
};
