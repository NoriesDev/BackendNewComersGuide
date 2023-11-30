import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${Date.now()}${extension}`);
  },
});
    
// const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  
  const extension = path.extname(file.originalname);
  const fileTypes = ['.docx', '.pptx', '.xlsx', '.pdf', '.htm', '.html', '.txt', '.xlf', '.xliff'];
  const errorMessage = `Invalid file in your upload. Valid extensions are ${fileTypes.join(', ')}.`;

//   mime types
//   .docx	 application/vnd.openxmlformats-officedocument.wordprocessingml.document

//   .pptx 	application/vnd.openxmlformats-officedocument.presentationml.presentation
 
//   .xlsx	application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

//   .pdf	application/pdf

// .htm / .html  text/html

// .txt	text/plain

// xlf / xliff   not found
  return fileTypes.includes(extension.toLowerCase())
    ? cb(null, true)
    : cb(new Error(errorMessage));
};

const upload= multer({
  storage, fileFilter, limits: {fileSize: 1024 * 1024 * 8  }
});

export default upload;