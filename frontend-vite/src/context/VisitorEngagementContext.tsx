import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface VisitorEngagementContextType {
    blockedActionsCount: number;
    scrollCount: number;
    isEngagementModalOpen: boolean;
    showEngagementModal: () => void;
    closeEngagementModal: () => void;
    trackBlockedAction: () => void;
    trackScroll: () => void;
    resetEngagement: () => void;
}

const VisitorEngagementContext = createContext<VisitorEngagementContextType | undefined>(undefined);

export const useVisitorEngagement = () => {
    const context = useContext(VisitorEngagementContext);
    if (context === undefined) {
        throw new Error('useVisitorEngagement must be used within a VisitorEngagementProvider');
    }
    return context;
};

export const VisitorEngagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [blockedActionsCount, setBlockedActionsCount] = useState(0);
    const [scrollCount, setScrollCount] = useState(0);
    const [isEngagementModalOpen, setIsEngagementModalOpen] = useState(false);

    // Load initial state from sessionStorage to persist during the session but not across closing tabs
    useEffect(() => {
        const savedCount = sessionStorage.getItem('ds_blocked_actions');
        if (savedCount) setBlockedActionsCount(parseInt(savedCount, 10));
    }, []);

    const trackBlockedAction = useCallback(() => {
        setBlockedActionsCount(prev => {
            const newCount = prev + 1;
            sessionStorage.setItem('ds_blocked_actions', newCount.toString());

            // Trigger modal on the 2nd blocked action
            if (newCount === 2) {
                setIsEngagementModalOpen(true);
            }

            return newCount;
        });
    }, []);

    const trackScroll = useCallback(() => {
        setScrollCount(prev => {
            const newCount = prev + 1;

            // Trigger modal on the 6th scroll/step
            if (newCount === 6) {
                setIsEngagementModalOpen(true);
            }

            return newCount;
        });
    }, []);

    const showEngagementModal = useCallback(() => setIsEngagementModalOpen(true), []);
    const closeEngagementModal = useCallback(() => setIsEngagementModalOpen(false), []);

    const resetEngagement = useCallback(() => {
        setBlockedActionsCount(0);
        setScrollCount(0);
        sessionStorage.removeItem('ds_blocked_actions');
    }, []);

    return (
        <VisitorEngagementContext.Provider value={{
            blockedActionsCount,
            scrollCount,
            isEngagementModalOpen,
            showEngagementModal,
            closeEngagementModal,
            trackBlockedAction,
            trackScroll,
            resetEngagement
        }}>
            {children}
        </VisitorEngagementContext.Provider>
    );
};
