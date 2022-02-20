describe("editableSpan", () => {
  it("editableSpan example, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=project-editable-component--editable-span-example&viewMode=story"
    );
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });
});
