import axios from 'axios';
import { SERVER_URL } from '../constants/serverUrl';

class ArtsDataService {
  postArt(data: JSON) {
    return axios.post(`SERVER_URL/art`, data);
  }

  getAllArts(page: number): any {
    return axios.get(`SERVER_URL/arts`);
  }

  getArtsByTag(tag: string): any {
    return axios.get(`SERVER_URL/arts/${tag}`);
  }

  deleteArt(id: string): any {
    return axios.delete(`SERVER_URL/arts/${id}`);
  }

  likeArt(id: string): any {
    return axios.put(`SERVER_URL/arts/${id}/like`);
  }

  unlikeArt(id: string): any {
    return axios.put(`SERVER_URL/arts/${id}/unlike`);
  }

  myLikes() {
    return axios.get(`SERVER_URL/user/likes`);
  }
}

export default ArtsDataService;
