import { Post, User } from './types';

export const initialPosts: Post[] = [
  {
    id: 1,
    username: 'admin_user',
    userHandle: '@admin',
    verified: true,
    content: 'Welcome to VeriSocial! This is a concept app demonstrating Aadhaar-based verification. Posts from verified users get a blue checkmark. Try the new Gemini AI features to help you write posts or generate a profile bio!',
    avatar: 'https://picsum.photos/seed/admin/100/100'
  },
  {
    id: 2,
    username: 'unverified_user',
    userHandle: '@guest123',
    verified: false,
    content: 'This is a post from a user who has not completed the verification step. Notice, no checkmark!',
    avatar: 'https://picsum.photos/seed/guest/100/100'
  },
];

export const mockUsers: { [key: string]: User } = {
  'admin_user': {
    username: 'admin_user',
    userHandle: '@admin',
    password: '123',
    verified: true,
    avatar: 'https://picsum.photos/seed/admin/100/100',
    interests: 'AI, social networks, hiking',
  },
  'unverified_user': {
    username: 'unverified_user',
    userHandle: '@guest123',
    password: '123',
    verified: false,
    avatar: 'https://picsum.photos/seed/guest/100/100',
    interests: '',
  }
};