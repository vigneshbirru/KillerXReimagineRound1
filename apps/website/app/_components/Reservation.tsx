import { Cabins, db } from '@repo/db/client';
import { eachDayOfInterval } from 'date-fns';
import { FC } from 'react';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import { getAuthSession } from '../_lib/auth';
import LoginMessage from './LoginMessage';

interface ReservationProps {
  cabin: Cabins | null;
}

const getSettings = async () => {
  const settings = await db.settings.findMany({
    select: {
      minBookingLength: true,
      maxBookingLength: true,
      breakfastPrice: true,
      maxGuestsPerBooking: true,
    },
  });
  return settings;
};

const getBookedDatesByCabinId = async (id: string) => {
  const dates = await db.bookings.findMany({
    where: {
      cabinId: id,
    },
    select: {
      startDate: true,
      endDate: true,
    },
  });

  const bookedDates = dates.map((booking) => {
    return eachDayOfInterval({
      start: new Date(booking.startDate),
      end: new Date(booking.endDate),
    });
  });
  return bookedDates;
};

const Reservation: FC<ReservationProps> = async ({ cabin }) => {
  const session = await getAuthSession();
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin?.id || ''),
  ]);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings[0]}
        //@ts-ignore
        cabin={cabin}
        bookedDates={bookedDates}
      />

      {session?.user ? (
        <ReservationForm
          //@ts-ignore
          cabin={cabin}
          //@ts-ignore
          user={session?.user}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
