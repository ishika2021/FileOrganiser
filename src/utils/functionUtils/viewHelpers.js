import { generateUniqueFileName } from "./fileHelpers";
import { generateUniqueFolderName, getFolderByID } from "./folderHelpers";
export const addToRecent = (file, recent) => {
  if (file && recent) {
    const fileParent = file.parentID;
    const result = recent.find(({ parent }) => parent === fileParent);
    if (result) {
      const fileResult = result.files.find((id) => id === file.id);
      //  file shouldn't be added twice
      if (!fileResult) {
        result.files.push(file.id);
      }
    } else {
      recent.push({ parent: fileParent, files: [file.id] });
    }
  }

  return recent;
};

export const getRecentFiles = (recent, rootDirectory) => {
  let result = [];
  recent.forEach((obj) => {
    const parent = getFolderByID(obj.parent, rootDirectory);
    if (parent) {
      obj.files?.forEach((fileID) => {
        const fileObj = parent.files.find(({ id }) => id === fileID);
        if (fileObj) {
          result.push(fileObj);
        }
      });
    }
  });

  result = result.filter(({ trash }) => !trash);
  // Sort the recent files in decresing order of timestamp
  result.sort(
    (a, b) =>
      convertDateTimeFormat(b.modifiedAt) - convertDateTimeFormat(a.modifiedAt)
  );
  return result;
};

const convertDateTimeFormat = (timestamp) => {
  const [date, time] = timestamp.split(" ");
  const [day, month, year] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  return new Date(year, month - 1, day, hours, minutes); //month starts from index 0
};

export const addToTrash = (item, trash) => {
  if (item && trash) {
    const itemParent = item.parentID;
    const result = trash.find(({ parent }) => parent === itemParent);

    if (result) {
      const isItemPresent = result.content.find((id) => id === item.id);
      if (!isItemPresent) {
        result.content = [...result.content, ...item.toBeDeleted];
      }
    } else {
      trash.push({ parent: itemParent, content: [...item.toBeDeleted] });
    }
  }

  return trash;
};

export const getTrashedContent = (trash, rootDirectory) => {
  const result = {
    folders: [],
    files: [],
  };
  trash.forEach((obj) => {
    const parent = getFolderByID(obj.parent, rootDirectory);
    if (parent) {
      obj.content.forEach((contentID) => {
        const type = contentID.split("-")[0];
        if (type === "D") {
          const directory = parent.children.find(({ id }) => contentID === id);
          result.folders.push(directory);
        } else if (type === "F") {
          const file = parent.files.find(({ id }) => contentID === id);
          result.files.push(file);
        }
      });
    }
  });

  return result;
};

export const restoreItem = (item, trash, rootDirectory) => {
  // remove item from trash content after restore
  const parentID = item.parentID;
  const obj = trash.find(({ parent }) => parent === parentID);
  obj.content = obj.content.filter((id) => item.id !== id);

  const parent = getFolderByID(parentID, rootDirectory);
  modifyRestoreItem(item, parent);

  // update trash flag to add it back to folder view
  item.trash = false;
};

export const restoreAllItems = (trash, rootDirectory) => {
  trash.forEach((obj) => {
    const parentID = obj.parent;
    const parent = getFolderByID(parentID, rootDirectory);
    obj.content.forEach((contentID) => {
      const type = contentID.split("-")[0];
      let item = {};
      if (type === "D") {
        item = parent.children.find(({ id }) => id === contentID);
      } else if (type === "F") {
        item = parent.files.find(({ id }) => id === contentID);
      }
      modifyRestoreItem(item, parent);
      item.trash = false;
    });
  });

  return [];
};

const modifyRestoreItem = (item, parent) => {
  // If an item with the same name as restored item is present at parent folder, update item's name
  const type = item.id.split("-")[0];
  if (type === "D") {
    const allFolderNames = parent.children
      .filter(({ trash }) => !trash)
      .map(({ name }) => name);
    const newName = generateUniqueFolderName(item.name, allFolderNames);
    item.name = newName;
  } else if (type === "F") {
    const allFileNames = parent.files
      ?.filter(({ trash }) => !trash)
      .map(({ name }) => name);
    const newName = generateUniqueFileName(item.name, allFileNames);
    item.name = newName;
  }
};

// Permanently deletes an item
export const deleteItem = (item, trash, rootDirectory) => {
  const parentID = item.parentID;
  const parentTrashObj = trash.find(({ parent }) => parent === parentID);
  parentTrashObj.content = parentTrashObj.content.filter(
    (id) => id !== item.id
  );

  // removes the parent obj is content becomes empty
  if (!parentTrashObj.content.length) {
    trash = trash.filter(({ parent }) => parent !== parentID);
  }

  // delete the item from parent object
  const parent = getFolderByID(parentID, rootDirectory);
  const type = item.id.split("-")[0];
  if (type === "D") {
    parent.children = parent.children.filter((obj) => obj.id !== item.id);
  } else if (type === "F") {
    parent.files = parent.files.filter((obj) => obj.id !== item.id);
  }

  return trash;
};

// Permanently deletes all the items from trash view
export const deleteAll = (trash, rootDirectory) => {
  trash.forEach((obj) => {
    const parentID = obj.parent;
    const parent = getFolderByID(parentID, rootDirectory);

    obj.content.forEach((id) => {
      const type = id.split("-")[0];
      if (type === "D") {
        parent.children = parent.children.filter((obj) => obj.id !== id);
      } else if (type === "F") {
        parent.files = parent.files.filter((obj) => obj.id !== id);
      }
    });
  });

  return []; //makes trash empty
};
