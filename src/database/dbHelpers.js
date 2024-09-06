import { getNewFolder } from "@/views/Folders/utils/functionHelper";
export const getDefaultFolders = () => {
  const folders = ["Document", "Images", "Important"];
  const currentFolder = {
    id: "root",
    children: [],
  };
  const result = [];
  folders.forEach((folder) => {
    const newFolder = getNewFolder(folder, currentFolder);
    result.push(newFolder);
  });
  return result;
};
