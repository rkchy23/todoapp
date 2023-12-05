import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import "./View.css";

const View = () => {

    const [user,setUser]=useState({});

    const {id}=useParams();

    useEffect(() => {
        axios.get(`http://localhost:3500/api/get/${id}`)
          .then((resp) => setUser({ ...resp.data[0] }));
      }, [id]);

  return (
    <div style={{marginTop:"150px"}}>
      <div className="card">
        <div className="card-header">
            <p>User Contact Detail</p>
        </div>
        <div className="container">
            <strong>ID : </strong><span>{id}</span>
            <br />
            <br />
            <strong>Title : </strong><span>{user.title}</span>
            <br />
            <br />
            <strong>Content : </strong><span>{user.content}</span>
            <br />
            <br />
            <Link to="/">
                <div className="btn btn-edit">Go Back</div>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default View
