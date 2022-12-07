import { screen, render } from "@testing-library/react";
import Home from "../pages/index";

describe("Home Page", () => {
  it("should render homepage success", () => {
    render(<Home />);
  });
});
