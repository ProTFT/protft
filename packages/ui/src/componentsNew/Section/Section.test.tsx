import { fireEvent } from "@testing-library/dom";
import { act } from "@testing-library/react";
import { Button } from "../../components/Dropdown/Dropdown.styled";
import { render } from "../../test/render";
import { Section, SectionProps } from "./Section";

const setup = (props?: React.PropsWithChildren<SectionProps>) =>
  render(<Section {...props}></Section>);

describe("DS - Section", () => {
  it("should render title", () => {
    const screen = setup({ title: "Title" });
    const title = screen.getByText("Title");
    expect(title).toBeInTheDocument();
  });

  it("should render icon", () => {
    const screen = setup({ icon: <p>IconText</p> });
    const icon = screen.getByText("IconText");
    expect(icon).toBeInTheDocument();
  });

  it("should render extra controls if passed", () => {
    const screen = setup({ extraControls: <Button>TestButton</Button> });
    const button = screen.getByText("TestButton");
    expect(button).toBeInTheDocument();
  });

  it("should render section body when it's open", async () => {
    const screen = setup({ children: <p>Random content</p> });
    const toggleButton = screen.getByTestId("section-open-button");
    const bodyContent = screen.getByText("Random content");
    screen.debug();
    expect(bodyContent).toBeVisible();
    await act(async () => {
      await fireEvent.click(toggleButton);
    });
    expect(bodyContent).not.toBeVisible();
    expect(toggleButton).toBeInTheDocument();
  });
});
