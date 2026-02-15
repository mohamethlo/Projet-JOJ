import React, { createContext, useContext, useState } from 'react';
import { Post } from '../types/feed';
import { MOCK_POSTS } from '../data/mockFeedData';

interface FeedContextType {
    posts: Post[];
    addPost: (post: Post) => void;
    likePost: (postId: string) => void;
    savePost: (postId: string) => void;
    addComment: (postId: string, comment: any) => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const FeedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

    // Sync with localStorage for "isSaved" state if needed, 
    // but for now we'll stick to memory + original MOCK_POSTS logic

    const addPost = (post: Post) => {
        setPosts(prev => [post, ...prev]);
    };

    const likePost = (postId: string) => {
        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                const newLiked = !post.isLiked;
                return {
                    ...post,
                    isLiked: newLiked,
                    likes: newLiked ? (post.likes || 0) + 1 : Math.max(0, (post.likes || 1) - 1)
                };
            }
            return post;
        }));
    };

    const savePost = (postId: string) => {
        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                return { ...post, isSaved: !post.isSaved };
            }
            return post;
        }));
    };

    const addComment = (postId: string, comment: any) => {
        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: (post.comments || 0) + 1,
                    mockComments: [comment, ...(post.mockComments || [])]
                };
            }
            return post;
        }));
    };

    return (
        <FeedContext.Provider value={{ posts, addPost, likePost, savePost, addComment }}>
            {children}
        </FeedContext.Provider>
    );
};

export const useFeed = () => {
    const context = useContext(FeedContext);
    if (context === undefined) {
        throw new Error('useFeed must be used within a FeedProvider');
    }
    return context;
};
