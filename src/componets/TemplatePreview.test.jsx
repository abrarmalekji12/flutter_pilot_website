import { render, screen } from "@testing-library/react";
import TemplatePreview, { layoutShots } from "./TemplatePreview";

const phone = (url) => ({ url, aspect: 9 / 19.5 });
const wide = (url) => ({ url, aspect: 16 / 10 });

test("trio puts the middle screen last so it is drawn on top and keeps frames inside the card", () => {
  const shots = [phone("a"), phone("b"), phone("c")];
  const placed = layoutShots("trio", shots, 760, 380);
  expect(placed).toHaveLength(3);
  expect(placed[2].shot).toBe(shots[1]);
  placed.forEach((p) => {
    expect(p.cx - p.width / 2).toBeGreaterThanOrEqual(0);
    expect(p.cx + p.width / 2).toBeLessThanOrEqual(760);
    expect(p.cy + p.height / 2).toBeLessThanOrEqual(380);
  });
});

test("fan tilts outer frames and responsive pairs a wide and a tall screen", () => {
  const fan = layoutShots("fan", [phone("a"), phone("b"), phone("c"), phone("d")], 760, 380);
  expect(fan.some((p) => p.angle !== 0)).toBe(true);
  const responsive = layoutShots("responsive", [wide("w"), phone("p")], 760, 380);
  expect(responsive.map((p) => p.shot.url)).toEqual(["w", "p"]);
  expect(layoutShots("hero", [], 760, 380)).toEqual([]);
});

test("renders an accessible showcase", () => {
  render(<TemplatePreview name="Kyoto Wander" presentation={{ kind: "showcase", preset: "hero", backdrop: "ocean", shots: [phone("a")] }} />);
  expect(screen.getByRole("img", { name: /kyoto wander app screens/i })).toBeInTheDocument();
});
