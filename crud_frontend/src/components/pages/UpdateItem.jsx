import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";

function UpdateItem() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Use useNavigate hook for redirection

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/items/${id}/`);
        setName(response.data.name);
        setDescription(response.data.description);
      } catch (err) {
        setError("Item not found");
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/items/${id}/update/`, {
        name,
        description,
      });
      navigate(`/items/${response.data.id}`); // Redirect to the updated item's detail page
    } catch (err) {
      setError(err.response?.data || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="bg-primary text-center text-white p-5 my-3 mb-4">Update Item</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Item"}
        </Button>
         <Button className="ms-2" variant="dark" as={Link} to={`/items/${id}/`}>
            Go Back
        </Button>
      </Form>
    </div>
  );
}

export default UpdateItem;
