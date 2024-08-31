import { getCurrentDateTime } from "@/utils/functionUtils/fileHelpers";

export const getRecentFilePayload = (file) => {
  if (!file) {
    return;
  }
  file.modifiedAt = getCurrentDateTime();
  return file;
};
