import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import "./AddEdit.css";

const initialState = {
  title: "",
  content: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { title , content } = state;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3500/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Please provide a value for each input field");
    } else {
        if(!id){axios
            .post("http://localhost:3500/api/post", {
              title,
              content
            })
            .then(() => {
              setState({ title:"", content: "" });
              toast.success("Data added successfully");
            })
            .catch((err) => toast.error(err.response?.data));}
            else{axios
                .put(`http://localhost:3500/api/update/${id}`, {
                 title,content
                })
                .then(() => {
                  setState({ title:"", content: "" });
                  toast.success("Contact Updated successfully");
                })
                .catch((err) => toast.error(err.response?.data));}
      
      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
  type="text"
  name="title"
  id="title"
  placeholder="Your Title..."
  value={title || ""}
  onChange={handleInputChange}
/>
        <label htmlFor="content">Content</label>
        <input
  type="text"
  name="content"
  id="content"
  placeholder="Your content..."
  value={content || ""}
  onChange={handleInputChange}
/>
        
        <input type="submit" value={id ? "update" :"Save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
