import { describe, expect, it } from "vitest";
import { formatPrice } from "./format";
import { isInStock } from "./rules";

describe("règles produit", () => {
  it("détecte un produit disponible", () => {
    expect(isInStock({ stock: 3 })).toBe(true);
    expect(isInStock({ stock: 0 })).toBe(false);
  });

  it("formate un prix en euro français", () => {
    expect(formatPrice(24.9)).toBe("24,90 €");
  });
});
