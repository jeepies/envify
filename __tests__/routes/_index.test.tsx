import { test, expect } from "bun:test";
import { screen, render } from "@testing-library/react";

import Index from "~/routes/_index";

test("Can use Testing Library", () => {
  render(Index());
  const text = screen.getByText("testing works");
  expect(text).toBeInTheDocument();
});
