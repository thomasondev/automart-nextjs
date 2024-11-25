import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AutomartSelect, { type SelectVehicleMakeProps } from "./AutomartSelect";

describe("AutomartSelect", () => {
  it("should render options", () => {
    renderAutomartSelect({
      options: [
        { value: "A", text: "A" },
        { value: "B", text: "B" },
        { value: "C", text: "C" },
      ],
    });

    const select = screen.getByLabelText("select");
    const options = within(select).getAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveValue("");
    expect(options[1]).toHaveValue("A");
    expect(options[2]).toHaveValue("B");
    expect(options[3]).toHaveValue("C");
  });

  it("should call onChange", async () => {
    const onChange = jest.fn();
    renderAutomartSelect({
      onChange,
      options: [{ value: "A", text: "A" }],
    });

    const select = screen.getByLabelText("select");
    expect(select).toHaveValue("");

    await userEvent.selectOptions(select, "A");
    expect(onChange).toHaveBeenCalledWith("A");
  });

  it("should disable the select when options are empty", () => {
    renderAutomartSelect({
      options: [],
    });

    const select = screen.getByLabelText("select");
    expect(select).toBeDisabled();
  });
});

function renderAutomartSelect(
  configuration: Partial<SelectVehicleMakeProps> = {}
) {
  const {
    options = [],
    placeholder = "",
    value = null,
    onChange = jest.fn(),
    label = "select",
    id = "id",
  } = configuration;

  render(
    <AutomartSelect
      options={options}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      label={label}
      id={id}
    />
  );
}
