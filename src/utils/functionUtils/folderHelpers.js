export const transformDuplicateFolderName = (name, folders) => {
  const allFolderNames = folders.map((folder) => folder.name);
  const result = checkEquality(name, allFolderNames);
  return result;
};

const checkEquality = (target, currentNames) => {
  if (!currentNames.includes(target)) {
    return target;
  }
  const match = target.match(/\d+$/);
  if (match) {
    // if the name already has a number at end, increment it
    const num = parseInt(match[0], 10) + 1;
    const index = match["index"];
    target = target.slice(0, index) + num;
  } else {
    target = target + "_2";
  }
  return checkEquality(target, currentNames);
};

export const getCurrentFolder = (folderName, folders) => {
  if (folderName === "Home") {
    return folders;
  }
  //  check if the folder exists in the home directory, if yes directly return its children
  const result = folders.filter((folder) => folder.name === folderName);
  if (result.length > 0) {
    return result[0];
  } else {
    const res = findFolder(folderName, folders);
    return res;
  }
};

const findFolder = (target, folders) => {
  // iterate through folders if any folder name is equall to target then return that folder
  for (const element of folders) {
    const folder = element;
    if (folder.name === target) {
      return folder;
    } else {
      return findFolder(target, folder.children);
    }
  }
};
