'use client';

import React, { FC, useState } from 'react';
import { DeleteIcon } from '@/components/Icons/DeleteIcon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { deleteTrip } from '../server/actions/deleteTrip';
import { useRouter } from 'next/navigation';
import { getTripsUrl } from '../helpers/getTripsUrl';

type TDeleteTripButtonProps = {
  tripId?: number;
  tripTitle: string;
};

export const DeleteTripButton: FC<TDeleteTripButtonProps> = ({ tripId, tripTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { getToken } = useAuth();

  const { mutateAsync: deleteTripMutation } = useMutation({
    mutationFn: async (id: number) => {
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication token is missing');
      }

      return deleteTrip(id, token);
    },
  });

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteTripMutation(tripId);
      setIsOpen(false);
      router.push(getTripsUrl());
    } catch (error) {
      console.error('Failed to delete trip:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100"
          title="Delete trip"
        >
          <DeleteIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Trip</DialogTitle>
          <DialogDescription className="py-5">
            Are you sure you want to delete &ldquo;{tripTitle?.slice(0, 20)}...&rdquo;? This action cannot be undone and
            will permanently remove the trip and all associated images.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Trip'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
