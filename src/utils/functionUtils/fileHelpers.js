import { v4 as uuidv4 } from "uuid";

export const fileConverter = async (newFiles, allFiles) => {
  const allFileNames = allFiles.map((file) => file.name);
  newFiles = Array.from(newFiles);
  const formatFile = fileOperations(allFileNames);

  const fileUploadPromises = newFiles.map((file) => formatFile(file));
  const filePaths = await Promise.all(fileUploadPromises);
  return filePaths;
};

const fileOperations = (allFileNames) => {
  const updatedAllFileName = [...allFileNames];

  const inner = (file) => {
    const name = generateUniqueFileName(file.name, updatedAllFileName);
    const size = formatFileSize(file.size);
    const { type, label } = formatFileType(file.name);
    const category = type === "image" ? "image" : "file";
    const createdAt = getCurrentDateTime();

    updatedAllFileName.push(name); //added for the case: when two similar name files are being uploaded

    const convertedObj = {
      id: "F-" + uuidv4(),
      name: name,
      size: size,
      type: type,
      label: label,
      category: category,
      createdAt: createdAt,
    };

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

// returns unique name for the file
const generateUniqueFileName = (currentFileName, allFileNames) => {
  if (!allFileNames.length) {
    return currentFileName;
  }
  return ensureUniqueFileName(currentFileName, allFileNames);
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
const getCurrentDateTime = () => {
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
