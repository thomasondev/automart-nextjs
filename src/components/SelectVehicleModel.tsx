interface SelectVehicleModelProps {
  vehicleModels: { id: number; name: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectVehicleModel({
  vehicleModels,
  onChange,
  value,
}: SelectVehicleModelProps) {
  return (
    <select
      className="select"
      value={value}
      disabled={vehicleModels.length === 0}
      onChange={onChange}
    >
      <option disabled value="">
        Select a model
      </option>
      {vehicleModels.map((vehicleModel) => (
        <option key={vehicleModel.id} value={vehicleModel.name}>
          {vehicleModel.name}
        </option>
      ))}
    </select>
  );
}
