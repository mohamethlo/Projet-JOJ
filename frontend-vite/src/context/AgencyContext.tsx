import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAgencies } from '@/lib/mockData';

interface Offer {
  id: string;
  title: string;
  type: string;
  price: string;
  duration: string;
  capacity: number;
  location: string;
  status: 'Active' | 'Inactive';
  image: string;
  images?: string[];
  description?: string;
  amenities?: string[];
}

interface Agency {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  status: 'Actif' | 'En attente' | 'Suspendu';
  offers: Offer[];
  amenities?: string[];
}

interface AgencyContextType {
  agencies: Agency[];
  toggleOfferStatus: (agencyId: string, offerId: string) => void;
  updateAgencyStatus: (agencyId: string, status: Agency['status']) => void;
  deleteAgency: (agencyId: string) => void;
  addAgency: (agency: Agency) => void;
  updateAgency: (agency: Agency) => void;
  addOffer: (agencyId: string, offer: Offer) => void;
  updateOffer: (agencyId: string, offer: Offer) => void;
  deleteOffer: (agencyId: string, offerId: string) => void;
}

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

export const AgencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    // Initialiser avec les données mockées en ajoutant un statut par défaut si manquant
    const initializedAgencies = mockAgencies.map((agency: any) => ({
      ...agency,
      status: agency.status || 'Actif',
      images: agency.images || [agency.image],
      offers: (agency.offers || []).map((offer: any) => ({
        ...offer,
        status: offer.status || 'Active'
      }))
    }));
    setAgencies(initializedAgencies);
  }, []);

  const toggleOfferStatus = (agencyId: string, offerId: string) => {
    setAgencies(prev => prev.map(agency => {
      if (agency.id === agencyId) {
        return {
          ...agency,
          offers: agency.offers.map(offer => {
            if (offer.id === offerId) {
              return { ...offer, status: offer.status === 'Active' ? 'Inactive' : 'Active' };
            }
            return offer;
          })
        };
      }
      return agency;
    }));
  };

  const updateAgencyStatus = (agencyId: string, status: Agency['status']) => {
    setAgencies(prev => prev.map(agency => 
      agency.id === agencyId ? { ...agency, status } : agency
    ));
  };

  const deleteAgency = (agencyId: string) => {
    setAgencies(prev => prev.filter(agency => agency.id !== agencyId));
  };

  const addAgency = (agency: Agency) => {
    setAgencies(prev => [...prev, agency]);
  };

  const updateAgency = (updatedAgency: Agency) => {
    setAgencies(prev => prev.map(agency => 
      agency.id === updatedAgency.id ? updatedAgency : agency
    ));
  };

  const addOffer = (agencyId: string, offer: Offer) => {
    setAgencies(prev => prev.map(agency => {
      if (agency.id === agencyId) {
        return { ...agency, offers: [...agency.offers, offer] };
      }
      return agency;
    }));
  };

  const updateOffer = (agencyId: string, updatedOffer: Offer) => {
    setAgencies(prev => prev.map(agency => {
      if (agency.id === agencyId) {
        return {
          ...agency,
          offers: agency.offers.map(offer => 
            offer.id === updatedOffer.id ? updatedOffer : offer
          )
        };
      }
      return agency;
    }));
  };

  const deleteOffer = (agencyId: string, offerId: string) => {
    setAgencies(prev => prev.map(agency => {
      if (agency.id === agencyId) {
        return {
          ...agency,
          offers: agency.offers.filter(offer => offer.id !== offerId)
        };
      }
      return agency;
    }));
  };

  return (
    <AgencyContext.Provider value={{ 
      agencies, 
      toggleOfferStatus, 
      updateAgencyStatus, 
      deleteAgency, 
      addAgency,
      updateAgency,
      addOffer,
      updateOffer,
      deleteOffer
    }}>
      {children}
    </AgencyContext.Provider>
  );
};

export const useAgencies = () => {
  const context = useContext(AgencyContext);
  if (context === undefined) {
    throw new Error('useAgencies must be used within an AgencyProvider');
  }
  return context;
};
