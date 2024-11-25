"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import vehicleMakes from "@/data/automart_vehicle_make.json";
import vehicleModels from "@/data/automart_vehicle_model.json";
import AutomartSelect from "./AutomartSelect";

const vehicleMakeById = new Map(
  vehicleMakes.map((vehicleMake) => [vehicleMake.id, vehicleMake])
);

const vehicleMakeAndeModels = vehicleModels.map((vehicleModel) => {
  return {
    vehicleModel: vehicleModel.name,
    vehicleMake: vehicleMakeById.get(vehicleModel.vehicle_make_id)?.name,
  };
});

export default function FilterVehicle() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  let vehicleMakeParam = searchParams.get("vehicleMake");
  if (vehicleMakes.findIndex((make) => make.name === vehicleMakeParam) == -1) {
    vehicleMakeParam = null;
  }

  let vehicleModelParam = searchParams.get("vehicleModel");
  if (
    vehicleModels.findIndex((model) => model.name === vehicleModelParam) == -1
  ) {
    vehicleModelParam = null;
  }

  // make must be selected first otherwise the unit test will fail
  const [vehicleMake, setVehicleMake] = useState(vehicleMakeParam);

  const [filteredVehicleModels, setFilteredVehicleModels] = useState(
    vehicleMakeAndeModels.filter((model) => vehicleMake === model.vehicleMake)
  );

  const [vehicleModel, setVehicleModel] = useState(vehicleModelParam);

  function handleVehicleModelChange(vehicleModel: string) {
    if (!Boolean(vehicleModel)) {
      console.error("Invalid vehicle model", vehicleModel);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("vehicleModel", vehicleModel);
    setVehicleModel(vehicleModel);

    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleVehicleMakeChange(vehicleMake: string) {
    if (!Boolean(vehicleMake)) {
      console.error("Invalid vehicle make", vehicleMake);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("vehicleMake", vehicleMake);
    setVehicleMake(vehicleMake);

    params.delete("vehicleModel");
    setVehicleModel("");

    setFilteredVehicleModels(
      vehicleMakeAndeModels.filter((model) => vehicleMake === model.vehicleMake)
    );

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="w-1/2">
      <AutomartSelect
        options={vehicleMakes.map((make) => ({
          value: make.name,
          text: make.name,
        }))}
        value={vehicleMake}
        onChange={handleVehicleMakeChange}
        placeholder=""
        label="Select Make"
        id="selectMake"
      />
      <AutomartSelect
        options={filteredVehicleModels.map((model) => ({
          value: model.vehicleModel,
          text: model.vehicleModel,
        }))}
        value={vehicleModel}
        onChange={handleVehicleModelChange}
        placeholder=""
        label="Select Model"
        id="selectModel"
      />
    </div>
  );
}
