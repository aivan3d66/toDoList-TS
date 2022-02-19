describe('addItemForm', () => {
  it('base example, visually looks correct', async () => {
    await page.goto();
    const image = await page.screenshot('http://localhost:6006/iframe.html?path=/story/project-additemform-component--add-item-form-example');

    expect(image).toMatchInlineSnapshot();
  })
})