import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Globe, 
  Clock, 
  CheckCircle,
  Send,
  Copy,
  ExternalLink
} from 'lucide-react';

interface GuideProps {
  id: string;
  name: string;
  avatar: string;
  languages: string[];
  specialties: string[];
  rating: number;
  reviews: number;
  price: string;
  location: string;
  isVerified: boolean;
  availability: string;
  description: string;
  experience?: string;
  toursCompleted?: number;
  responseTime?: string;
  badge?: string;
  featured?: boolean;
}

interface GuideContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  guide: GuideProps;
}

const GuideContactModal: React.FC<GuideContactModalProps> = ({ isOpen, onClose, guide }) => {
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState('');

  // Mock contact information
  const contactInfo = {
    phone: '+221 77 123 45 67',
    whatsapp: '+221 77 123 45 67',
    email: 'contact@guide.sn',
    website: 'www.guide-senegal.sn',
    responseTime: guide.responseTime || 'Moins de 2 heures'
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Simuler l'envoi du message
      alert('Message envoyé avec succès ! Le guide vous répondra bientôt.');
      setMessage('');
      onClose();
    }
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsApp = (phone: string) => {
    const message = `Bonjour ${guide.name}, je suis intéressé(e) par vos services de guidage.`;
    window.open(`https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}?subject=Demande de guidage`, '_self');
  };

  const handleWebsite = (website: string) => {
    window.open(`https://${website}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            <span>Contacter {guide.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profil du guide */}
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            <Avatar className="h-16 w-16">
              <AvatarImage src={guide.avatar} alt={guide.name} />
              <AvatarFallback>
                {guide.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-lg">{guide.name}</h3>
                {guide.isVerified && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Vérifié
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Répond en {contactInfo.responseTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>⭐ {guide.rating}</span>
                  <span>({guide.reviews} avis)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {guide.specialties.slice(0, 3).map((specialty, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Méthodes de contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Méthodes de contact</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Téléphone */}
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Téléphone</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(contactInfo.phone, 'phone')}
                  >
                    {copied === 'phone' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-3">{contactInfo.phone}</p>
                <Button 
                  onClick={() => handleCall(contactInfo.phone)}
                  className="w-full"
                  size="sm"
                >
                  Appeler
                </Button>
              </div>

              {/* WhatsApp */}
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">WhatsApp</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(contactInfo.whatsapp, 'whatsapp')}
                  >
                    {copied === 'whatsapp' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-3">{contactInfo.whatsapp}</p>
                <Button 
                  onClick={() => handleWhatsApp(contactInfo.whatsapp)}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>

              {/* Email */}
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-red-600" />
                    <span className="font-medium">Email</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(contactInfo.email, 'email')}
                  >
                    {copied === 'email' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-3">{contactInfo.email}</p>
                <Button 
                  onClick={() => handleEmail(contactInfo.email)}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Envoyer un email
                </Button>
              </div>

              {/* Site web */}
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Site web</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(contactInfo.website, 'website')}
                  >
                    {copied === 'website' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-3">{contactInfo.website}</p>
                <Button 
                  onClick={() => handleWebsite(contactInfo.website)}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visiter le site
                </Button>
              </div>
            </div>
          </div>

          {/* Message rapide */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Message rapide</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="message">Votre message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Bonjour ${guide.name}, je suis intéressé(e) par vos services de guidage...`}
                  rows={4}
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Le guide vous répondra dans les plus brefs délais
                </p>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="flex items-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Envoyer</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Informations utiles */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Conseils</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• WhatsApp est généralement le moyen le plus rapide pour contacter les guides</li>
              <li>• Précisez vos dates et préférences dans votre message</li>
              <li>• N'hésitez pas à poser des questions sur les sites à visiter</li>
              <li>• Demandez des références ou des photos de visites précédentes</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuideContactModal;
