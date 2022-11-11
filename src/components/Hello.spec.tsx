import { render, screen } from "@testing-library/react";
import { Hello } from "./Hello";

it("renders Hello World!", () => {
  render(<Hello />);
  const myElelment = screen.getByText(/Hello World!/);
  expect(myElelment).toBeInTheDocument();
});
