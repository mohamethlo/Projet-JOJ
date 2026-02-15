import React, { useState } from 'react';
import VerticalVideoItem from '@/components/videos/VerticalVideoItem';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useFeed } from '@/context/FeedContext';

const VideoFeedPage: React.FC = () => {
    const { posts } = useFeed();
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);

    // Dynamically filter all posts that have a video
    const MOCK_VIDEOS = posts.filter(post => post.video).map(post => ({
        id: post.id,
        url: post.video!,
        author: {
            id: post.author.id,
            name: post.author.name,
            avatar: post.author.avatar,
            isVerified: !!post.author.isVerified
        },
        description: post.content,
        location: post.location,
        likes: post.likes || 0,
        comments: post.comments || 0,
        shares: 0,
        isLiked: !!post.isLiked,
        isSaved: !!post.isSaved,
        mockComments: post.mockComments
    }));

    // Track active video on scroll
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollTop = e.currentTarget.scrollTop;
        const windowHeight = window.innerHeight;
        const newIndex = Math.round(scrollTop / windowHeight);
        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    };

    return (
        <div className="fixed inset-0 bg-neutral-950 z-[60] flex flex-col items-center">
            {/* Visual background for desktop (optional but looks premium) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none hidden md:block">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#F2A90011,transparent_70%)]" />
            </div>

            {/* Main Video Section Container */}
            <div className="relative w-full h-full max-w-[450px] mx-auto bg-black shadow-[0_0_100px_rgba(0,0,0,0.8)] md:border-x md:border-white/5">
                {/* Top Navigation Overlay - Now inside the constrained container */}
                <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-[70] bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white pointer-events-auto hover:bg-black/40 transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex items-center gap-6 pointer-events-auto">
                        <button className="text-white/60 font-black text-xs uppercase tracking-widest hover:text-white transition-colors">Suivis</button>
                        <button className="text-white font-black text-xs uppercase tracking-widest border-b-2 border-[#F2A900] pb-1">Pour vous</button>
                    </div>
                    <div className="w-10 h-10" /> {/* Spacer */}
                </div>

                {/* Vertical Video Container */}
                <div
                    className="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth"
                    onScroll={handleScroll}
                >
                    {MOCK_VIDEOS.map((video, index) => (
                        <VerticalVideoItem
                            key={video.id}
                            video={video}
                            isActive={index === activeIndex}
                        />
                    ))}
                </div>
            </div>

            {/* Mobile Footer Spacing (if needed for nav bar) */}
            <div className="h-0 sm:h-0" />
        </div>
    );
};

export default VideoFeedPage;
