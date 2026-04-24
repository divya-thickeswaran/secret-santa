import React, { useState } from "react";
import { generateSanta } from "./api";

export default function UploadForm() {
  const [employees, setEmployees] = useState(null);
  const [previous, setPrevious] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("employees", employees);
    if (previous) formData.append("previous", previous);
    try {
    const blob = await generateSanta(formData);

    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "secret_santa.csv";
    a.click();
    } catch (err) {
      console.error(err);

      // THIS LINE WILL REVEAL THE REAL ISSUE
      const reader = new FileReader();
      reader.onload = () => {
        alert("Error: " + reader.result);
      };
      reader.readAsText(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}  style={{ maxWidth: '400px' }}>
       <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ width: '180px' }}><span style={{ color: 'red' }}>*</span>Employees List: </label>
        <input 
          type="file" 
          onChange={(e) => setEmployees(e.target.files[0])} 
          required />
       </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ width: '180px' }}>Previous Year Assignment: </label>
        <input 
          type="file" 
          onChange={(e) => setPrevious(e.target.files[0])} 
        />
      </div>
      <button type="submit">Generate</button>
    </form>
  );
}