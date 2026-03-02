import { useState, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useVisitorEngagement } from '../context/VisitorEngagementContext';
import AuthModal from '../components/modals/AuthModal';
import VisitorEngagementModal from '../components/modals/VisitorEngagementModal';

/**
 * Hook to wrap actions that require authentication.
 * If user is not logged in, it shows the AuthModal instead of executing the action.
 */
export const useProtectedAction = () => {
    const { user } = useAuth();
    const { trackBlockedAction, isEngagementModalOpen, closeEngagementModal, blockedActionsCount } = useVisitorEngagement();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<{ name: string; callback: () => void } | null>(null);

    const performAction = useCallback((callback: () => void, actionName: string = "cette action") => {
        if (user) {
            callback();
        } else {
            setPendingAction({ name: actionName, callback });
            trackBlockedAction();
            // If it's the second attempt, the VisitorEngagementContext will open the modal
            // Otherwise, we open the standard AuthModal
            if (blockedActionsCount !== 1) { // count is about to be 2 if it was 1
                setIsAuthModalOpen(true);
            }
        }
    }, [user, trackBlockedAction, blockedActionsCount]);

    const closeAllModals = useCallback(() => {
        setIsAuthModalOpen(false);
        closeEngagementModal();
        setPendingAction(null);
    }, [closeEngagementModal]);

    const AuthModalComponent = useMemo(() => (
        <>
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={closeAllModals}
                actionName={pendingAction?.name}
            />
            <VisitorEngagementModal
                isOpen={isEngagementModalOpen}
                onClose={closeAllModals}
            />
        </>
    ), [isAuthModalOpen, isEngagementModalOpen, closeAllModals, pendingAction?.name]);

    return {
        performAction,
        isAuthModalOpen: isAuthModalOpen || isEngagementModalOpen,
        closeAuthModal: closeAllModals,
        pendingActionName: pendingAction?.name,
        AuthModalComponent
    };
};

export default useProtectedAction;
