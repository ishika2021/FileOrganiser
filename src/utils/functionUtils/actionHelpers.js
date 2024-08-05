import { v4 as uuidv4 } from "uuid";
import { getCurrentFolder } from "./folderHelpers.js";
import _ from "lodash";

export const handlePaste = (rootDirectory, currentFolder, pasteObject) => {
  const { items, operation, parentID } = pasteObject;
  const parentFolder = getCurrentFolder(parentID, rootDirectory);
  const newParentID = currentFolder.id;

  items.forEach((item) => {
    const type = item.charAt(0);
    if (type === "F") {
      const file = parentFolder.files.find(({ id }) => id === item);
      const copiedFile = _.cloneDeep(file);
      const newFileID = "F-" + uuidv4();

      copiedFile.id = newFileID;
      copiedFile.parentID = newParentID;
      if (operation === "cut") {
        parentFolder.files = parentFolder.files.filter(
          ({ id }) => id !== file.id
        );
      }
      currentFolder.files.push(copiedFile);
    } else if (type === "D") {
      const folder = parentFolder.children.find(({ id }) => id === item);
      const copiedFolder = _.cloneDeep(folder);
      const newFolderID = "D-" + uuidv4();
      copiedFolder.id = newFolderID;
      copiedFolder.parentID = newParentID;
      if (operation === "cut") {
        parentFolder.children = parentFolder.children.filter(
          ({ id }) => id !== folder.id
        );
      }
      currentFolder.children.push(copiedFolder);
    }
  });
};
