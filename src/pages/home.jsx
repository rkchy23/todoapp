import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import './Home.css';



const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/get");
      setData(response.data);
    } catch (error) {
      console.error("Error loading data:", error);
      // Handle error, show a message, etc.
    }
  };

  

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact=(id)=>{
    if(window.confirm("Are you sure ?")){
      axios.delete(`http://localhost:3500/api/remove/${id}`);
      toast.success("Contact Deleted Successfully");
      setTimeout(()=>loadData(),500);
    }
  }
  return (
    <div style={{ marginTop: "150px", alignItems: "center" }}>
        <Link to="/addContact">
        <button className="btn btn-contact">Add Content</button>
        </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Title</th>
            <th style={{ textAlign: "center" }}>content</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.title}</td>
              <td>{item.content}</td>
              <td>
                <Link to={`/update/${item.id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button className="btn btn-delete" onClick={() =>deleteContact(item.id)}>Delete
                </button>
                <Link to={`/view/${item.id}`}>
                  <button className="btn btn-view">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
