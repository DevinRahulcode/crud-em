import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllEmployees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:8080/api/all-employee")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
      });
  };

  const handleAddEmployee = () => {
    navigate("/AddEmployee");
  };

  const handleEdit = (employee) => {
    navigate(`/EditEmployee/${employee.id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`http://localhost:8080/api/delete-employee/${id}`)
        .then(() => {
          fetchEmployees();
        })
        .catch((error) => {
          console.error("Error deleting employee!", error);
        });
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const term = searchTerm.toLowerCase();
    return (
      employee.firstName.toLowerCase().includes(term) ||
      employee.lastName.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term)
    );
  });

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>🚀 Employee Management System</h1>
      </header>
      <main style={styles.container}>
        <h2 style={styles.heading}>All Employees</h2>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBar}
        />

        <button onClick={handleAddEmployee} style={styles.addButton}>
          + Add New Employee
        </button>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>First Name</th>
                <th style={styles.th}>Last Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Salary</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee, index) => (
                  <tr
                    key={index}
                    style={
                      index % 2 === 0
                        ? styles.tableRowEven
                        : styles.tableRowOdd
                    }
                  >
                    <td style={styles.td}>{employee.firstName}</td>
                    <td style={styles.td}>{employee.lastName}</td>
                    <td style={styles.td}>{employee.email}</td>
                    <td style={styles.td}>{employee.salary}</td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handleEdit(employee)}
                        style={styles.editButton}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        style={styles.deleteButton}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={styles.noData}>
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>
          © {new Date().getFullYear()} Employee Management System | All Rights
          Reserved
        </p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  header: {
    background: "linear-gradient(135deg, #4CAF50, #2e7d32)",
    color: "white",
    padding: "15px 20px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  headerTitle: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "600",
  },
  container: {
    flex: "1",
    padding: "30px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "22px",
    color: "#333",
  },
  searchBar: {
    width: "100%",
    padding: "10px 14px",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  },
  addButton: {
    marginBottom: "20px",
    padding: "10px 18px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  tableWrapper: {
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#4CAF50",
    color: "white",
    textAlign: "left",
  },
  th: {
    padding: "12px",
    fontSize: "15px",
  },
  td: {
    padding: "12px",
    fontSize: "14px",
    borderBottom: "1px solid #ddd",
  },
  tableRowEven: {
    backgroundColor: "#f9f9f9",
  },
  tableRowOdd: {
    backgroundColor: "white",
  },
  editButton: {
    marginRight: "10px",
    padding: "6px 12px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  noData: {
    textAlign: "center",
    padding: "15px",
    color: "#888",
  },
  footer: {
    background: "#333",
    color: "white",
    textAlign: "center",
    padding: "12px",
    marginTop: "auto",
    fontSize: "14px",
  },
};

export default AllEmployees;
