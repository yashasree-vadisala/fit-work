import pdfParse from "pdf-parse";
import mammoth from "mammoth";

/**
 * Extracts plain text from an uploaded file buffer, based on its mimetype.
 * @param {Express.Multer.File} file
 * @returns {Promise<string>}
 */
export async function extractTextFromFile(file) {
  if (!file) throw badRequest("No file was provided.");

  switch (file.mimetype) {
    case "application/pdf": {
      const data = await pdfParse(file.buffer);
      return cleanText(data.text);
    }
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      const { value } = await mammoth.extractRawText({ buffer: file.buffer });
      return cleanText(value);
    }
    case "text/plain": {
      return cleanText(file.buffer.toString("utf-8"));
    }
    default:
      throw badRequest("Unsupported file type. Please upload a PDF, DOCX, or TXT file.");
  }
}

function cleanText(text) {
  const trimmed = text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  if (trimmed.length < 30) {
    throw badRequest(
      "Couldn't find enough readable text in that file. Is it a scanned image or empty?"
    );
  }
  return trimmed;
}

function badRequest(message) {
  const err = new Error(message);
  err.status = 400;
  return err;
}
