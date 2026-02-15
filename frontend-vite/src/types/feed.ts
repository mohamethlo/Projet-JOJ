export interface Comment {
    id: string;
    author: string;
    avatar: string;
    text: string;
    date: string;
    replies?: Comment[];
}

export interface Post {
    id: string;
    author: {
        id: string;
        name: string;
        role: string;
        avatar: string;
        type: 'hotel' | 'restaurant' | 'guide' | 'cultural';
        isVerified?: boolean;
    };
    content: string;
    images: string[];
    video?: string;
    views?: number;
    likes: number;
    comments: number;
    date: string;
    location?: string;
    isLiked?: boolean;
    isSaved?: boolean;
    mockComments?: Comment[];
}
