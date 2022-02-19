describe("addItemForm", () => {
  it("base example, visually looks correct", async () => {
    await page.goto(
      "http://localhost:6006/?path=/story/project-additemform-component--add-item-form-example"
    );
    const image = await page.screenshot();

    expect(image).toMatchInlineSnapshot();
  });
});
