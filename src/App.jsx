import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbw0IQZhD0hvWXyLLpnza-5lZoxWCq8AJZ_xcF9F5ZYFBHkq6yCBW98ntfJ9SFH9lqtLpA/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await response.text();
      console.log("Response:", text);

      if (text.includes("Success")) {
        setStatus("✅ Submitted successfully!");
        setName("");
        setPhone("");
      } else {
        throw new Error(text);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("❌ Submission failed. See console.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Submit Your Info</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "10px",
            fontSize: "16px",
          }}
        />
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "10px",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
      <p style={{ marginTop: "20px", color: status.includes("✅") ? "green" : "red" }}>
        {status}
      </p>
    </div>
  );
}

export default App;
