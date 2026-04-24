import axios from "axios";

export const generateSanta = async (formData) => {
  const res = await axios.post("http://localhost:5000/api/generate", 
    formData,
    { responseType: "blob" }
  );
  return res.data;
};