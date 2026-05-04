// Mock data pour les guides
export const mockGuides = [
  {
    id: '1',
    name: 'Amadou Diallo',
    avatar: '/images/guide 1.jpeg',
    languages: ['Français', 'Anglais', 'Wolof'],
    specialties: ['Histoire', 'Culture', 'Gastronomie'],
    rating: 4.9,
    reviews: 127,
    price: '25,000 FCFA',
    location: 'Dakar',
    isVerified: true,
    availability: 'Disponible',
    description: 'Guide expérimenté spécialisé dans l\'histoire et la culture du Sénégal. Passionné par le partage de connaissances.',
    experience: '8 ans',
    toursCompleted: 245,
    responseTime: '2h',
    badge: 'Guide Premium',
    featured: true,
    type: 'Certifiés'
  },
  {
    id: '2',
    name: 'Fatou Sarr',
    avatar: '/images/guide 2.jpeg',
    languages: ['Français', 'Anglais', 'Sérère'],
    specialties: ['Nature', 'Écologie', 'Randonnée'],
    rating: 4.8,
    reviews: 89,
    price: '22,000 FCFA',
    location: 'Saint-Louis',
    isVerified: true,
    availability: 'Disponible',
    description: 'Guide nature passionnée par l\'écologie et les randonnées dans les parcs nationaux du Sénégal.',
    experience: '5 ans',
    toursCompleted: 156,
    responseTime: '1h',
    badge: 'Guide Certifié',
    featured: false,
    type: 'Diplômés'
  },
  {
    id: '3',
    name: 'Moussa Ba',
    avatar: '/images/guide 3.jpeg',
    languages: ['Français', 'Wolof', 'Pulaar'],
    specialties: ['Artisanat', 'Traditions', 'Musique'],
    rating: 4.7,
    reviews: 67,
    price: '20,000 FCFA',
    location: 'Thiès',
    isVerified: true,
    availability: 'Disponible',
    description: 'Guide local expert en artisanat traditionnel et musique sénégalaise. Connaît parfaitement les traditions.',
    experience: '6 ans',
    toursCompleted: 134,
    responseTime: '3h',
    badge: 'Guide Local',
    featured: false,
    type: 'Local'
  },
  {
    id: '4',
    name: 'Aïcha Diop',
    avatar: '/images/guide 4.jpeg',
    languages: ['Français', 'Anglais', 'Espagnol'],
    specialties: ['Architecture', 'Art', 'Photographie'],
    rating: 4.9,
    reviews: 98,
    price: '28,000 FCFA',
    location: 'Dakar',
    isVerified: true,
    availability: 'Disponible',
    description: 'Guide spécialisée en architecture coloniale et art contemporain. Parfaite pour les amateurs d\'art.',
    experience: '7 ans',
    toursCompleted: 189,
    responseTime: '1h',
    badge: 'Guide Premium',
    featured: true,
    type: 'Formations professionnelles'
  },
  {
    id: '5',
    name: 'Ibrahima Ndiaye',
    avatar: '/images/guide 6.jpeg',
    languages: ['Français', 'Anglais', 'Wolof'],
    specialties: ['Sport', 'Aventure', 'Plage'],
    rating: 4.6,
    reviews: 45,
    price: '18,000 FCFA',
    location: 'Saly',
    isVerified: true,
    availability: 'Disponible',
    description: 'Guide sportif spécialisé dans les activités nautiques et les aventures en bord de mer.',
    experience: '4 ans',
    toursCompleted: 78,
    responseTime: '2h',
    badge: 'Guide Sportif',
    featured: false,
    type: 'Certifiés'
  },
  {
    id: '6',
    name: 'Mariama Fall',
    avatar: '/images/guide 6.jpeg',
    languages: ['Français', 'Anglais', 'Wolof'],
    specialties: ['Religion', 'Spiritualité', 'Pèlerinage'],
    rating: 4.8,
    reviews: 56,
    price: '24,000 FCFA',
    location: 'Touba',
    isVerified: true,
    availability: 'Disponible',
    description: 'Guide spirituel spécialisé dans les pèlerinages et l\'histoire religieuse du Sénégal.',
    experience: '9 ans',
    toursCompleted: 167,
    responseTime: '1h',
    badge: 'Guide Spirituel',
    featured: false,
    type: 'Diplômés'
  }
];

// Mock data pour les événements
export const mockEvents = [
  // ÉVÉNEMENTS SPORTIFS
  {
    id: '1',
    title: 'Match de Football: Sénégal vs Maroc',
    description: 'Match amical entre les Lions de la Téranga et les Lions de l\'Atlas',
    date: '2024-04-25',
    time: '18:00',
    location: 'Stade Léopold Sédar Senghor',
    category: 'Football',
    price: '25,000 FCFA',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'Fédération Sénégalaise de Football',
    capacity: 60000,
    registered: 45000,
    type: 'sport',
    isLive: true,
    liveData: {
      score: '2-1',
      minute: '67',
      status: 'En cours',
      homeTeam: 'Sénégal',
      awayTeam: 'Maroc',
      homeScore: 2,
      awayScore: 1,
      events: [
        { minute: '23', type: 'goal', team: 'home', player: 'Sadio Mané' },
        { minute: '45', type: 'goal', team: 'away', player: 'Hakim Ziyech' },
        { minute: '67', type: 'goal', team: 'home', player: 'Ismaila Sarr' }
      ]
    }
  },
  {
    id: '2',
    title: 'Tournoi de Lutte Traditionnelle',
    description: 'Grand tournoi de lutte sénégalaise avec les meilleurs lutteurs du pays',
    date: '2024-04-28',
    time: '16:00',
    location: 'Arena de Lutte de Dakar',
    category: 'Lutte',
    price: '10,000 FCFA',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'Fédération Sénégalaise de Lutte',
    capacity: 15000,
    registered: 12000,
    type: 'sport',
    isLive: false
  },
  {
    id: '3',
    title: 'Championnat de Basketball',
    description: 'Finale du championnat national de basketball',
    date: '2024-05-05',
    time: '20:30',
    location: 'Palais des Sports de Dakar',
    category: 'Basketball',
    price: '12,000 FCFA',
    image: 'https://images.pexels.com/photos/1190296/pexels-photo-1190296.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'Fédération Sénégalaise de Basketball',
    capacity: 5000,
    registered: 4200,
    type: 'sport',
    isLive: false
  },
  {
    id: '4',
    title: 'Marathon International de Dakar',
    description: 'Course à pied de 42km à travers les rues de Dakar',
    date: '2024-05-12',
    time: '06:00',
    location: 'Place de l\'Indépendance',
    category: 'Athlétisme',
    price: '15,000 FCFA',
    image: 'https://images.pexels.com/photos/1190295/pexels-photo-1190295.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'Fédération Sénégalaise d\'Athlétisme',
    capacity: 3000,
    registered: 2100,
    type: 'sport',
    isLive: false
  },
  {
    id: '5',
    title: 'Tournoi de Tennis de Saly',
    description: 'Compétition de tennis sur les courts de Saly',
    date: '2024-05-18',
    time: '14:00',
    location: 'Club de Tennis de Saly',
    category: 'Tennis',
    price: '8,000 FCFA',
    image: 'https://images.pexels.com/photos/1190294/pexels-photo-1190294.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'Club de Tennis de Saly',
    capacity: 500,
    registered: 320,
    type: 'sport',
    isLive: false
  },
  {
    id: '6',
    title: 'Championnat de Natation',
    description: 'Compétition de natation en piscine olympique',
    date: '2024-05-25',
    time: '09:00',
    location: 'Piscine Olympique de Dakar',
    category: 'Natation',
    price: '6,000 FCFA',
    image: 'https://images.pexels.com/photos/1190293/pexels-photo-1190293.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'Fédération Sénégalaise de Natation',
    capacity: 800,
    registered: 450,
    type: 'sport',
    isLive: false
  },

  // ÉVÉNEMENTS CULTURELS ET AUTRES
  {
    id: '7',
    title: 'Festival de Jazz de Saint-Louis',
    description: 'Découvrez la musique jazz dans la ville historique de Saint-Louis',
    date: '2024-04-15',
    time: '20:00',
    location: 'Saint-Louis',
    category: 'Musique',
    price: '15,000 FCFA',
    image: 'https://images.pexels.com/photos/1190292/pexels-photo-1190292.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'Association Jazz Saint-Louis',
    capacity: 500,
    registered: 320,
    type: 'other',
    isLive: false
  },
  {
    id: '8',
    title: 'Foire Internationale de Dakar',
    description: 'Exposition des produits locaux et internationaux',
    date: '2024-04-20',
    time: '09:00',
    location: 'Dakar',
    category: 'Culture',
    price: '5,000 FCFA',
    image: 'https://images.pexels.com/photos/1190291/pexels-photo-1190291.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'CCI Dakar',
    capacity: 1000,
    registered: 750,
    type: 'other',
    isLive: false
  },
  {
    id: '9',
    title: 'Semaine Culturelle de Thiès',
    description: 'Festival culturel avec musique, danse et artisanat traditionnel',
    date: '2024-05-01',
    time: '19:00',
    location: 'Thiès',
    category: 'Culture',
    price: '8,000 FCFA',
    image: 'https://images.pexels.com/photos/1190290/pexels-photo-1190290.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'Mairie de Thiès',
    capacity: 2000,
    registered: 1500,
    type: 'other',
    isLive: false
  },
  {
    id: '10',
    title: 'Festival de Gastronomie Sénégalaise',
    description: 'Découvrez les saveurs authentiques du Sénégal',
    date: '2024-05-08',
    time: '12:00',
    location: 'Dakar',
    category: 'Gastronomie',
    price: '12,000 FCFA',
    image: 'https://images.pexels.com/photos/1190289/pexels-photo-1190289.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'Association des Restaurateurs',
    capacity: 800,
    registered: 520,
    type: 'other',
    isLive: false
  },
  {
    id: '11',
    title: 'Exposition d\'Art Contemporain',
    description: 'Exposition d\'œuvres d\'artistes sénégalais contemporains',
    date: '2024-05-15',
    time: '10:00',
    location: 'Musée des Civilisations Noires',
    category: 'Art',
    price: '3,000 FCFA',
    image: 'https://images.pexels.com/photos/1190288/pexels-photo-1190288.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'Musée des Civilisations Noires',
    capacity: 300,
    registered: 180,
    type: 'other',
    isLive: false
  },
  {
    id: '12',
    title: 'Conférence sur l\'Entrepreneuriat',
    description: 'Formation et conférence sur l\'entrepreneuriat au Sénégal',
    date: '2024-05-22',
    time: '14:00',
    location: 'CCI Dakar',
    category: 'Formation',
    price: 'Gratuit',
    image: 'https://images.pexels.com/photos/1190287/pexels-photo-1190287.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'CCI Dakar',
    capacity: 200,
    registered: 150,
    type: 'other',
    isLive: false
  },
  {
    id: '13',
    title: 'Festival de Danse Traditionnelle',
    description: 'Spectacle de danses traditionnelles du Sénégal',
    date: '2024-05-30',
    time: '20:30',
    location: 'Théâtre National Daniel Sorano',
    category: 'Culture',
    price: '10,000 FCFA',
    image: 'https://images.pexels.com/photos/1190286/pexels-photo-1190286.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'Théâtre National',
    capacity: 600,
    registered: 420,
    type: 'other',
    isLive: false
  },
  {
    id: '14',
    title: 'Tournoi de Pétanque',
    description: 'Compétition de pétanque entre équipes locales',
    date: '2024-06-02',
    time: '15:00',
    location: 'Place de la République',
    category: 'Sport',
    price: '5,000 FCFA',
    image: 'https://images.pexels.com/photos/1190285/pexels-photo-1190285.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'Fédération Sénégalaise de Pétanque',
    capacity: 100,
    registered: 80,
    type: 'sport',
    isLive: false
  },
  {
    id: '15',
    title: 'Festival de Mode Africaine',
    description: 'Défilé de mode mettant en valeur les créateurs africains',
    date: '2024-06-08',
    time: '19:00',
    location: 'Hôtel Terrou-Bi',
    category: 'Mode',
    price: '20,000 FCFA',
    image: 'https://images.pexels.com/photos/1190284/pexels-photo-1190284.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'Association des Créateurs de Mode',
    capacity: 400,
    registered: 280,
    type: 'other',
    isLive: false
  },
  {
    id: '16',
    title: 'Championnat de Volleyball',
    description: 'Finale du championnat national de volleyball',
    date: '2024-06-15',
    time: '18:00',
    location: 'Palais des Sports de Dakar',
    category: 'Volleyball',
    price: '8,000 FCFA',
    image: 'https://images.pexels.com/photos/1190283/pexels-photo-1190283.jpeg?auto=compress&cs=tinysrgb&w=400',
    organizer: 'Fédération Sénégalaise de Volleyball',
    capacity: 3000,
    registered: 2100,
    type: 'sport',
    isLive: false
  }
];

// Mock data pour les hébergements
export const mockAccommodations = [
  {
    id: '1',
    name: 'Hôtel Terrou-Bi',
    description: 'Hôtel de luxe en bord de mer avec vue panoramique sur l\'océan Atlantique',
    type: 'Hôtel',
    location: 'Dakar',
    rating: 4.8,
    reviews: 245,
    price: '85,000 FCFA',
    image: '/images/hotel1.jpeg',
    amenities: ['WiFi', 'Piscine', 'Parking', 'Restaurant', 'Spa', 'Gym', 'Climatisation'],
    featured: true,
    availability: 'Disponible',
    capacity: 200,
    checkIn: '15:00',
    checkOut: '12:00',
    rooms: [
      {
        id: '101',
        name: 'Chambre Deluxe Océan',
        type: 'Double',
        price: '85,000 FCFA',
        capacity: 2,
        amenities: ['WiFi', 'TV', 'Climatisation', 'Mini-bar', 'Vue Mer'],
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
        images: [
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
          'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
        ],
        description: 'Une chambre élégante offrant une vue imprenable sur l\'océan Atlantique. Équipée de tout le confort moderne pour un séjour inoubliable.'
      },
      {
        id: '102',
        name: 'Suite Familiale Horizon',
        type: 'Suite',
        price: '125,000 FCFA',
        capacity: 4,
        amenities: ['WiFi', 'TV', 'Climatisation', 'Espace Salon', 'Balcon'],
        image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800',
        images: [
          'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800',
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'
        ],
        description: 'Espace généreux idéal pour les familles, avec un salon séparé et un grand balcon dominant l\'horizon.'
      }
    ]
  },
  {
    id: '2',
    name: 'Restaurant Le Ngor',
    description: 'Restaurant gastronomique spécialisé dans la cuisine sénégalaise traditionnelle',
    type: 'Restaurant',
    location: 'Dakar',
    rating: 4.6,
    reviews: 189,
    price: '12,000 FCFA',
    image: '/images/hotel 2.webp',
    amenities: ['WiFi', 'Parking', 'Terrasse', 'Climatisation'],
    featured: false,
    availability: 'Ouvert',
    capacity: 80
  },
  {
    id: '3',
    name: 'Auberge de la Langue de Barbarie',
    description: 'Auberge écologique au cœur de la réserve naturelle de Saint-Louis',
    type: 'Auberge',
    location: 'Saint-Louis',
    rating: 4.7,
    reviews: 156,
    price: '25,000 FCFA',
    image: '/images/hotel 3.jpeg',
    amenities: ['WiFi', 'Parking', 'Restaurant', 'Climatisation'],
    featured: true,
    availability: 'Disponible',
    capacity: 50,
    checkIn: '14:00',
    checkOut: '11:00',
    rooms: [
      {
        id: '301',
        name: 'Chambre Éco-Brousse',
        type: 'Simple',
        price: '25,000 FCFA',
        capacity: 1,
        amenities: ['Ventilateur', 'Moustiquaire', 'Petit-déjeuner inclus'],
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
        images: [
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'
        ],
        description: 'Une expérience authentique au plus près de la nature, avec tout le nécessaire pour un repos paisible.'
      },
      {
        id: '302',
        name: 'Case Familiale Traditionnelle',
        type: 'Triple',
        price: '45,000 FCFA',
        capacity: 3,
        amenities: ['Terrasse', 'Moustiquaire', 'Vue Réserve'],
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        images: [
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'
        ],
        description: 'Idéal pour les petits groupes ou familles souhaitant partager une expérience unique en brousse.'
      }
    ]
  },
  {
    id: '4',
    name: 'Villa Saly Beach',
    description: 'Villa privée avec accès direct à la plage de Saly. Parfait pour des vacances en famille ou entre amis, offrant luxe et intimité.',
    type: 'Villa',
    location: 'Saly',
    rating: 4.9,
    reviews: 98,
    price: '120,000 FCFA',
    image: '/images/hotel 4.jpeg',
    amenities: ['WiFi', 'Piscine', 'Parking', 'Cuisine', 'Climatisation', 'Plage privée', 'Personnel de maison'],
    featured: true,
    availability: 'Disponible',
    capacity: 8,
    checkIn: '16:00',
    checkOut: '10:00',
    host: {
      id: 'h-1',
      name: 'Moussa Diop',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'Superhost',
      propertyCount: 5,
      rating: 4.9
    },
    rooms: [
      {
        id: '401',
        name: 'Villa Entière (4 Chambres)',
        type: 'Villa',
        price: '120,000 FCFA',
        capacity: 8,
        amenities: ['Piscine Privée', 'Cuisine équipée', 'Personnel de maison', 'WiFi'],
        image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
        images: [
          'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
        ],
        description: 'Vivez l\'exclusivité dans cette villa somptueuse avec piscine privée et service personnalisé.'
      }
    ]
  },
  {
    id: '5',
    name: 'Résidence Les Almadies',
    description: 'Résidence moderne avec appartements meublés en centre-ville. Idéal pour les séjours d\'affaires ou de loisirs.',
    type: 'Résidence',
    location: 'Dakar',
    rating: 4.4,
    reviews: 203,
    price: '45,000 FCFA',
    image: '/images/hotel 5.jpeg',
    amenities: ['WiFi', 'Parking', 'Cuisine', 'Climatisation', 'Gym', 'Sécurité 24/7'],
    featured: false,
    availability: 'Disponible',
    capacity: 100,
    checkIn: '15:00',
    checkOut: '12:00',
    host: {
      id: 'h-1',
      name: 'Moussa Diop',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'Superhost',
      propertyCount: 5,
      rating: 4.9
    },
    rooms: [
      {
        id: '501',
        name: 'Studio Meublé Moderne',
        type: 'Studio',
        price: '45,000 FCFA',
        capacity: 2,
        amenities: ['WiFi', 'Kitchenette', 'Canapé-lit'],
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
        images: [
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'
        ],
        description: 'Studio compact et moderne, parfaitement équipé pour les séjours professionnels ou en solo.'
      },
      {
        id: '502',
        name: 'Appartement T2 Premium',
        type: 'Appartement',
        price: '75,000 FCFA',
        capacity: 3,
        amenities: ['Salon séparé', 'Balcon', 'Lave-linge'],
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
        images: [
          'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'
        ],
        description: 'Appartement spacieux avec balcon, idéal pour les longs séjours offrant confort et autonomie.'
      }
    ]
  },
  {
    id: '6',
    name: 'Restaurant Chez Loutcha',
    description: 'Restaurant traditionnel spécialisé dans le thiéboudiène et les plats locaux',
    type: 'Restaurant',
    location: 'Thiès',
    rating: 4.5,
    reviews: 134,
    price: '8,000 FCFA',
    image: '/images/hotel 5.jpeg',
    amenities: ['WiFi', 'Parking', 'Terrasse'],
    featured: false,
    availability: 'Ouvert',
    capacity: 60
  }
];

// Mock data pour les articles
export const mockArticles = [
  {
    id: '1',
    title: 'L\'Histoire de Gorée : Porte de l\'Esclavage',
    excerpt: 'Découvrez l\'histoire tragique et l\'importance de l\'île de Gorée dans la traite des esclaves.',
    content: 'Contenu complet sur Gorée...',
    image: '/images/esclaveGoree1.webp',
    author: 'Dr. Fatou Sarr',
    date: '2024-03-10',
    category: 'Histoire',
    readTime: '12 min'
  },
  {
    id: '2',
    title: 'La Gastronomie Sénégalaise : Un Voyage Culinaire',
    excerpt: 'Explorez les saveurs authentiques du Sénégal, du thiéboudiène aux yassa.',
    content: 'Contenu sur la gastronomie...',
    image: '/images/thieboudienne.png',
    author: 'Chef Moussa Ba',
    date: '2024-03-08',
    category: 'Culture',
    readTime: '8 min'
  },
  {
    id: '3',
    title: 'Architecture Coloniale de Saint-Louis',
    excerpt: 'Explorez l\'héritage architectural de Saint-Louis, ancienne capitale de l\'AOF.',
    content: 'Contenu complet sur l\'architecture...',
    image: '/images/goree2.webp',
    author: 'Marie Sané',
    date: '2024-03-05',
    category: 'Patrimoine',
    readTime: '10 min'
  },
  {
    id: '4',
    title: 'Les Griots : Gardiens de la Mémoire',
    excerpt: 'Découvrez le rôle essentiel des griots dans la préservation de l\'histoire orale.',
    content: 'Contenu sur les griots...',
    image: '/images/hospitalite2.webp',
    author: 'Ousmane Ba',
    date: '2024-02-28',
    category: 'Traditions',
    readTime: '15 min'
  },
  {
    id: '5',
    title: 'Artisanat Sénégalais : Entre Tradition et Modernité',
    excerpt: 'L\'évolution de l\'artisanat sénégalais et son importance dans l\'économie locale.',
    content: 'Contenu sur l\'artisanat...',
    image: '/images/artisanat1.jpeg',
    author: 'Khady Fall',
    date: '2024-02-20',
    category: 'Art',
    readTime: '12 min'
  },
  {
    id: '6',
    title: 'Les Royaumes du Sénégal Précolonial',
    excerpt: 'Plongez dans l\'histoire des grands royaumes qui ont façonné le Sénégal.',
    content: 'Contenu sur les royaumes...',
    image: '/images/case1.webp',
    author: 'Dr. Amadou Cissé',
    date: '2024-02-15',
    category: 'Histoire',
    readTime: '18 min'
  }
];

// Mock data pour les lieux
export const mockPlaces = [
  {
    id: '1',
    name: 'Restaurant Le Ngor',
    type: 'restaurant',
    rating: 4.6,
    address: 'N\'Gor, Dakar',
    coordinates: { lat: 14.7525, lng: -17.5163 },
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Cuisine française avec vue sur l\'océan',
    phone: '+221 33 820 1234',
    hours: '12:00 - 23:00',
    price: '€€€'
  },
  {
    id: '2',
    name: 'Hôtel Terrou-Bi',
    type: 'hotel',
    rating: 4.8,
    address: 'Almadies, Dakar',
    coordinates: { lat: 14.7392, lng: -17.5069 },
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Hôtel de luxe face à la mer',
    phone: '+221 33 820 5678',
    hours: '24/7',
    price: '€€€€'
  },
  {
    id: '3',
    name: 'Monument de la Renaissance',
    type: 'monument',
    rating: 4.3,
    address: 'Ouakam, Dakar',
    coordinates: { lat: 14.7158, lng: -17.4933 },
    image: 'https://images.pexels.com/photos/8552976/pexels-photo-8552976.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Monument emblématique de 49 mètres de hauteur',
    phone: '+221 33 820 9012',
    hours: '09:00 - 18:00',
    price: '€€'
  },
  {
    id: '4',
    name: 'Île de Gorée',
    type: 'monument',
    rating: 4.9,
    address: 'Île de Gorée',
    coordinates: { lat: 14.6681, lng: -17.4025 },
    image: 'https://images.pexels.com/photos/8828593/pexels-photo-8828593.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Site historique classé au patrimoine mondial',
    phone: '+221 33 820 3456',
    hours: '08:00 - 19:00',
    price: '€€'
  },
  {
    id: '5',
    name: 'Restaurant Le Lagon',
    type: 'restaurant',
    rating: 4.6,
    address: 'N\'Gor, Dakar',
    coordinates: { lat: 14.7525, lng: -17.5163 },
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Cuisine française avec vue sur l\'océan',
    phone: '+221 33 820 7890',
    hours: '12:00 - 23:00',
    price: '€€€'
  },
  {
    id: '6',
    name: 'Hôtel des Almadies',
    type: 'hotel',
    rating: 4.4,
    address: 'Almadies, Dakar',
    coordinates: { lat: 14.7392, lng: -17.5069 },
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Hôtel de luxe face à la mer',
    phone: '+221 33 820 1357',
    hours: '24/7',
    price: '€€€€'
  }
];

// Mock data pour les jumelages
export const mockMatches = [
  {
    id: '1',
    local: {
      name: 'Aïcha Diop',
      location: 'Dakar',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    compatibility: 95,
    reason: 'Vous partagez les mêmes intérêts pour la culture et l\'histoire du Sénégal',
  }
];

// Mock data pour les agences de voyage
export const mockAgencies = [
  {
    id: 'agency-1',
    name: 'Sénégal Découvertes',
    description: 'Agence leader dans l\'organisation de circuits touristiques authentiques à travers le Sénégal.',
    type: 'Agency',
    location: 'Dakar',
    rating: 4.9,
    reviews: 342,
    price: 'À partir de 150,000 FCFA',
    image: '/images/teranga_welcome.png',
    amenities: ['Circuits Sur-Mesure', 'Guides Multilingues', 'Transport Climatisé', 'Assurance Voyage'],
    featured: true,
    availability: 'Ouvert',
    capacity: 0,
    offers: [
      {
        id: 'o1',
        title: 'Circuit Casamance Authenthique',
        duration: '7 Jours / 6 Nuits',
        price: '350,000 FCFA',
        capacity: 10,
        amenities: ['Vols Inclus', 'Hébergement 4*', 'Demi-pension', 'Excursions en pirogue'],
        image: '/images/hospitalite 1.webp',
        images: [
          '/images/hospitalite 1.webp',
        ],
        description: 'Découvrez la beauté verdoyante de la Casamance, ses bolongs, ses villages traditionnels et sa culture riche.'
      },
      {
        id: 'o2',
        title: 'Safari Réserve de Bandia',
        duration: '1 Journée',
        price: '45,000 FCFA',
        capacity: 15,
        amenities: ['Transport 4x4', 'Guide Animalier', 'Déjeuner Inclus'],
        image: '/images/case1.webp',
        images: [
          '/images/case1.webp',
        ],
        description: 'Une journée inoubliable au cœur d\'une réserve naturelle avec girafes, rhinocéros, zèbres et singes.'
      }
    ]
  },
  {
    id: 'agency-2',
    name: 'Teranga Voyages',
    description: 'Spécialiste de l\'éco-tourisme et des séjours de déconnexion dans les régions reculées.',
    type: 'Agency',
    location: 'Saint-Louis',
    rating: 4.7,
    reviews: 189,
    price: 'À partir de 75,000 FCFA',
    image: '/images/hospitalite2.webp',
    amenities: ['Éco-Tourism', 'Séjours Immersion', 'Ateliers Locaux'],
    featured: false,
    availability: 'Ouvert',
    capacity: 0,
    offers: [
      {
        id: 'o3',
        title: 'Immersion Siné-Saloum',
        duration: '3 Jours / 2 Nuits',
        price: '120,000 FCFA',
        capacity: 8,
        amenities: ['Campement Écolo', 'Pêche Artisanale', 'Rencontre avec les villageois'],
        image: '/images/case2.webp',
        images: [
          '/images/case2.webp',
        ],
        description: 'Déconnectez totalement dans le delta du Siné-Saloum au sein de cases écologiques.'
      }
    ]
  }
];

// Mock data pour les artisans
export const mockArtisans = [
  {
    id: '1',
    name: 'Moussa Diouf',
    specialty: 'Sculpture sur bois',
    category: 'Sculpture',
    location: 'Saly Portudal',
    city: 'Saly',
    rating: 4.8,
    products: 12,
    priceRange: 'Standard',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
    description: 'Artisan sculpteur passionné par les traditions sénégalais avec plus de 20 ans d\'expérience.',
    productList: [
      { id: 1, name: "Statue Baobab", price: "35,000 FCFA", image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 2, name: "Masque Diola", price: "25,000 FCFA", image: "https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 3, name: "Tabouret Royal", price: "75,000 FCFA", image: "https://images.pexels.com/photos/1452129/pexels-photo-1452129.jpeg?auto=compress&cs=tinysrgb&w=400" }
    ]
  },
  {
    id: '2',
    name: 'Fatou Ndiaye',
    specialty: 'Couture & Tissage',
    category: 'Textile',
    location: 'Dakar, Village Artisanal',
    city: 'Dakar',
    rating: 4.9,
    products: 45,
    priceRange: 'Premium',
    image: 'https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?auto=compress&cs=tinysrgb&w=150',
    description: 'Créatrice de vêtements en tissus traditionnels revisités pour un style contemporain.',
    productList: [
      { id: 1, name: "Robe Bogolan", price: "45,000 FCFA", image: "https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 2, name: "Écharpe Soie", price: "15,000 FCFA", image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 3, name: "Ensemble Wax", price: "55,000 FCFA", image: "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=400" }
    ]
  },
  {
    id: '3',
    name: 'Abdou Gueye',
    specialty: 'Poterie & Céramique',
    category: 'Artisanat traditionnel',
    location: 'Kolda',
    city: 'Kolda',
    rating: 4.7,
    products: 28,
    priceRange: 'Économique',
    image: 'https://images.pexels.com/photos/1452129/pexels-photo-1452129.jpeg?auto=compress&cs=tinysrgb&w=150',
    description: 'Céramiste utilisant des techniques ancestrales transmises de génération en génération.',
    productList: [
      { id: 1, name: "Vase Kolda", price: "8,500 FCFA", image: "https://images.pexels.com/photos/1452129/pexels-photo-1452129.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 2, name: "Jarres Eau", price: "12,000 FCFA", image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400" }
    ]
  },
  {
    id: '4',
    name: 'Awa Sow',
    specialty: 'Bijoux en argent',
    category: 'Bijoux',
    location: 'Saint-Louis',
    city: 'Saint-Louis',
    rating: 5.0,
    products: 15,
    priceRange: 'Luxe',
    image: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=150',
    description: 'Joaillière renommée pour son travail délicat de l\'argent et du filigrane.',
    productList: [
      { id: 1, name: "Collier Filigrane", price: "120,000 FCFA", image: "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: 2, name: "Bague Argent", price: "45,000 FCFA", image: "https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?auto=compress&cs=tinysrgb&w=400" }
    ]
  }
];
