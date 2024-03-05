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
