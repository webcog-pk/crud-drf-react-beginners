import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

function DeleteItem() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Use useNavigate hook for redirection

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`http://127.0.0.1:8000/api/items/${id}/delete/`);
      navigate("/"); // Redirect to the home page after deletion
    } catch (err) {
      setError(err.response?.data || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="bg-danger text-center text-white p-5 my-3 mb-4">Delete Item</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <p>Are you sure you want to delete this item?</p>

      <Button variant="danger" onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete Item"}
      </Button>
       <Button className="ms-2" variant="dark" as={Link} to={`/items/${id}`}>
        No
      </Button>
    </div>
  );
}

export default DeleteItem;
