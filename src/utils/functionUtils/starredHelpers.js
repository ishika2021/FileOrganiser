import { getFolderByID } from "./folderHelpers";

export const addToStarred = (item, starred) => {
  if (item && starred) {
    const parentID = item.parentID;
    const result = starred.find(({ parent }) => parent === parentID);
    if (result) {
      result.content.push(item.id);
    } else {
      starred.push({ parent: parentID, content: [item.id] });
    }

    item.starred = true;
  }
  return starred;
};

export const removeFromStarred = (item, starred) => {
  if (item && starred) {
    const parentID = item.parentID;
    const result = starred.find(({ parent }) => parent === parentID);
    if (result) {
      result.content = result.content.filter((id) => id !== item.id);
    }

    if (!result.content.length) {
      // removes the parent object from starred
      starred = starred.filter(({ parent }) => parent !== parentID);
    }

    item.starred = false;
  }

  return starred;
};

// remove item from starred after it is trashed
export const removeAllFromStarred = (starred, itemIDs) => {
  if (itemIDs.length && starred) {
    starred.forEach((obj) => {
      itemIDs.forEach((itemID) => {
        const index = obj.content.findIndex((id) => id === itemID);
        if (index >= 0) {
          obj.content.splice(index, 1);
        }
      });
    });
    starred = starred.filter(({ content }) => content.length);
  }

  return starred;
};

export const getStarredContent = (starred, rootDirectory) => {
  const result = {
    folders: [],
    files: [],
  };

  if (starred && rootDirectory) {
    starred.forEach((obj) => {
      const parentID = obj.parent;
      const parent = getFolderByID(parentID, rootDirectory);
      if (parent) {
        obj.content.forEach((itemID) => {
          const type = itemID.split("-")[0];
          if (type === "D") {
            const itemObj = parent.children.find(({ id }) => id === itemID);

            if (!itemObj.trash && itemObj.starred) {
              result.folders.push(itemObj);
            }
          } else if (type === "F") {
            const itemObj = parent.files.find(({ id }) => id === itemID);
            if (itemObj.starred && !itemObj.trash) {
              result.files.push(itemObj);
            }
          }
        });
      }
    });
  }

  return result;
};

export const getStarredContentFromFolder = (folderID, rootDirectory) => {
  const parent = getFolderByID(folderID, rootDirectory);
  const folders = parent.children.filter(({ trash }) => !trash);
  const files = parent.files.filter(({ trash }) => !trash);

  return {
    folders: folders,
    files: files,
  };
};
