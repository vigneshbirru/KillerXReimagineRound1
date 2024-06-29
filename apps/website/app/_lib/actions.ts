'use server';

import { getAuthSession } from './auth';
import { redirect } from 'next/navigation';
import { db } from '@repo/db/client';

export async function createBooking(bookingData: any, formData: any) {
  const session = await getAuthSession();
  if (!session) throw new Error('You must be logged in');

  const newBooking = {
    ...bookingData,
    //@ts-ignore
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  };

  console.log(newBooking);

  const booking = await db.bookings.create({ data: newBooking });
  console.log(booking);
  if (!booking) throw new Error('Booking could not be created');
  // revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect('/cabins/thankyou');
}
