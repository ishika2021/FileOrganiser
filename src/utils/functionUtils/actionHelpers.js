import { v4 as uuidv4 } from "uuid";
import { getFolderByID, generateUniqueFolderName } from "./folderHelpers.js";
import { generateUniqueFileName } from "./fileHelpers.js";
import _ from "lodash";

export const handlePaste = (rootDirectory, currentFolder, pasteObject) => {
  const { items, operation, parentID } = pasteObject;
  const parentFolder = getFolderByID(parentID, rootDirectory);

  items.forEach((item) => {
    const type = item.charAt(0);
    if (type === "F") {
      // FILE
      const file = parentFolder.files.find(({ id }) => id === item);
      const trasformedFile = transformFileProperties(file, currentFolder);

      if (operation === "cut") {
        //remove the target from it's previous location
        parentFolder.files = parentFolder.files.filter(
          ({ id }) => id !== file.id
        );
      }
      currentFolder.files.push(trasformedFile);
    } else if (type === "D") {
      //DIRECTORY or FOLDER
      const folder = parentFolder.children.find(({ id }) => id === item);
      const transformedFolder = transformFolderProperties(
        folder,
        currentFolder
      );

      if (operation === "cut") {
        parentFolder.children = parentFolder.children.filter(
          ({ id }) => id !== folder.id
        );
      }
      currentFolder.children.push(transformedFolder);
    }
  });
};

// Changes the trash flag of the target
export const updateTrashFlag = (rootDirectory, trashObject) => {
  const { parentID, toBeDeleted } = trashObject;
  const parentFolder = getFolderByID(parentID, rootDirectory);

  toBeDeleted.forEach((item) => {
    const type = item.charAt(0);
    if (type === "F") {
      const res = parentFolder.files.find(({ id }) => id === item);
      res.trash = true;
    } else if (type === "D") {
      const res = parentFolder.children.find(({ id }) => id === item);
      res.trash = true;
    }
  });

  return parentFolder;
};

// transforms  target folder properties before pasting it on new location
const transformFolderProperties = (target, currentFolder) => {
  const newFolder = _.cloneDeep(target);

  const allSubFolderNames = currentFolder.children
    .filter(({ trash }) => !trash)
    .map((folder) => folder.name); //remove trashed folder names
  const newparentID = currentFolder.id;
  const newID = "D-" + uuidv4();
  const newName = generateUniqueFolderName(newFolder.name, allSubFolderNames); //to avoid dublicate name at new location

  newFolder.id = newID;
  newFolder.name = newName;
  newFolder.parentID = newparentID;
  newFolder.files.map((file) => {
    file.id = "F-" + uuidv4();
    file.parentID = newFolder.id;
  });
  generateUpdatedIDs(newFolder.id, newFolder.children);

  return newFolder;
};

// generated new IDs of subfolder and files of target folder
const generateUpdatedIDs = (parentID, folders) => {
  if (!folders.length) {
    return;
  }

  for (const folder of folders) {
    folder.id = "D" + uuidv4();
    folder.parentID = parentID;
    folder.files.map((file) => {
      file.id = "F-" + uuidv4();
      file.parentID = parentID;
    });
    generateUpdatedIDs(folder.id, folder.children);
  }
};

// transforms  target file properties before pasting it on new location
const transformFileProperties = (target, currentFolder) => {
  const newFile = _.cloneDeep(target);

  const allFileNames = currentFolder.files
    .filter(({ trash }) => !trash)
    .map((file) => file.name);
  const newID = "F-" + uuidv4();
  const newParentID = currentFolder.id;
  const newName = generateUniqueFileName(target.name, allFileNames);

  newFile.id = newID;
  newFile.parentID = newParentID;
  newFile.name = newName;

  return newFile;
};
