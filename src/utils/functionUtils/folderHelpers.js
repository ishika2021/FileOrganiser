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

export const getCurrentFolder = (folderID, folders) => {
  if (folderID === "00") {
    return folders;
  }
  //  check if the folder exists in the home directory, if yes directly return its children
  const result = folders.children.filter((folder) => folder.id === folderID);
  if (result.length > 0) {
    return result[0];
  } else {
    const res = findFolder(folderID, folders.children);
    return res;
  }
};

const findFolder = (target, folders) => {
  // if target id is found return the folder, else look in its children for the target
  for (const element of folders) {
    const folder = element;
    if (folder.id === target) {
      return folder;
    } else if (folder.children.length > 0) {
      const found = findFolder(target, folder.children);
      if (found) {
        // return only if the target is found in children otherwise the loop will not iterate through the siblings
        return found;
      }
    }
  }
  // if target not found in folders
  return null;
};
