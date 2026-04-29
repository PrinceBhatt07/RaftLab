import * as repo from "./menu.repository";

export const fetchMenu = async () => {
  return repo.getMenuItems();
};