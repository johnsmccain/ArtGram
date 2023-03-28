import { Art, Arts } from '../types/art';
import axios from './axios';

export const allArts = async (): Promise<Arts> => {
  const response = await axios.get<Arts>('/arts');
  return response.data;
};

export const postArt = async (
  name: string,
  image: string,
  description: string,
  category: string,
  postedBy: string
): Promise<Art> => {
  const { data } = await axios.post('/art', {
    name,
    image,
    description,
    category,
    postedBy,
  });
  return data;
};

export const myArts = async (): Promise<Arts> => {
  const { data } = await axios.get('/arts/me');
  return data;
};

export const deleteArt = async (id: string): Promise<Art> => {
  const { data } = await axios.delete(`/arts/${id}`);
  return data;
};

export const artsByCategory = async (category: string): Promise<Arts> => {
  const { data } = await axios.get(`/arts/category/${category}`);
  return data;
};

export const likeArt = async (id: string): Promise<Art> => {
  const { data } = await axios.put(`/arts/${id}/like`);
  return data;
};

export const unlikeArt = async (id: string): Promise<Art> => {
  const { data } = await axios.put(`/arts/${id}/unlike`);
  return data;
};

export const commentArt = async (id: string, comment: string): Promise<Art> => {
  const { data } = await axios.post(`/arts/${id}/comment`, { comment });
  return data;
};
