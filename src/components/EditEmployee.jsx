import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/employee/${id}`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee details!", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/api/update-employee/${id}`, employee)
      .then(() => {
        alert("Employee updated successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating employee!", error);
        alert("Failed to update employee!");
      });
  };

  return (
    <div style={styles.pageWrapper}>
      <header style={styles.header}>
        <h1>Employee Management System</h1>
      </header>

      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Edit Employee</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={employee.firstName}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={employee.lastName}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={employee.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="salary"
              placeholder="Enter Salary"
              value={employee.salary}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              Update Employee
            </button>
          </form>
        </div>
      </div>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Employee Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
    fontFamily: "'Poppins', sans-serif",
  },
  header: {
    background: "#2196F3",
    color: "white",
    padding: "15px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
  wrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "420px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "24px",
    color: "#333",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 14px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    transition: "all 0.3s ease",
    outline: "none",
  },
  button: {
    padding: "12px",
    background: "linear-gradient(135deg, #2196F3, #0d47a1)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  footer: {
    background: "#333",
    color: "white",
    textAlign: "center",
    padding: "12px",
    marginTop: "20px",
    fontSize: "14px",
  },
};

const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  input:focus {
    border-color: #2196F3 !important;
    box-shadow: 0 0 6px rgba(33, 150, 243, 0.5);
  }
  button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
`;
document.head.appendChild(styleSheet);

export default EditEmployee;
