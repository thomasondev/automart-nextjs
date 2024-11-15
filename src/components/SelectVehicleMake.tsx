interface SelectVehicleMakeProps {
  options: { id: number; name: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectVehicleMake({ options, value, onChange }: SelectVehicleMakeProps) {
  return (
    <select className="select" value={value} onChange={onChange}>
      <option disabled value="">
        Select a make
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
