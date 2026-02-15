import { Post } from '../types/feed';

export const MOCK_POSTS: Post[] = [
    {
        id: '1',
        author: {
            id: 'u1',
            name: 'Terrou-Bi Resort',
            role: 'Hôtel Premium',
            avatar: '/images/nouveau_logo.jpeg',
            type: 'hotel',
            isVerified: true
        },
        content: "Le coucher de soleil sur l'Atlantique n'a jamais été aussi beau. Venez vivre un moment d'exception sur notre terrasse privée. La Teranga n'est pas qu'un mot, c'est une expérience. #Dakar #LuxuryTravel #Senegal",
        images: ['/images/hero_senegal.png'],
        video: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-shore-4113-large.mp4',
        views: 1250,
        likes: 342,
        comments: 24,
        date: 'Il y a 2 heures',
        location: 'Dakar, Sénégal',
        isLiked: true,
        mockComments: [
            { id: 'c1', author: 'Sophie M.', avatar: 'https://i.pravatar.cc/150?u=sophie', text: 'Magnifique vue ! Je recommande vivement.', date: 'Il y a 1h' },
            { id: 'c2', author: 'Jean-Pierre', avatar: 'https://i.pravatar.cc/150?u=jp', text: 'Hâte d\'y retourner le mois prochain.', date: 'Il y a 30 min' },
            { id: 'c10', author: 'Fatou Diagne', avatar: 'https://i.pravatar.cc/150?u=fatou', text: 'Le service est irréprochable là-bas.', date: 'Il y a 15 min' }
        ]
    },
    {
        id: '2',
        author: {
            id: 'u7',
            name: 'Amadou, Guide National',
            role: 'Guide Certifié',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
            type: 'guide',
            isVerified: true
        },
        content: "Aujourd'hui, nous explorons les merveilles de la Casamance. Entre mangroves et traditions ancestrales, chaque pas est un voyage dans le temps. Les cases à impluvium nous racontent le génie de nos ancêtres. #Culture #Adventure #SenegalHeritage",
        images: ['/images/case1.webp', '/images/case2.webp'],
        likes: 156,
        comments: 12,
        date: 'Il y a 5 heures',
        location: 'Ziguinchor, Casamance'
    },
    {
        id: '101',
        author: {
            id: 'u-awa',
            name: 'Awa Cissé',
            role: 'Voyageuse Sénégal',
            avatar: 'https://i.pravatar.cc/150?u=awa',
            type: 'cultural',
            isVerified: true
        },
        content: "Un après-midi magique sur les côtes de Dakar. La Teranga est partout ! 🇸🇳✨ #Senegal #Dakar #Travel",
        images: ['https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-leaves-and-sun-rays-in-autumn-470-large.mp4'],
        video: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-leaves-and-sun-rays-in-autumn-470-large.mp4',
        views: 45200,
        likes: 12400,
        comments: 156,
        date: 'Il y a 2 heures',
        location: 'Dakar, Sénégal'
    },
    {
        id: '102',
        author: {
            id: 'u-moussa',
            name: 'Moussa Sarr',
            role: 'Passionné de Danse',
            avatar: 'https://i.pravatar.cc/150?u=moussa',
            type: 'guide',
            isVerified: false
        },
        content: "L'énergie de la jeunesse dakaroise est inépuisable. On danse même sous la pluie ! 🕺🏾🌧️ #Casamance #Danse #Vibe",
        images: ['https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-the-rain-in-the-city-4299-large.mp4'],
        video: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-the-rain-in-the-city-4299-large.mp4',
        views: 32100,
        likes: 8500,
        comments: 243,
        date: 'Il y a 3 heures',
        location: 'Ziguinchor, Casamance'
    },
    {
        id: '103',
        author: {
            id: 'u-goree',
            name: 'Gorée Culture',
            role: 'Institut Historique',
            avatar: '/images/goree2.webp',
            type: 'cultural',
            isVerified: true
        },
        content: "La paix et le calme sur l'île de Gorée. Un moment hors du temps. 🌊🏠 #Goree #History #Peace",
        images: ['https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-shore-4113-large.mp4'],
        video: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-shore-4113-large.mp4',
        views: 89000,
        likes: 25600,
        comments: 1100,
        date: 'Il y a 5 heures',
        location: 'Île de Gorée'
    }
];
