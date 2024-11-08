"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCreateQueryString } from "../hooks/useCreateQueryString";

interface SelectVehicleMakeProps {
  vehicleMakes: { id: number; name: string }[];
}

export default function SelectVehicleMake({
  vehicleMakes,
}: SelectVehicleMakeProps) {
  const [make, setMake] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useCreateQueryString();

  function handleMakeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const makeId = e.target.value;
    const queryString = createQueryString("make", makeId);
    router.push(`${pathname}?${queryString}`);
    setMake(makeId);
  }

  return (
    <select className="select" value={make} onChange={handleMakeChange}>
      <option disabled value={""}>
        Select a make
      </option>
      {vehicleMakes.map((vehicleMake) => (
        <option key={vehicleMake.id} value={vehicleMake.name}>
          {vehicleMake.name}
        </option>
      ))}
    </select>
  );
}
