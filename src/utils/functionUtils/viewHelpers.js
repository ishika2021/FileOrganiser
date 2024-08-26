import { getFolderByID } from "./folderHelpers";
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
      obj.files.forEach((fileID) => {
        const fileObj = parent.files.find(({ id }) => id === fileID);
        result.push(fileObj);
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
