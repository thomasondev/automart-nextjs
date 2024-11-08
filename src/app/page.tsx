import SelectVehicleMake from "@/components/SelectVehicleMake";
import SelectVehicleModel from "@/components/SelectVehicleModel";
import invetory from "@/data/automart_inventory.json";
import vehicleMakes from "@/data/automart_vehicle_make.json";
import vehicleModels from "@/data/automart_vehicle_model.json";

const vehicleMakeById = new Map(
  vehicleMakes.map((vehicleMake) => [vehicleMake.id, vehicleMake])
);

const vehicleMakeByName = new Map(
  vehicleMakes.map((vehicleMake) => [vehicleMake.name, vehicleMake])
);

const vehicleModelById = new Map(
  vehicleModels.map((vehicleModel) => [vehicleModel.id, vehicleModel])
);

const vehicleModelByName = new Map(
  vehicleModels.map((vehicleModel) => [vehicleModel.name, vehicleModel])
);

const sortedVehicleMakes = vehicleMakes.sort((a, b) =>
  a.name.localeCompare(b.name)
);

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { make } = await searchParams;

  const filteredInventory = invetory
    .filter((vehicle) => {
      if (typeof make === "string") {
        if (vehicleMakeByName.has(make)) {
          const makeId = vehicleMakeByName.get(make)!.id;
          return vehicle.vehicle_make_id === makeId;
        }
      }
    })
    .sort((a, b) => a.vehicle_model_id - b.vehicle_model_id);

  return (
    <main className="prose">
      <h1>Automart Inventory</h1>
      <SelectVehicleMake vehicleMakes={sortedVehicleMakes} />
      <table className="table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Make</th>
            <th>Model</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((car) => (
            <tr key={car.vehicle_vin}>
              <td>{car.vehicle_year}</td>
              <td>{vehicleMakeById.get(car.vehicle_make_id)?.name}</td>
              <td>{vehicleModelById.get(car.vehicle_model_id)?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
