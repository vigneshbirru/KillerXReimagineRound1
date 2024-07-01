import { FC } from 'react';

interface SelectCountryProps {
  defaultCountry: string | null;
  name: string;
  id: string;
  className: string;
}

const getCountries = async () => {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag',
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
};

const SelectCountry: FC<SelectCountryProps> = async ({
  defaultCountry,
  name,
  id,
  className,
}) => {
  const countries = await getCountries();
  const flag =
    countries.find((country: any) => country.name === defaultCountry)?.flag ??
    '';

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c: any) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCountry;
