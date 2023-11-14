import { toggle } from "./items.js";
import Item from "../../models/item.js";

jest.mock("../../models/item.js");

describe("toggle", () => {
  it("should toggle the value", async () => {
    let myItem = { save: () => {} };
    Item.findById.mockResolvedValue(myItem);
    await toggle("1");

    expect(Item.findById).toHaveBeenCalledWith("1");
  });
});
