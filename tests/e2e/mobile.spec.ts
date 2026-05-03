import { expect, test } from "@playwright/test";

/**
 * Mobile masterclass end-to-end coverage (Expo web build).
 *
 * Flow: bootstrap a fresh device → browse → complete a quiz → onboard a
 * display name → confirm XP/level/streak/badges in Profile → open the
 * Achievements screen → open the Leaderboard and confirm the self row is
 * highlighted.
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

    // Switch to the Learn tab and open the first lesson.
    await page.getByRole("button", { name: /^Learn$/ }).click();
    const lesson = page
      .getByRole("button")
      .filter({ hasText: /Lesson|Introduction|Getting Started/i })
      .first();
    await expect(lesson).toBeVisible();
    await lesson.click();

    // Drive the quiz. Strategy: every question in a round receives the
    // same option index. Wrong questions get queued for retry; on the
    // next round, increment the option index. Quiz options are at most
    // 4, so within ≤4 retry rounds every question lands on its correct
    // answer (the queue only contains questions still unanswered).
    const checkBtn = page.getByTestId("quiz-check");
    const nextBtn = page.getByTestId("quiz-next");
    const retryBtn = page.getByTestId("quiz-retry");

    let roundOption = 0;
    for (let round = 0; round < 5; round++) {
      // Answer every question currently in the queue this round.
      for (let q = 0; q < 12; q++) {
        if (!(await checkBtn.isVisible().catch(() => false))) break;
        // Try the chosen option, falling back to lower indices if the
        // current one isn't rendered (questions can have <4 options).
        let picked = false;
        for (let o = roundOption; o >= 0 && !picked; o--) {
          const opt = page.getByTestId(`quiz-option-${o}`);
          if (await opt.isVisible().catch(() => false)) {
            await opt.click();
            picked = true;
          }
        }
        await checkBtn.click();
        await nextBtn.click();
      }
      // Round complete: either retry missed questions or we're done.
      if (await retryBtn.isVisible().catch(() => false)) {
        await retryBtn.click();
        roundOption += 1;
      } else {
        break;
      }
    }

    // Display-name onboarding modal — first XP gain triggers it.
    const nameInput = page.getByTestId("display-name-input");
    await expect(nameInput).toBeVisible({ timeout: 10_000 });
    await nameInput.fill(playerName);
    await page.getByTestId("display-name-save").click();
    await expect(nameInput).toBeHidden({ timeout: 5_000 });

    // Profile tab should reflect concrete XP/level/streak gains.
    await page.getByRole("button", { name: /^Profile$/ }).click();
    const totalXpCard = page.getByText(/Total XP/i).first();
    await expect(totalXpCard).toBeVisible();
    // Concrete XP > 0 assertion: an "N XP" label must be rendered with a
    // non-zero number somewhere on the profile screen.
    await expect(page.getByText(/\b[1-9]\d*\s*XP\b/).first()).toBeVisible();
    // Streak value of at least 1 day after the first completion today.
    await expect(page.getByText(/\b1d\b|\b1\s*day/i).first()).toBeVisible();

    // Achievements screen via the profile entry point.
    const seeAll = page.getByTestId("see-all-achievements");
    await expect(seeAll).toBeVisible();
    await seeAll.click();
    await expect(page.getByText(/unlocked/i).first()).toBeVisible();
    await expect(page.getByText(/Level/).first()).toBeVisible();
    await expect(page.getByText(/Lessons/).first()).toBeVisible();
    await expect(page.getByText(/Streak/).first()).toBeVisible();
    await page.goBack();

    // Leaderboard tab — confirm the list, the self row, and the saved name.
    await page.getByRole("button", { name: /^Ranks$/ }).click();
    await expect(page.getByTestId("leaderboard-list")).toBeVisible();

    // Wait out the debounced background sync (≤2s typical) and reload
    // the board if needed so the self row appears.
    await expect
      .poll(
        async () => {
          if ((await page.getByTestId("leaderboard-row-self").count()) > 0) {
            return 1;
          }
          await page.reload({ waitUntil: "domcontentloaded" }).catch(() => {});
          await page
            .getByRole("button", { name: /^Ranks$/ })
            .click()
            .catch(() => {});
          return await page.getByTestId("leaderboard-row-self").count();
        },
        { timeout: 20_000, intervals: [1_500, 2_000, 3_000] },
      )
      .toBeGreaterThan(0);

    const selfRow = page.getByTestId("leaderboard-row-self");
    await expect(selfRow).toBeVisible();
    await expect(selfRow).toContainText(playerName);
    await expect(selfRow).toContainText(/XP/i);
  });
});
