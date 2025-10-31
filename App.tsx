import React, { useState } from 'react';
import { Page, User, Post as PostType } from './types';
import { initialPosts, mockUsers } from './constants';
import AuthForm from './components/AuthForm';
import AadhaarVerification from './components/AadhaarVerification';
import FeedScreen from './components/FeedScreen';
import CreatePost from './components/CreatePost';
import ProfileScreen from './components/ProfileScreen';
import BottomNav from './components/BottomNav';

export default function App() {
  const [page, setPage] = useState<Page>(Page.Login);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [users, setUsers] = useState<{ [key: string]: User }>(mockUsers);
  const [authError, setAuthError] = useState('');

  const handleSignUp = (credentials: { username: string; password: string; handle?: string }) => {
    setAuthError('');
    const { username, password, handle } = credentials;
    if (users[username]) {
      setAuthError('Username already taken.');
    } else if (handle) {
      const newUser: User = {
        username,
        userHandle: handle.startsWith('@') ? handle : `@${handle}`,
        password,
        verified: false,
        avatar: `https://picsum.photos/seed/${username}/100/100`,
        interests: '',
      };
      setUsers(prev => ({ ...prev, [username]: newUser }));
      setCurrentUser(newUser);
      setPage(Page.Verify);
    }
  };

  const handleLogin = (credentials: { username: string; password: string; }) => {
    setAuthError('');
    const { username, password } = credentials;
    const user = users[username];
    if (user && user.password === password) {
      setCurrentUser(user);
      setPage(Page.Feed);
    } else {
      setAuthError('Invalid username or password.');
    }
  };

  const handleVerification = () => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, verified: true };
    setCurrentUser(updatedUser);
    setUsers(prev => ({ ...prev, [currentUser.username]: updatedUser }));
    setPage(Page.Feed);
  };

  const handleCreatePost = (content: string) => {
    if (!currentUser) return;
    const newPost: PostType = {
      id: posts.length + 1,
      username: currentUser.username,
      userHandle: currentUser.userHandle,
      verified: currentUser.verified,
      content: content,
      avatar: currentUser.avatar
    };
    setPosts(prev => [...prev, newPost]);
    setPage(Page.Feed);
  };

  const handleUpdateUser = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);
    setUsers(prev => ({...prev, [currentUser.username]: updatedUser}));
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    setPage(Page.Login);
  };

  const renderPage = () => {
    if (!currentUser) {
      switch (page) {
        case Page.SignUp:
          return (
            <div className="flex flex-col justify-center h-full p-4">
              <AuthForm
                title="Create a New Account"
                buttonText="Sign Up"
                onSubmit={handleSignUp}
                isSignUp={true}
                error={authError}
              />
              <p className="text-center text-sm text-gray-200 mt-4">
                Already have an account?{' '}
                <button onClick={() => { setPage(Page.Login); setAuthError(''); }} className="font-medium text-white hover:underline">
                  Login
                </button>
              </p>
            </div>
          );
        case Page.Login:
        default:
          return (
            <div className="flex flex-col justify-center h-full p-4">
              <AuthForm
                title="Login to Your Account"
                buttonText="Login"
                onSubmit={handleLogin}
                error={authError}
              />
              <p className="text-center text-sm text-gray-200 mt-4">
                Don't have an account?{' '}
                <button onClick={() => { setPage(Page.SignUp); setAuthError(''); }} className="font-medium text-white hover:underline">
                  Sign Up
                </button>
              </p>
            </div>
          );
      }
    }

    // Authenticated Pages
    let content;
    switch (page) {
      case Page.Verify:
        return <AadhaarVerification onVerify={handleVerification} username={currentUser.username} />;
      case Page.CreatePost:
        content = <CreatePost currentUser={currentUser} onPost={handleCreatePost} onCancel={() => setPage(Page.Feed)} />;
        break;
      case Page.Profile:
        content = <ProfileScreen currentUser={currentUser} setPage={setPage} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />;
        break;
      case Page.Feed:
      default:
        content = <FeedScreen posts={posts} />;
    }

    return (
      <div className="flex flex-col h-full">
        <main className="flex-1 overflow-y-auto">
          {content}
        </main>
        {(page === Page.Feed || page === Page.Profile) && (
          <BottomNav activePage={page} setPage={setPage} />
        )}
      </div>
    );
  };

  return (
    <div className="font-sans bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-md mx-auto h-screen bg-white/10 backdrop-blur-sm shadow-2xl flex flex-col relative overflow-hidden">
        {renderPage()}
      </div>
    </div>
  );
}