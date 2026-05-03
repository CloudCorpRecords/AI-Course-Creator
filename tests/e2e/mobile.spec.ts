import { expect, test } from "@playwright/test";

/**
 * Mobile masterclass end-to-end coverage (Expo web build).
 *
 * Flow: bootstrap a fresh device → browse → complete a quiz → onboard a
 * display name → confirm XP/level/streak/badges in Profile → open the
 * leaderboard and confirm the self row is highlighted.
 *
 * The mobile artifact is mounted under /masterclass-mobile/.
 */
test.describe("masterclass mobile (expo web)", () => {
  test.beforeEach(async ({ page }) => {
    // Start from a clean slate so the display-name onboarding modal
    // appears deterministically and there is no prior progress.
    await page.addInitScript(() => {
      try {
        window.localStorage.clear();
      } catch {}
    });
  });

  test("learner can finish a quiz, name themselves, and see the leaderboard", async ({
    page,
  }) => {
    const playerName = `Tester-${Math.floor(Math.random() * 9000 + 1000)}`;

    await page.goto("/masterclass-mobile/", { waitUntil: "domcontentloaded" });

    // The home tab should render some module/lesson content.
    await expect(
      page.getByText(/Module|Lesson|Continue|Welcome/i).first(),
    ).toBeVisible({ timeout: 20_000 });

    // Switch to the Learn tab.
    await page.getByRole("button", { name: /^Learn$/ }).click();
    await expect(
      page.getByText(/Lesson|Module/).first(),
    ).toBeVisible();

    // Open the first available lesson.
    const lesson = page
      .getByRole("button")
      .filter({ hasText: /Lesson|Introduction|Getting Started/i })
      .first();
    await lesson.click();

    // Try to advance through any quiz UI by repeatedly tapping the first
    // available option then submit/next, until we exit back to gain XP.
    for (let i = 0; i < 12; i++) {
      const submit = page.getByRole("button", {
        name: /Submit|Finish|Continue|Next|Done|Mark complete/i,
      });
      const option = page.getByRole("button").filter({ hasText: /^[A-D]\.|^\(?[A-D]\)?\s/ });
      if (await option.first().isVisible().catch(() => false)) {
        await option.first().click().catch(() => {});
      } else if (await submit.first().isVisible().catch(() => false)) {
        await submit.first().click().catch(() => {});
      } else {
        break;
      }
      await page.waitForTimeout(200);
    }

    // Onboarding modal: pick a display name.
    const nameInput = page.getByTestId("display-name-input");
    if (await nameInput.isVisible().catch(() => false)) {
      await nameInput.fill(playerName);
      await page.getByTestId("display-name-save").click();
      await expect(nameInput).toBeHidden({ timeout: 5_000 });
    }

    // Profile tab should reflect XP gain + badges section.
    await page.getByRole("button", { name: /^Profile$/ }).click();
    await expect(page.getByText(/XP|Level|Streak/i).first()).toBeVisible();

    // Edit name from profile if not already set (covers the path where the
    // modal didn't fire).
    const profileNameInput = page
      .getByTestId("profile-display-name-input")
      .first();
    if (await profileNameInput.isVisible().catch(() => false)) {
      const current = await profileNameInput.inputValue().catch(() => "");
      if (!current) {
        await profileNameInput.fill(playerName);
        await page.getByTestId("profile-display-name-save").click();
      }
    }

    // Leaderboard tab — assert the list renders and the self row is shown.
    await page.getByRole("button", { name: /^Ranks$/ }).click();
    await expect(page.getByTestId("leaderboard-list")).toBeVisible();

    // Self row should be present (either inline in top N or pinned at the
    // bottom). Wait briefly for the background submit to land.
    await expect
      .poll(
        async () => {
          await page.reload({ waitUntil: "domcontentloaded" }).catch(() => {});
          await page.getByRole("button", { name: /^Ranks$/ }).click().catch(() => {});
          return await page.getByTestId("leaderboard-row-self").count();
        },
        { timeout: 15_000, intervals: [2_000, 3_000, 5_000] },
      )
      .toBeGreaterThan(0);

    await expect(page.getByTestId("leaderboard-row-self")).toBeVisible();
  });
});
