import { BaseUrlApi } from './axios';

export const createPlace = async (placeData) => {
  try {
    const response = await BaseUrlApi.post('/place', placeData);
    return response.data.result;
  } catch (error) {
    console.error('장소 추가 실패', error.message);
    throw error;
  }
};

export const pinPlace = async (placeId) => {
  try {
    await BaseUrlApi.post(`/place/${placeId}/pin`);
  } catch (error) {
    console.error('핀 등록 실패:', error.message);
    throw error;
  }
};

export const unpinPlace = async (placeId) => {
  try {
    await BaseUrlApi.delete(`/place/${placeId}/pin`);
  } catch (error) {
    console.error('핀 해제 실패:', error.message);
    throw error;
  }
};
export const getPlaceList = async () => {
  try {
    const response = await BaseUrlApi.get('/place/list');
    return response.data.result;
  } catch (error) {
    console.error('위치 목록 조회 실패:', error.message);
    throw error;
  }
};

export const deletePlace = async (placeId) => {
  try {
    await BaseUrlApi.delete(`/place/${placeId}`);
  } catch (error) {
    console.error('위치 삭제 실패', error.message);
    throw error;
  }
};
