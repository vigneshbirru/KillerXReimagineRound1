import ReservationList from '@/app/_components/ReservationList';
import { getAuthSession } from '@/app/_lib/auth';
import { db } from '@repo/db/client';

const getBookings = async (id: string) => {
  const bookings = await db.bookings.findMany({
    where: { guestId: id },
    orderBy: { startDate: 'asc' },
    include: {
      cabins: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  return bookings;
};

const page = async () => {
  const session = await getAuthSession();
  //@ts-ignore
  const bookings = await getBookings(session?.user.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{' '}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
};

export default page;
