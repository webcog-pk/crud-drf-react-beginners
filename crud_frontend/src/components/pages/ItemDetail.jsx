import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom'; // Make sure to install react-router-dom if you haven't
import { Link } from "react-router-dom";

function ItemDetail() {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/items/${id}/`);
        setItem(response.data);
      } catch (err) {
        if (err.response && err.response.data){
           setError(err.response.data.result || "Something went wrong!");
        } else {
          setError("Something went wrong!");
        }
      } finally {
        setLoading(false); // Finish loading
      }
    };

    fetchItem();
  }, [id]);

  return (
    <div className="container">
      <h1 className="bg-primary text-center text-white p-5 my-3 mb-4">Item Details</h1>

      {loading && <h2>Loading...</h2>} {/* Show loading text */}

{error && (
  <div className="bg-light p-4 mb-4 rounded shadow-sm">
    <h4 className="fw-bold">404</h4>
    <p>{error}</p>
  </div>
)}


      {/* If there's no item, show a no item found message */}
      {item && !loading && !error ? (
        <Card>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">ID: {item.id}</Card.Subtitle>
            <Card.Text>
              {item.description}<br />
              Created at: {new Date(item.created_at).toLocaleString()}<br />
              Updated at: {new Date(item.updated_at).toLocaleString()}
            </Card.Text>
             <Button className='me-2' variant="primary" as={Link} to={`/items/${item.id}/update`}>
              Update
            </Button>
            <Button className='me-2' variant="danger" as={Link} to={`/items/${item.id}/delete`}>
              Delete
            </Button>
            <Button variant="dark" as={Link} to="/">
              Back to Home
            </Button>
          </Card.Body>
        </Card>
      ) : (
        !loading && !item && !error && <h3>No item found</h3>
      )}
    </div>
  );
}

export default ItemDetail;
