import FilterVehicle from "@/components/FilterVehicle";
import inventory from "@/data/automart_inventory.json";
import vehicleMakes from "@/data/automart_vehicle_make.json";
import vehicleModels from "@/data/automart_vehicle_model.json";

const vehicleMakeById = new Map(vehicleMakes.map((vehicleMake) => [vehicleMake.id, vehicleMake]));

const vehicleModelById = new Map(
  vehicleModels.map((vehicleModel) => [vehicleModel.id, vehicleModel])
);

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function filterInventory({ model, make }: { model: string; make: string }) {
  return inventory
    .map(({ vehicle_model_id, ...vehicle }) => {
      const vehicleModel = vehicleModelById.get(vehicle_model_id);
      let vehicleMake = null;
      if (vehicleModel) {
        vehicleMake = vehicleMakeById.get(vehicleModel.vehicle_make_id);
      }

      return {
        id: vehicle.id,
        vehicleYear: vehicle.vehicle_year,
        vehicleModel: vehicleModel?.name,
        vehicleMake: vehicleMake?.name,
      };
    })
    .filter((vehicle) => {
      let include = true;
      if (model) {
        include = include && vehicle.vehicleModel === model;
      }
      if (make) {
        include = include && vehicle.vehicleMake === make;
      }
      return include;
    });
}

export default async function Home(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const make = isString(searchParams.vehicleMake) ? searchParams.vehicleMake : "";
  const model = isString(searchParams.vehicleModel) ? searchParams.vehicleModel : "";

  const filteredInventory = filterInventory({
    make,
    model,
  });

  return (
    <main className="prose">
      <h1>Inventory</h1>
      <FilterVehicle />
      <table className="table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Make</th>
            <th>Model</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.vehicleYear}</td>
              <td>{vehicle.vehicleMake}</td>
              <td>{vehicle.vehicleModel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
