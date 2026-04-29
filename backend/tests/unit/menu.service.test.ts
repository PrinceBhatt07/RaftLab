import * as repo from "../../src/modules/menu/menu.repository";
import { fetchMenu } from "../../src/modules/menu/menu.service";

jest.mock("../../src/modules/menu/menu.repository");

describe("Menu Service", () => {
  it("should return menu items", async () => {
    const mockData = [
      { id: "1", name: "Pizza", price: 200 }
    ];

    (repo.getMenuItems as jest.Mock).mockResolvedValue(mockData);

    const result = await fetchMenu();

    expect(result).toEqual(mockData);
    expect(repo.getMenuItems).toHaveBeenCalled();
  });
});