import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';

interface LanguageSelectorProps {
  languages: string[];
  onLanguagesChange: (languages: string[]) => void;
  disabled?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  languages, 
  onLanguagesChange, 
  disabled = false 
}) => {
  const availableLanguages = [
    'Français', 'English', 'Wolof', 'Sérère', 'Español', 'Arabe', 'Mandarin', 'Portugais'
  ];

  const addLanguage = (language: string) => {
    if (!languages.includes(language)) {
      onLanguagesChange([...languages, language]);
    }
  };

  const removeLanguage = (language: string) => {
    onLanguagesChange(languages.filter(lang => lang !== language));
  };

  return (
    <div className="space-y-3">
      {/* Langues sélectionnées */}
      <div className="flex flex-wrap gap-2">
        {languages.map((language) => (
          <Badge key={language} variant="secondary" className="flex items-center space-x-1">
            <span>{language}</span>
            {!disabled && (
              <Button
                size="sm"
                variant="ghost"
                className="h-4 w-4 p-0 hover:bg-gray-200"
                onClick={() => removeLanguage(language)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </Badge>
        ))}
      </div>

      {/* Boutons pour ajouter des langues */}
      {!disabled && (
        <div className="flex flex-wrap gap-2">
          {availableLanguages
            .filter(lang => !languages.includes(lang))
            .map((language) => (
              <Button
                key={language}
                size="sm"
                variant="outline"
                className="h-8 text-xs"
                onClick={() => addLanguage(language)}
              >
                <Plus className="h-3 w-3 mr-1" />
                {language}
              </Button>
            ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
