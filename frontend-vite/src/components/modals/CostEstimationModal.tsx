import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, MapPin, Clock, Users, Ticket, Info } from 'lucide-react';

interface CostEstimationModalProps {
  isOpen: boolean;
  onClose: () => void;
  guidePrice: string;
  duration: string;
  groupSize: string;
  sitesToVisit?: string;
}

const CostEstimationModal: React.FC<CostEstimationModalProps> = ({
  isOpen,
  onClose,
  guidePrice,
  duration,
  groupSize,
  sitesToVisit
}) => {
  // Données des sites touristiques avec leurs prix d'entrée
  const touristSites = {
    'Île de Gorée': { price: 5000, currency: 'FCFA' },
    'Monument de la Renaissance': { price: 3000, currency: 'FCFA' },
    'Lac Rose': { price: 2000, currency: 'FCFA' },
    'Parc National des Oiseaux du Djoudj': { price: 4000, currency: 'FCFA' },
    'Musée des Civilisations Noires': { price: 2000, currency: 'FCFA' },
    'Marché Sandaga': { price: 0, currency: 'FCFA' },
    'Plage de Yoff': { price: 0, currency: 'FCFA' },
    'Mosquée de la Divinité': { price: 0, currency: 'FCFA' },
    'Village des Tortues': { price: 3000, currency: 'FCFA' },
    'Réserve de Bandia': { price: 8000, currency: 'FCFA' },
    'Sine Saloum': { price: 5000, currency: 'FCFA' },
    'Saint-Louis': { price: 0, currency: 'FCFA' }
  };

  // Extraire les sites mentionnés
  const mentionedSites = sitesToVisit ? 
    Object.keys(touristSites).filter(site => 
      sitesToVisit.toLowerCase().includes(site.toLowerCase())
    ) : [];

  // Calculer les coûts
  const guideCost = parseInt(guidePrice.replace(/[^\d]/g, '')) || 0;
  const siteCosts = mentionedSites.reduce((total, site) => {
    return total + (touristSites[site as keyof typeof touristSites]?.price || 0);
  }, 0);
  
  // Coûts supplémentaires selon la durée
  const getDurationMultiplier = (duration: string) => {
    if (duration.includes('2 heures')) return 0.5;
    if (duration.includes('4 heures')) return 1;
    if (duration.includes('8 heures')) return 1.5;
    if (duration.includes('2 jours')) return 2;
    if (duration.includes('3 jours')) return 3;
    return 1;
  };

  const durationMultiplier = getDurationMultiplier(duration);
  const totalGuideCost = guideCost * durationMultiplier;
  const totalSiteCosts = siteCosts * durationMultiplier;
  const totalCost = totalGuideCost + totalSiteCosts;

  // Coûts optionnels
  const optionalCosts = {
    transport: 15000,
    meals: 8000,
    tips: 5000
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-blue-500" />
            <span>Estimation des coûts</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Résumé de la réservation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Résumé de votre réservation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Durée</span>
                </div>
                <Badge variant="outline">{duration}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Groupe</span>
                </div>
                <Badge variant="outline">{groupSize}</Badge>
              </div>
              {mentionedSites.length > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Sites à visiter</span>
                  </div>
                  <Badge variant="outline">{mentionedSites.length} site{mentionedSites.length > 1 ? 's' : ''}</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Coûts principaux */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Coûts principaux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Coût du guide */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-blue-900">Services de guidage</h4>
                  <p className="text-sm text-blue-700">
                    {guidePrice} × {durationMultiplier} {durationMultiplier > 1 ? 'jours' : 'jour'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-900">
                    {totalGuideCost.toLocaleString()} FCFA
                  </div>
                </div>
              </div>

              {/* Coûts des sites */}
              {mentionedSites.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Frais d'entrée aux sites</h4>
                  {mentionedSites.map((site) => {
                    const siteData = touristSites[site as keyof typeof touristSites];
                    const siteCost = siteData?.price || 0;
                    return (
                      <div key={site} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <Ticket className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{site}</span>
                        </div>
                        <div className="text-sm font-medium">
                          {siteCost === 0 ? 'Gratuit' : `${siteCost.toLocaleString()} FCFA`}
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="font-medium text-orange-900">Total frais d'entrée</div>
                    <div className="font-bold text-orange-900">
                      {totalSiteCosts.toLocaleString()} FCFA
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-yellow-600" />
                    <p className="text-sm text-yellow-800">
                      Aucun site spécifique mentionné. Les frais d'entrée dépendront des sites visités.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Coûts optionnels */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Coûts optionnels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Transport (optionnel)</span>
                <span className="text-sm font-medium">{optionalCosts.transport.toLocaleString()} FCFA</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Repas (optionnel)</span>
                <span className="text-sm font-medium">{optionalCosts.meals.toLocaleString()} FCFA</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Pourboires (recommandé)</span>
                <span className="text-sm font-medium">{optionalCosts.tips.toLocaleString()} FCFA</span>
              </div>
            </CardContent>
          </Card>

          {/* Total estimé */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-green-900">Total estimé</h3>
                  <p className="text-sm text-green-700">
                    Services de guidage + Frais d'entrée
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-900">
                    {totalCost.toLocaleString()} FCFA
                  </div>
                  <p className="text-xs text-green-600">
                    + coûts optionnels selon vos besoins
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations importantes */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Informations importantes</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Les frais d'entrée sont payés directement sur place</li>
                  <li>• Les prix peuvent varier selon la saison</li>
                  <li>• Certains sites offrent des tarifs réduits pour les groupes</li>
                  <li>• Le transport et les repas sont optionnels</li>
                  <li>• Les pourboires sont appréciés mais non obligatoires</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Continuer la réservation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CostEstimationModal;
