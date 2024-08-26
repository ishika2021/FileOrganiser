import { getCurrentDateTime } from "@/utils/functionUtils/fileHelpers";

export const getRecentFilePayload = (file) => {
  if (!file) {
    return;
  }
  file.modifiedAt = getCurrentDateTime();
  return file;
};

// returns clicked folder as new breadcrumb
export const getNewBreadcrumb = (allBreadcrumbs, folder, view) => {
  const lastTitlePath = allBreadcrumbs[allBreadcrumbs.length - 1].path;
  const path =
    lastTitlePath === "/"
      ? "/" + folder.name
      : lastTitlePath + "/" + folder.name;

  const obj = {
    title: folder.name,
    path: path,
    id: folder.id,
  };

  const payload = {
    page: view.toLowerCase(),
    breadcrumb: obj,
  };

  return payload;
};
