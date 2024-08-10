const handleActionMenu = (menu, showMenu, isCutCopy) => {
  if (showMenu) {
    menu.map((menuItem) => {
      if (menuItem.name === "Paste") {
        menuItem.isActive = false;
      } else {
        menuItem.isActive = true;
      }
    });
  } else if (isCutCopy) {
    menu.map((menuItem) => {
      if (menuItem.name === "Paste") {
        menuItem.isActive = true;
      } else {
        menuItem.isActive = false;
      }
    });
  } else {
    menu.map((menuItem) => (menuItem.isActive = false));
  }
};

const getMenuItemState = (menu, item) => {
  return menu.find(({ name }) => name === item).isActive;
};

export { handleActionMenu, getMenuItemState };
