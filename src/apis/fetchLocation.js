import { BaseUrlApi } from './axios';

export const createPlace = (placeData) =>
  BaseUrlApi.post('/place', placeData).then((res) => res.data.result);

export const pinPlace = (placeId) => {
  return BaseUrlApi.post(`/place/${placeId}/pin`);
};

export const unpinPlace = (placeId) => {
  return BaseUrlApi.delete(`/place/${placeId}/pin`);
};

export const getPlaceList = () =>
  BaseUrlApi.get('/place/list').then((res) => res.data.result);

export const deletePlace = (placeId) => {
  return BaseUrlApi.delete(`/place/${placeId}`);
};
