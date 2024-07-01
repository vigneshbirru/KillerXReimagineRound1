import { getAuthSession } from '../_lib/auth';

const page = async () => {
  const session = await getAuthSession();

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {session?.user?.name}
    </h2>
  );
};

export default page;
