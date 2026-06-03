'use server';

import { revalidatePath } from 'next/cache';
import { getTripPlannerEditUrl } from '../../helpers/getTripPlannerEditUrl';
import { getTripUrl } from '../../helpers/getTripUrl';
import { getTripsUrl } from '../../helpers/getTripsUrl';
import { getHomePageUrl } from '../../helpers/getHomePageUrl';

export async function revalidateTripPages(tripId: string) {
  revalidatePath(getTripUrl(tripId));
  revalidatePath(getTripPlannerEditUrl(tripId));
  revalidatePath(getTripsUrl());
  revalidatePath(getHomePageUrl());
}
