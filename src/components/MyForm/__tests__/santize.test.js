import sanitize from "../sanitize";

describe("santize", () => {
  it("should strip whitespace", () => {
    expect(sanitize("  test  ")).toMatchSnapshot();
  })
})
