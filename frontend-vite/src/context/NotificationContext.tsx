import React, { createContext, useContext, useState, useEffect } from 'react';

export type NotificationType = 'info' | 'success' | 'warning' | 'like' | 'comment' | 'publish';

export interface NotificationItem {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    date: string; // ISO string
    read: boolean;
    link?: string;
    authorId?: string;
}

interface NotificationContextType {
    notifications: NotificationItem[];
    addNotification: (notification: Omit<NotificationItem, 'id' | 'date' | 'read'>) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    clearNotifications: () => void;
    unreadCount: number;
    followedIds: string[];
    toggleFollow: (id: string) => void;
    isFollowing: (id: string) => boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [followedIds, setFollowedIds] = useState<string[]>([]);

    // Load from localStorage
    useEffect(() => {
        const savedNotifications = localStorage.getItem('discoversenegal_notifications');
        const parsedNotifications = savedNotifications ? JSON.parse(savedNotifications) : [];

        if (parsedNotifications.length > 0) {
            setNotifications(parsedNotifications);
        } else {
            // Mock initial notifications if none exist or if empty
            const now = new Date();
            const initial: NotificationItem[] = [
                {
                    id: 'n1',
                    type: 'success',
                    title: 'Bienvenue sur Discover Sénégal',
                    message: 'Votre compte a été créé avec succès. Commencez à explorer les trésors du Sénégal !',
                    date: now.toISOString(),
                    read: false,
                },
                {
                    id: 'n2',
                    type: 'like',
                    title: 'Nouveau J\'aime',
                    message: 'Fatou Diagne a aimé votre publication : "Le coucher de soleil sur l\'Atlantique..."',
                    date: new Date(now.getTime() - 1000 * 60 * 15).toISOString(), // 15 min ago
                    read: false,
                    link: '/echos-senegal?postId=1'
                },
                {
                    id: 'n3',
                    type: 'comment',
                    title: 'Nouveau Commentaire',
                    message: 'Moussa Sarr a commenté votre publication : "Magnifique ! Quel est le prix ?"',
                    date: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
                    read: false,
                    link: '/echos-senegal?postId=1'
                },
                {
                    id: 'n4',
                    type: 'publish',
                    title: 'Nouvelle Publication',
                    message: 'Terrou-Bi Resort vient de publier un nouveau récit : "Nos secrets pour un séjour parfait".',
                    date: new Date(now.getTime() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
                    read: true,
                    link: '/echos-senegal'
                },
                {
                    id: 'n5',
                    type: 'info',
                    title: 'Mise à jour du profil',
                    message: 'Pensez à compléter vos intérêts pour recevoir des recommandations personnalisées.',
                    date: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
                    read: true,
                    link: '/profile'
                }
            ];
            setNotifications(initial);
            localStorage.setItem('discoversenegal_notifications', JSON.stringify(initial));
        }

        const savedFollows = localStorage.getItem('discoversenegal_followed_ids');
        if (savedFollows) {
            setFollowedIds(JSON.parse(savedFollows));
        }
    }, []);

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('discoversenegal_notifications', JSON.stringify(notifications));
    }, [notifications]);

    useEffect(() => {
        localStorage.setItem('discoversenegal_followed_ids', JSON.stringify(followedIds));
    }, [followedIds]);

    const addNotification = (notif: Omit<NotificationItem, 'id' | 'date' | 'read'>) => {
        const newNotif: NotificationItem = {
            ...notif,
            id: Date.now().toString(),
            date: new Date().toISOString(),
            read: false,
        };
        setNotifications(prev => [newNotif, ...prev]);
    };

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const toggleFollow = (id: string) => {
        setFollowedIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(fid => fid !== id);
            }
            return [...prev, id];
        });
    };

    const isFollowing = (id: string) => followedIds.includes(id);

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{
            notifications,
            addNotification,
            markAsRead,
            markAllAsRead,
            clearNotifications,
            unreadCount,
            followedIds,
            toggleFollow,
            isFollowing
        }}>
            {children}
        </NotificationContext.Provider>
    );
};
