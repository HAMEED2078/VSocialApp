export interface Post {
  id: number;
  username: string;
  userHandle: string;
  verified: boolean;
  content: string;
  avatar: string;
}

export interface User {
  username: string;
  userHandle: string;
  password?: string; // Note: In a real app, this would be handled securely on the backend.
  verified: boolean;
  avatar: string;
  interests?: string;
}

export enum Page {
  Login = 'login',
  SignUp = 'signup',
  Verify = 'verify',
  Feed = 'feed',
  CreatePost = 'createPost',
  Profile = 'profile',
}