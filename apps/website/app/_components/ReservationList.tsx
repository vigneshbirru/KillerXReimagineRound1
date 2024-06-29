'use client';
import { Bookings } from '@repo/db/client';
import { FC, useOptimistic } from 'react';
import { deleteBooking } from '../_lib/actions';
import ReservationCard from './ReservationCard';

interface ReservationListProps {
  bookings: Bookings[];
}

const ReservationList: FC<ReservationListProps> = ({ bookings }) => {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    },
  );

  async function handleDelete(bookingId: string) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
