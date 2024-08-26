const handleActionMenu = (menu, showMenu, isCutCopy, view) => {
  if (view === "Folders") {
    if (showMenu) {
      menu.map((menuItem) => {
        if (menuItem.name === "Paste") {
          //Can't paste when cut/copy state is empty
          menuItem.isActive = false;
        } else {
          menuItem.isActive = true;
        }
      });
    } else if (isCutCopy) {
      menu.map((menuItem) => {
        if (menuItem.name === "Paste") {
          //Only paste can stay active when no item is selected (if cut/copy state isn't empty)
          menuItem.isActive = true;
        } else {
          menuItem.isActive = false;
        }
      });
    } else {
      menu.map((menuItem) => (menuItem.isActive = false));
    }
  } else if (view === "Recent") {
    if (showMenu) {
      menu.map((menuItem) => {
        //Recent Files can only be renamed or deleted
        if (menuItem.name === "Rename" || menuItem.name === "Delete") {
          menuItem.isActive = true;
        } else {
          menuItem.isActive = false;
        }
      });
    }
  }
};

const getMenuItemState = (menu, item) => {
  return menu.find(({ name }) => name === item).isActive;
};

export { handleActionMenu, getMenuItemState };
