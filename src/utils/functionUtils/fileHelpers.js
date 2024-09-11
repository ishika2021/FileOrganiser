import { v4 as uuidv4 } from "uuid";

export const getCurrentFile = (fileID, rootDirectory) => {
  const result = rootDirectory.files.find(({ id }) => id === fileID);
  if (result) {
    return result;
  } else {
    const result = findFile(fileID, rootDirectory.children);
    return result;
  }
};

const findFile = (target, folders) => {
  for (const folder of folders) {
    const result = folder.files.find(({ id }) => id === target);
    if (result) {
      return result;
    } else {
      const found = findFile(target, folder.children);
      if (found) {
        return found;
      }
    }
  }
};

export const fileConverter = async (newFiles, allFiles, parentID) => {
  const allFileNames = allFiles.map((file) => file.name);
  newFiles = Array.from(newFiles);
  const formatFile = fileOperations(allFileNames);

  const fileUploadPromises = newFiles.map((file) => formatFile(file, parentID));
  const filePaths = await Promise.all(fileUploadPromises);
  return filePaths;
};

const fileOperations = (allFileNames) => {
  const updatedAllFileName = [...allFileNames];

  const inner = async (file, parentID) => {
    const splitedChars = file.name.split(".");
    const extension = splitedChars[splitedChars.length - 1];
    const name = generateUniqueFileName(file.name, updatedAllFileName);
    const size = formatFileSize(file.size);
    const { type, label } = formatFileType(file.name);
    const category = type === "image" ? "image" : "file";
    const createdAt = getCurrentDateTime();

    updatedAllFileName.push(name); //added for the case: when two similar name files are being uploaded

    const convertedObj = {
      id: "F-" + uuidv4(),
      name: name,
      extension: extension,
      size: size,
      type: type,
      label: label,
      category: category,
      createdAt: createdAt,
      modifiedAt: createdAt,
      recent: false,
      starred: false,
      trash: false,
      parentID: parentID,
    };

    const isImage = file.type.startsWith("image/");
    if (isImage) {
      const compressedImg = await compressImage(file);
      file = compressedImg;
      convertedObj.size = formatFileSize(file.size);
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        convertedObj["base64"] = reader.result;
        resolve(convertedObj);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return inner;
};

const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const MAX_WIDTH = 150;
        const MAX_HEIGHT = 90;
        const QUALITY = 0.7;
        const MIME_TYPE = file.type;

        const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT); //reduces img size

        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            const readerCompressed = new FileReader();
            readerCompressed.readAsDataURL(blob);

            readerCompressed.onload = () => {
              const compressedFile = new File([blob], file.name, {
                type: MIME_TYPE,
              });
              resolve(compressedFile);
            };
            readerCompressed.onerror = (error) => {
              reject(error);
            };
          },
          MIME_TYPE,
          QUALITY
        );
      };

      img.onerror = (error) => {
        reject(error);
      };
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

// Modifies the size of image according to it's height:width ratio
const calculateSize = (img, maxWidth, maxHeight) => {
  let imgWidth = img.width;
  let imgHeight = img.height;

  if (imgWidth > imgHeight) {
    if (imgWidth > maxWidth) {
      imgHeight = Math.round((imgHeight * maxWidth) / imgWidth);
      imgWidth = maxWidth;
    }
  } else {
    if (imgHeight > maxHeight) {
      imgWidth = Math.round((imgWidth * maxHeight) / imgHeight);
      imgHeight = maxHeight;
    }
  }
  return [imgWidth, imgHeight];
};

// returns unique name for the file
export const generateUniqueFileName = (targetName, allFileNames) => {
  if (!allFileNames.length) {
    return targetName;
  }
  return ensureUniqueFileName(targetName, allFileNames);
};

// check if the target name already exists and updates it
const ensureUniqueFileName = (target, currentNames) => {
  const [fileName, extension] = target.split(".");
  let isPresentCount = 0;

  currentNames.forEach((currentFileName) => {
    const baseName = currentFileName?.split(".")[0];
    if (fileName === baseName) {
      isPresentCount++;
    }
  });

  if (isPresentCount === 0) {
    return target;
  }

  const match = fileName.match(/\d+$/);
  if (match) {
    const num = parseInt(match[0], 10) + 1;
    const index = match["index"];
    target = `${fileName.slice(0, index)}${num}.${extension}`;
  } else {
    target = `${fileName}_2.${extension}`;
  }
  return ensureUniqueFileName(target, currentNames);
};

// returns the unit of uploaded file
const formatFileSize = (fileSize) => {
  fileSize = parseInt(fileSize);
  const sizeInKb = fileSize / 1024;
  if (sizeInKb > 1024) {
    return `${(sizeInKb / 1024).toFixed(0)} MB`;
  } else {
    return `${sizeInKb.toFixed(0)} KB`;
  }
};

// return the current date and time in DD-MM-YY HH:SS format
export const getCurrentDateTime = () => {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

// returs the type and label for file extension
const formatFileType = (filename) => {
  const extension = filename.split(".")[1];
  let type = "";
  let label = "";
  switch (extension) {
    case "xlsx":
      type = "excel";
      label = "Excel Worksheet";
      break;
    case "pdf":
      type = "pdf";
      label = "PDF Document";
      break;
    case "txt":
      type = "text";
      label = "Text Document";
      break;
    case "docx":
      type = "docx";
      label = "Word Document";
      break;
    default:
      type = "image";
      label = "Image";
  }

  return { type, label };
};
