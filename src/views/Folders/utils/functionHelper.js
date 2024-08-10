import { generateUniqueFolderName } from "@/utils/functionUtils/folderHelpers";
import { generateUniqueFileName } from "@/utils/functionUtils/fileHelpers";
import { v4 as uuidv4 } from "uuid";

const getNewFolder = (targetName, currentFolder) => {
  const folderName = getNewFolderName(targetName, currentFolder.children);
  const obj = {
    id: "D-" + uuidv4(),
    name: folderName,
    children: [],
    files: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    starred: false,
    trash: false,
    parentID: currentFolder.id,
  };
  return obj;
};

const getNewFolderName = (targetName, allFolders) => {
  const name = targetName.length > 0 ? targetName : "New Folder";
  const allSubFolderNames =
    allFolders?.filter(({ trash }) => !trash).map((folder) => folder.name) ||
    [];
  const folderName = generateUniqueFolderName(name, allSubFolderNames);
  return folderName;
};

const getNewFileName = (targetName, allFiles) => {
  const allFileNames =
    allFiles?.filter(({ trash }) => !trash).map((file) => file.name) || [];
  const fileName = generateUniqueFileName(targetName, allFileNames);
  return fileName;
};

export { getNewFolder, getNewFolderName, getNewFileName };
