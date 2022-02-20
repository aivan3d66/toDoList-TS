describe("app", () => {
  it("app example, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=project-app-component--app-example&viewMode=story"
    );
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });
});
