import { fireEvent } from "@testing-library/dom";
import { render } from "../../test/render";
import { TabHeader, TabHeaderProps } from "./TabHeader";

const setup = (props?: Partial<TabHeaderProps>) =>
  render(
    <TabHeader
      options={[
        {
          id: 0,
          name: "Option1",
        },
      ]}
      selectedOption={0}
      setSelectedOption={jest.fn()}
      {...props}
    />
  );

describe("Tab Header", () => {
  it("should render the tab titles", () => {
    const screen = setup({
      options: [
        { id: 1, name: "Option1" },
        { id: 2, name: "Option2" },
      ],
    });
    expect(screen.getByText("Option1")).toBeInTheDocument();
    expect(screen.getByText("Option2")).toBeInTheDocument();
  });

  it("on click, should select different tab", async () => {
    const setSelectedOptionSpy = jest.fn();
    const optionToSelect = { id: 2, name: "Option2" };
    const screen = setup({
      options: [{ id: 1, name: "Option1" }, optionToSelect],
      selectedOption: 1,
      setSelectedOption: setSelectedOptionSpy,
    });
    const tab = screen.getByText(optionToSelect.name);
    await fireEvent.click(tab);
    expect(setSelectedOptionSpy).toHaveBeenCalledWith(optionToSelect.id);
  });
});
