import { useState, useEffect } from 'react';
import { TicketFilters as ITicketFilters, TicketStatus, TicketType } from '@/types/ticket';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TicketFiltersProps {
  filters: ITicketFilters;
  onFilterChange: (filters: Partial<ITicketFilters>) => void;
}

export const TicketFilters = ({ filters, onFilterChange }: TicketFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<Partial<ITicketFilters>>(filters);

  // Mettre à jour les filtres locaux lorsque les props changent
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleTypeChange = (value: string) => {
    setLocalFilters(prev => ({ ...prev, type: value as TicketType | 'all' }));
  };

  const handleStatusChange = (value: string) => {
    setLocalFilters(prev => ({ ...prev, status: value as TicketStatus | 'all' }));
  };

  const handleDateRangeChange = (range: { from?: Date | null; to?: Date | null } | undefined) => {
    setLocalFilters(prev => ({
      ...prev,
      dateRange: {
        from: range?.from || null,
        to: range?.to || null,
      },
    }));
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      type: 'all',
      status: 'all',
      dateRange: { from: null, to: null },
      search: '',
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Rechercher</h3>
        <Input
          placeholder="Rechercher une réservation..."
          value={localFilters.search || ''}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
        />
      </div>

      <div>
        <h3 className="font-medium mb-3">Type de réservation</h3>
        <Select
          value={localFilters.type || 'all'}
          onValueChange={handleTypeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tous les types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="guide">Guide touristique</SelectItem>
            <SelectItem value="event">Événement</SelectItem>
            <SelectItem value="accommodation">Hébergement</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-medium mb-3">Statut</h3>
        <Select
          value={localFilters.status || 'all'}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="confirmed">Confirmé</SelectItem>
            <SelectItem value="cancelled">Annulé</SelectItem>
            <SelectItem value="completed">Terminé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-medium mb-3">Période</h3>
        <div className="space-y-3">
          <div>
            <Label htmlFor="date-from">Date de début</Label>
            <Input
              id="date-from"
              type="date"
              value={localFilters.dateRange?.from ? localFilters.dateRange.from.toISOString().split('T')[0] : ''}
              onChange={(e) => {
                const fromDate = e.target.value ? new Date(e.target.value) : null;
                handleDateRangeChange({
                  from: fromDate,
                  to: localFilters.dateRange?.to || null,
                });
              }}
            />
          </div>
          <div>
            <Label htmlFor="date-to">Date de fin</Label>
            <Input
              id="date-to"
              type="date"
              value={localFilters.dateRange?.to ? localFilters.dateRange.to.toISOString().split('T')[0] : ''}
              onChange={(e) => {
                const toDate = e.target.value ? new Date(e.target.value) : null;
                handleDateRangeChange({
                  from: localFilters.dateRange?.from || null,
                  to: toDate,
                });
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-2 pt-2">
        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="flex-1"
        >
          Réinitialiser
        </Button>
        <Button 
          onClick={applyFilters}
          className="flex-1"
        >
          Appliquer
        </Button>
      </div>
    </div>
  );
};

export default TicketFilters;