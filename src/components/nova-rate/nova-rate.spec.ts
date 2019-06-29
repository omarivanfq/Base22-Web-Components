import { NovaRate } from "./nova-rate";

describe("Nova Rate Set Value handler", () => {
  const novaRate = new NovaRate();

  // Case 1
  it("Clears if allowClear is true AND value equal newValue", () => {
    novaRate.value = 3;
    novaRate.handleSetValue(3);

    expect(novaRate.value).toEqual(0);
  });

  // Case 2
  it("Value is 0 when value is negative", () => {
    novaRate.handleSetValue(-1);
    expect(novaRate.value).toEqual(0);
  });

  // Case 3
  it("returns count when value is more than count (default is 5)", () => {
    novaRate.count = 8;
    novaRate.handleSetValue(10);

    expect(novaRate.value).toEqual(novaRate.count);
  });

  // Case 4
  it("Won't change or clear if allowClear is false", () => {
    novaRate.value = 3;
    novaRate.allowClear = false;
    novaRate.handleSetValue(3);

    expect(novaRate.value).toEqual(3);
  });

  // Case 5
  it("Changes value", () => {
    novaRate.value = 2;
    novaRate.allowClear = false;
    novaRate.handleSetValue(3);

    expect(novaRate.value).toEqual(3);
  });

  // Case 6
  it("Won't change if value is string", () => {
    novaRate.value = 2;
    novaRate.handleSetValue("$%&/");

    expect(novaRate.value).toEqual(2);
  });

  it("Won't change if value is boolean", () => {
    novaRate.value = 2;
    novaRate.handleSetValue(true);

    expect(novaRate.value).toEqual(2);
  });
});
