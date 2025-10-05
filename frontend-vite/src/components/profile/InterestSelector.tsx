import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';

interface InterestSelectorProps {
  interests: string[];
  onInterestsChange: (interests: string[]) => void;
  disabled?: boolean;
}

const InterestSelector: React.FC<InterestSelectorProps> = ({ 
  interests, 
  onInterestsChange, 
  disabled = false 
}) => {
  const availableInterests = [
    'Culture', 'Histoire', 'Gastronomie', 'Art', 'Musique', 'Sport', 
    'Nature', 'Photographie', 'Voyage', 'Architecture', 'Religion', 'Traditions'
  ];

  const addInterest = (interest: string) => {
    if (!interests.includes(interest)) {
      onInterestsChange([...interests, interest]);
    }
  };

  const removeInterest = (interest: string) => {
    onInterestsChange(interests.filter(int => int !== interest));
  };

  return (
    <div className="space-y-3">
      {/* Centres d'intérêt sélectionnés */}
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <Badge key={interest} variant="secondary" className="flex items-center space-x-1">
            <span>{interest}</span>
            {!disabled && (
              <Button
                size="sm"
                variant="ghost"
                className="h-4 w-4 p-0 hover:bg-gray-200"
                onClick={() => removeInterest(interest)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </Badge>
        ))}
      </div>

      {/* Boutons pour ajouter des centres d'intérêt */}
      {!disabled && (
        <div className="flex flex-wrap gap-2">
          {availableInterests
            .filter(interest => !interests.includes(interest))
            .map((interest) => (
              <Button
                key={interest}
                size="sm"
                variant="outline"
                className="h-8 text-xs"
                onClick={() => addInterest(interest)}
              >
                <Plus className="h-3 w-3 mr-1" />
                {interest}
              </Button>
            ))}
        </div>
      )}
    </div>
  );
};

export default InterestSelector;
