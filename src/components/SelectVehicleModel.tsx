"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCreateQueryString } from "../hooks/useCreateQueryString";

interface SelectVehicleModelProps {
  vehicleModels: { id: number; name: string }[];
  disabled?: boolean;
}

export default function SelectVehicleModel({
  vehicleModels,
  disabled = true,
}: SelectVehicleModelProps) {
  const [make, setModel] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useCreateQueryString();

  function handleMakeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const modelId = e.target.value;
    const queryString = createQueryString("model", modelId);
    router.push(`${pathname}?${queryString}`);
    setModel(modelId);
  }

  return (
    <select
      className="select"
      value={make}
      disabled={disabled}
      onChange={handleMakeChange}
    >
      <option disabled value={""}>
        Select a make
      </option>
      {vehicleModels.map((vehicleModel) => (
        <option key={vehicleModel.id} value={vehicleModel.name}>
          {vehicleModel.name}
        </option>
      ))}
    </select>
  );
}
