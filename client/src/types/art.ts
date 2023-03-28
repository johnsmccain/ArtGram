export interface Art {
  id?: string;
  name: string;
  image: string;
  description: string;
  category: string;
  postedBy: string;
  likes: Array<string>;
  comments: Array<string>;
}

export interface Arts {
  arts: Array<Art>;
}
