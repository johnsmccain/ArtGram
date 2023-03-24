import axios from 'axios';
import { Art } from '../types/art';

export const allArts = async (): Promise<Art> => {
  const response = await axios.get<Art>('/arts', {
    withCredentials: true,
  });
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
