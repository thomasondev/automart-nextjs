export interface SelectVehicleMakeProps {
  options: { value: string; text: string }[];
  value: string | null;
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
}

export default function AutomartSelect({
  options,
  value,
  placeholder,
  onChange,
  label,
  id,
}: SelectVehicleMakeProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <label htmlFor={id} className="form-control w-full">
      <div className="label">
        <span className="label-text text-lg"> {label}</span>
      </div>
      <select
        id={id}
        value={value ?? ""}
        onChange={handleOnChange}
        className="select select-bordered"
        disabled={options.length === 0}
      >
        <option disabled value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </label>
  );
}
