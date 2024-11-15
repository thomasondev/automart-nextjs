"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SelectVehicleMake from "./SelectVehicleMake";
import SelectVehicleModel from "./SelectVehicleModel";
import vehicleMakes from "@/data/automart_vehicle_make.json";
import vehicleModels from "@/data/automart_vehicle_model.json";
import VehicleModel from "@/model/VehicleModel";

const vehicleMakeByName = new Map(
  vehicleMakes.map((vehicleMake) => [vehicleMake.name, vehicleMake])
);

export default function FilterVehicle() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [vehicleModel, setVehicleModel] = useState(readStringParam("vehicleModel"));
  const [vehicleMake, setVehicleMake] = useState(readStringParam("vehicleMake"));

  const vehicleMakeId = vehicleMakeByName.get(vehicleMake)?.id ?? NaN;
  const [filteredVehicleModels, setFilteredVehicleModels] = useState(
    vehicleModels.filter((models) => {
      return vehicleMakeId === models.vehicle_make_id;
    })
  );

  function readStringParam(param: string): string {
    const value = searchParams.get(param);
    if (value === null) {
      return "";
    }

    return value;
  }

  function handleVehicleModelChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    if (value) {
      params.set("vehicleModel", value);
      setVehicleModel(value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleVehicleMakeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    if (value) {
      params.set("vehicleMake", value);
      setVehicleMake(value);

      params.delete("vehicleModel");
      setVehicleModel("");

      const vehicleMakeId = vehicleMakeByName.get(value)?.id ?? NaN;
      setFilteredVehicleModels(
        vehicleModels.filter((models) => {
          return vehicleMakeId === models.vehicle_make_id;
        })
      );
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <SelectVehicleMake
        options={vehicleMakes}
        value={vehicleMake}
        onChange={handleVehicleMakeChange}
      />
      <SelectVehicleModel
        vehicleModels={filteredVehicleModels}
        value={vehicleModel}
        onChange={handleVehicleModelChange}
      />
    </div>
  );
}
