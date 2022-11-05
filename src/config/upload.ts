import multer from "multer";
import path from "path";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileNameCorrect = validateFile(file.originalname)

      return callback(null, fileNameCorrect)
    },
  }),
};

const validateFile = (fileName: string) => {
  let fileWithNoExtension = fileNameWithOutExtension(fileName)

  let fileWithNoSpecialCharacters = removeSpecialCharacters(fileWithNoExtension)

  let fileExtensionOnly = separateTheFilenameExtension(fileName)

  return fileWithNoSpecialCharacters + fileExtensionOnly
}

export const fileNameWithOutExtension = (fileName: string) => {
  let string = fileName.split(".")
 
  string.pop()
  
  return string.join(".")
}

const removeSpecialCharacters = (fileName: string) => {
  const fileWithNoSpecialCharacters = []
  const dotSeparatedFilename = fileName.split(".")

  dotSeparatedFilename.map((elem) => {
    fileWithNoSpecialCharacters.push(elem.replace(/[^a-zA-Z0-9 ]/g, ""))
  })

  return fileWithNoSpecialCharacters.join(".")
}

const separateTheFilenameExtension = (fileName: string) => {
  let string = fileName.split(".")

  return `.${string.pop()}` 
}