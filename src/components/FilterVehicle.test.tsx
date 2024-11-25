import { render, screen, within } from "@testing-library/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import FilterVehicle from "./FilterVehicle";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation");

const mockedUseSearchParams = jest.mocked(useSearchParams);
const mockedUseRouter = jest.mocked(useRouter);
const mockedUsePathname = jest.mocked(usePathname);

describe("FilterVehicle", () => {
  it("should use the search parameters to pre-select makes and models", async () => {
    const { mockSearchParams } = setup({
      mockSearchParams: {
        get: jest.fn().mockReturnValueOnce("Audi").mockReturnValueOnce("A4"),
      },
    });

    const selectMake = screen.getByLabelText("Select Make");
    const selectModel = screen.getByLabelText("Select Model");

    expect(selectMake).toHaveValue("Audi");

    expect(selectModel).not.toBeDisabled();
    expect(selectModel).toHaveValue("A4");
  });

  it("should handle invalid search parameters", async () => {
    setup({
      mockSearchParams: {
        get: jest
          .fn()
          .mockReturnValueOnce("InvalidMake")
          .mockReturnValueOnce("InvalidModel"),
      },
    });

    const selectMake = screen.getByLabelText("Select Make");
    const selectModel = screen.getByLabelText("Select Model");

    expect(selectMake).toHaveValue("");
    expect(selectModel).toHaveValue("");
  });

  it("should handle selecting a make", async () => {
    const { user, mockRouter } = setup();

    await user.selectOptions(screen.getByLabelText("Select Make"), "Audi");

    // update the URL with the selected make
    expect(mockRouter.replace).toHaveBeenCalledWith(
      expect.stringMatching(/vehicleMake=\w+$/)
    );
    // clear the selected model
    const selectModel = screen.getByLabelText("Select Model");
    expect(selectModel).toHaveValue("");
    expect(selectModel).not.toBeEmptyDOMElement();
  });

  it("should handle selecting a model", async () => {
    const { user, mockRouter } = setup();
    await user.selectOptions(screen.getByLabelText("Select Make"), "Audi");

    await user.selectOptions(screen.getByLabelText("Select Model"), "A4");

    // update the URL with the selected model
    expect(mockRouter.replace).toHaveBeenCalledWith(
      expect.stringMatching(/vehicleModel=\w+$/)
    );
  });

  /**
   * Sets up the test environment for the `FilterVehicle` component.
   * Resets and mocks the `usePathname`, `useRouter`, and `useSearchParams` hooks.
   * Returns an object containing the mocked search parameters, mocked router,
   * user event setup, and rendered component.
   */
  function setup(
    overrides: {
      mockSearchParams?: Partial<URLSearchParams>;
    } = {}
  ) {
    const { mockSearchParams: { get = jest.fn() } = {} } = overrides;

    // reset the mocked objects
    mockedUsePathname.mockReset();
    mockedUseRouter.mockReset();
    mockedUseSearchParams.mockReset();

    const mockSearchParams: Partial<URLSearchParams> = {
      get,
      toString: () => "",
    };
    mockedUseSearchParams.mockReturnValue(
      forceInstanceToType<ReturnType<typeof useSearchParams>>(mockSearchParams)
    );

    const mockRouter = {
      replace: jest.fn(),
    };
    mockedUseRouter.mockReturnValue(
      forceInstanceToType<ReturnType<typeof useRouter>>(mockRouter)
    );

    mockedUsePathname.mockReturnValue("/");

    return {
      mockSearchParams,
      mockRouter,
      user: userEvent.setup(),
      ...render(<FilterVehicle />),
    };
  }

  function forceInstanceToType<T>(value: unknown): T {
    return value as T;
  }
});
