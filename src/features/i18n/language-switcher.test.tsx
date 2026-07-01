import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LanguageSwitcher } from "./language-switcher";

describe("LanguageSwitcher", () => {
  it("change le cookie de langue au clic", async () => {
    const reloadPage = vi.fn();
    const user = userEvent.setup();

    render(
      <LanguageSwitcher
        labels={{ label: "Langue", fr: "FR", en: "EN" }}
        locale="fr"
        reloadPage={reloadPage}
      />,
    );

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(document.cookie).toContain("NEXT_LOCALE=en");
    expect(reloadPage).toHaveBeenCalledTimes(1);
  });
});
