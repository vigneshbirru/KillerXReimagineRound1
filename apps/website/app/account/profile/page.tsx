import SelectCountry from '@/app/_components/SelectCountry';
import UpdateProfileForm from '@/app/_components/UpdateProfileForm';
import { getAuthSession } from '@/app/_lib/auth';
import { db } from '@repo/db/client';

const getGuest = async (email: string) => {
  const guest = await db.guests.findUnique({ where: { email } });
  return guest;
};

const page = async () => {
  const session = await getAuthSession();
  const guest = await getGuest(session?.user?.email || '');

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      {/* @ts-ignore */}
      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest?.nationality || ''}
        />
      </UpdateProfileForm>
    </div>
  );
};

export default page;
