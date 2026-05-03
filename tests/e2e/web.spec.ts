import { expect, test } from "@playwright/test";

/**
 * Web masterclass end-to-end coverage.
 *
 * Flow: open the home page → enter the first lesson → mark it complete →
 * open the command palette → search → navigate to a search result.
 */
test.describe("masterclass web", () => {
  test("learner can complete a lesson and use the command palette", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Sidebar contains lesson navigation. The first lesson button should be
    // clickable and route us to /lesson/<id>.
    const firstLesson = page
      .locator("nav, aside")
      .first()
      .getByRole("button")
      .filter({ hasText: /Introduction|Getting Started|Welcome|1\./i })
      .first();
    await expect(firstLesson).toBeVisible();
    await firstLesson.click();
    await expect(page).toHaveURL(/\/lesson\//);

    // Mark lesson complete via the bottom CTA, with a fallback to the
    // sticky top-bar button if the bottom one is offscreen.
    const bottomComplete = page.getByRole("button", {
      name: /Mark Lesson Complete|Mark Complete/i,
    });
    await bottomComplete.first().click();
    await expect(
      page.getByRole("button", { name: /Completed/i }).first(),
    ).toBeVisible();

    // Open the command palette (Ctrl+K / Cmd+K).
    await page.keyboard.press("Control+KeyK");
    const search = page.getByPlaceholder(/Search lessons by title/i);
    await expect(search).toBeVisible();

    await search.fill("intro");
    const firstResult = page
      .getByRole("option")
      .or(page.getByRole("button"))
      .filter({ hasText: /intro/i })
      .first();
    await expect(firstResult).toBeVisible();
    await firstResult.click();

    await expect(page).toHaveURL(/\/lesson\//);
    await expect(search).toBeHidden();
  });
});
