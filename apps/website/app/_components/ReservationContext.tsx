'use client';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface ReservationContextProps {
  children: ReactNode;
}
//@ts-ignore
const ReservationContext = createContext();

const initialState: { from: string | undefined; to: string | undefined } = {
  from: undefined,
  to: undefined,
};

const ReservationProvider: FC<ReservationContextProps> = ({ children }) => {
  const [range, setRange] = useState<{
    from: string | undefined;
    to: string | undefined;
  }>(initialState);
  const resetRange = () => setRange(initialState);
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
};

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error('Context was used outside provider');
  return context;
}

export { ReservationProvider, useReservation };
