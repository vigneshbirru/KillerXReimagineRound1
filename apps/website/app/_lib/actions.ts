'use server';

import { getAuthSession } from './auth';
import { redirect } from 'next/navigation';
import { db } from '@repo/db/client';
import { signOut } from 'next-auth/react';
import { revalidatePath } from 'next/cache';

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

  const booking = await db.bookings.create({ data: newBooking });

  if (!booking) throw new Error('Booking could not be created');
  // revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect('/cabins/thankyou');
}

export async function updateBooking(formData: any) {
  const bookingId = formData.get('bookingId');

  // 1) Authentication
  const session = await getAuthSession();
  if (!session) throw new Error('You must be logged in');

  // 2) Authorization
  const guestBookings = await db.bookings.findMany({
    where: {
      //@ts-ignore
      guestId: session.user.guestId,
    },
  });
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not allowed to update this booking');

  const updateData = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
  };

  const update = await db.bookings.update({
    where: {
      id: bookingId,
    },
    data: updateData,
  });

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath('/account/reservations');

  // 7) Redirecting
  redirect('/account/reservations');
}

export async function updateGuest(formData: any) {
  const session = await getAuthSession();
  if (!session) throw new Error('You must be logged in');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error('Please provide a valid national ID');

  const updateData = { nationality, countryFlag, nationalID };

  const update = await db.guests.update({
    where: {
      //@ts-ignore
      id: session.user.guestId,
    },
    data: updateData,
  });

  revalidatePath('/account/profile');
}

export async function deleteBooking(id: string) {
  const del = await db.bookings.delete({ where: { id } });
  revalidatePath('/account/reservations');
}

export async function signOutAction() {
  await signOut({ redirect: true, callbackUrl: '/' });
}
