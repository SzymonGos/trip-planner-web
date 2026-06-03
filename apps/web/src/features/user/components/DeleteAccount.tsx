'use client';

import React, { FC } from 'react';
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
import { InfoIcon } from '@/components/Icons/InfoIcon';

type TDeleteAccountProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleDeleteAccount: () => void;
  isDeleting: boolean;
};

export const DeleteAccount: FC<TDeleteAccountProps> = ({ isOpen, setIsOpen, handleDeleteAccount, isDeleting }) => (
  <div className="mt-16">
    <div className="rounded-lg border border-tp-red-100 p-6">
      <div className="ml-3 w-full">
        <h3 className="text-lg font-medium text-tp-red-100 border-tp-red-100 pb-2">Danger Zone</h3>
        <div className="mt-2 text-sm text-gray-600">
          <p>By deleting your account, you will lose all your data and will not be able to recover it.</p>
        </div>
        <div className="mt-6">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="destructive" className="bg-red-600 hover:bg-red-700 focus:ring-red-500">
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent className="h-full sm:h-fit max-w-full sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle className="text-red-600">Delete Account</DialogTitle>
                <DialogDescription className="text-gray-600">This action cannot be undone.</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="flex items-center gap-2">
                  <InfoIcon className="size-5" />
                  <p className="text-sm text-gray-600">
                    Your data will be retained for 30 days, then permanently deleted.
                  </p>
                </div>
              </div>
              <DialogFooter className="flex gap-3">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Account'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isDeleting}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
);
