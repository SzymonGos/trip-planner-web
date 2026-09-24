import { SignInButton } from '@/components/SignIn/SignInButton';
import { Button } from '@/components/ui/button';
import { ResetIcon } from '@/components/Icons/ResetIcon';
import { FC } from 'react';
import { DeleteTripButton } from '../DeleteTripButton';
import { Loader2 } from 'lucide-react';

type TCreateTripFormActionsProps = {
  authUserId: number;
  isSubmitting: boolean;
  isEditing: boolean;
  hasChanges: boolean;
  handleReset: () => void;
  tripId?: number;
  tripTitle?: string;
  hasPendingImageChanges: boolean;
};
export const CreateTripFormActions: FC<TCreateTripFormActionsProps> = ({
  authUserId,
  isSubmitting,
  isEditing,
  hasChanges,
  handleReset,
  hasPendingImageChanges,
  tripId,
  tripTitle,
}) => (
  <div className="mt-8 flex gap-4">
    {!authUserId && <SignInButton />}
    {authUserId && (
      <>
        <Button
          type="submit"
          className="min-w-[200px]"
          disabled={isSubmitting || (isEditing && !hasChanges && !hasPendingImageChanges)}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {isEditing ? 'Updating...' : 'Creating...'}
            </>
          ) : isEditing ? (
            'Update Trip'
          ) : (
            'Create Trip'
          )}
        </Button>
        {!isEditing && (
          <Button type="button" variant="outline" onClick={handleReset}>
            <ResetIcon />
          </Button>
        )}
      </>
    )}
    {/* {isEditing && <DeleteTripButton tripId={tripId} tripTitle={tripTitle} />} */}
  </div>
);
