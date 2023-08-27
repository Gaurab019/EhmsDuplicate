import { render, screen } from "@testing-library/react";
// import App from "./App";
import OPBillPreview from "./Components/OPBillPreview";

test("renders learn react link", () => {
  render(<OPBillPreview />);
  const linkElement = screen.getByText("OPBillPreview");
  expect(linkElement).toBeInTheDocument();
});
