export interface User {
  id?: string;
  name: string;
  email: string;
  profileImage?: string;
  followers?: Array<string>;
  following?: Array<string>;
}
