import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL });

function extractErrorMessage(error) {
  return (
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong. Please try again."
  );
}

/**
 * @param {File} resumeFile
 * @param {string} jobDescription
 */
export async function analyzeResume(resumeFile, jobDescription) {
  const form = new FormData();
  form.append("resume", resumeFile);
  form.append("jobDescription", jobDescription);
  try {
    const { data } = await api.post("/analyze", form);
    return data.analysis;
  } catch (err) {
    throw new Error(extractErrorMessage(err));
  }
}

/**
 * @param {File} resumeFile
 * @param {string} [jobDescription]
 */
export async function correctResume(resumeFile, jobDescription) {
  const form = new FormData();
  form.append("resume", resumeFile);
  if (jobDescription) form.append("jobDescription", jobDescription);
  try {
    const { data } = await api.post("/correct", form);
    return data.correction;
  } catch (err) {
    throw new Error(extractErrorMessage(err));
  }
}

/**
 * @param {File} resumeFile
 * @param {string} jobDescription
 */
export async function generateAtsResume(resumeFile, jobDescription) {
  const form = new FormData();
  form.append("resume", resumeFile);
  form.append("jobDescription", jobDescription);
  try {
    const { data } = await api.post("/generate", form);
    return data.generated;
  } catch (err) {
    throw new Error(extractErrorMessage(err));
  }
}

/**
 * Downloads the generated resume as a .docx file.
 * @param {object} generated
 */
export async function downloadGeneratedResume(generated) {
  try {
    const response = await api.post(
      "/generate/download",
      { generated },
      { responseType: "blob" }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    const safeName = (generated.fullName || "resume").replace(/[^a-z0-9]+/gi, "_").toLowerCase();
    link.setAttribute("download", `${safeName}_ats_resume.docx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    throw new Error(extractErrorMessage(err));
  }
}
