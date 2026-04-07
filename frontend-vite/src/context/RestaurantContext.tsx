import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Restaurant {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  status: 'Validé' | 'En attente' | 'Suspendu';
  image: string;
  images: string[];
  phone: string;
  email: string;
  openingHours: string;
  description: string;
  hasMenu: boolean;
  hasOffers: boolean;
  type: string;
  featured: boolean;
  price: string;
  amenities: string[];
  availability: string;
}

interface RestaurantContextType {
  restaurants: Restaurant[];
  addRestaurant: (restaurant: Omit<Restaurant, 'id' | 'rating' | 'reviews' | 'status'>) => void;
  updateRestaurant: (id: string, updates: Partial<Restaurant>) => void;
  deleteRestaurant: (id: string) => void;
  updateStatus: (id: string, status: Restaurant['status']) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: 'r1',
      name: 'Le Lagon Bleu',
      specialty: 'Fruits de Mer',
      location: 'Dakar, Corniche',
      rating: 4.8,
      reviews: 156,
      status: 'Validé',
      image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: [
        'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      phone: '+221 33 821 00 00',
      email: 'contact@lagonbleu.sn',
      openingHours: '12:00 - 23:30',
      hasMenu: true,
      hasOffers: true,
      description: 'Une institution dakaroise offrant une vue imprenable sur l\'île de Gorée et une cuisine raffinée.',
      type: 'Restaurant',
      featured: true,
      price: '15,000 FCFA',
      amenities: ['WiFi', 'Parking', 'Climatisation', 'Vue Mer'],
      availability: 'Ouvert'
    },
    {
      id: 'r2',
      name: 'Chez Fatou',
      specialty: 'Sénégalaise',
      location: 'Dakar, Almadies',
      rating: 4.5,
      reviews: 89,
      status: 'En attente',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: [
        'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      phone: '+221 33 820 12 34',
      email: 'fatou@teranga.sn',
      openingHours: '11:00 - 22:00',
      hasMenu: true,
      hasOffers: false,
      description: 'L\'authenticité de la Teranga sénégalaise dans chaque plat. Thieboudienne royal et Yassa au poulet.',
      type: 'Restaurant',
      featured: false,
      price: '8,000 FCFA',
      amenities: ['WiFi', 'Terrasse', 'Climatisation'],
      availability: 'Ouvert'
    },
    {
      id: 'r3',
      name: 'La Piazzetta',
      specialty: 'Italienne',
      location: 'Saly',
      rating: 4.2,
      reviews: 45,
      status: 'Validé',
      image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: [
        'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      phone: '+221 33 957 44 55',
      email: 'ciao@piazzetta.sn',
      openingHours: '18:30 - 00:00',
      hasMenu: true,
      hasOffers: true,
      description: 'Pizzas au feu de bois et pâtes fraîches dans une ambiance conviviale au bord de mer.',
      type: 'Restaurant',
      featured: true,
      price: '12,000 FCFA',
      amenities: ['WiFi', 'Parking', 'Terrasse'],
      availability: 'Ouvert'
    },
    {
      id: 'r4',
      name: 'Le Jardin Thaï',
      specialty: 'Asiatique',
      location: 'Dakar, Plateau',
      rating: 4.6,
      reviews: 112,
      status: 'Suspendu',
      image: 'https://images.pexels.com/photos/6267/menu-restaurant-france-eating.jpg?auto=compress&cs=tinysrgb&w=400',
      images: [
        'https://images.pexels.com/photos/6267/menu-restaurant-france-eating.jpg?auto=compress&cs=tinysrgb&w=400'
      ],
      phone: '+221 33 823 45 67',
      email: 'thai@jardin.sn',
      openingHours: '12:00 - 15:00, 19:00 - 23:00',
      hasMenu: false,
      hasOffers: false,
      description: 'Un voyage culinaire en Thaïlande au cœur de Dakar avec un cadre verdoyant exceptionnel.',
      type: 'Restaurant',
      featured: false,
      price: '10,000 FCFA',
      amenities: ['WiFi', 'Jardin', 'Climatisation'],
      availability: 'Fermé'
    }
  ]);

  const addRestaurant = (data: any) => {
    const newRestaurant: Restaurant = {
      ...data,
      id: `r${Date.now()}`,
      rating: 0,
      reviews: 0,
      status: 'En attente',
      type: 'Restaurant',
      featured: false,
      image: data.image || (data.images && data.images.length > 0 ? data.images[0] : ''),
      price: data.price || '0 FCFA',
      amenities: data.amenities || [],
      availability: 'Ouvert'
    };
    setRestaurants(prev => [newRestaurant, ...prev]);
  };

  const updateRestaurant = (id: string, updates: Partial<Restaurant>) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === id) {
        const newImages = updates.images || r.images;
        const newImage = updates.image || (updates.images && updates.images.length > 0 ? updates.images[0] : r.image);
        return { ...r, ...updates, image: newImage, images: newImages };
      }
      return r;
    }));
  };

  const deleteRestaurant = (id: string) => {
    setRestaurants(prev => prev.filter(r => r.id !== id));
  };

  const updateStatus = (id: string, status: Restaurant['status']) => {
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <RestaurantContext.Provider value={{ restaurants, addRestaurant, updateRestaurant, deleteRestaurant, updateStatus }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurants = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurants must be used within a RestaurantProvider');
  }
  return context;
};
