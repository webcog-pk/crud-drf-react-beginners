import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/items/'); // Adjust the URL as needed
        setItems(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="container">
      <h1 className="bg-primary text-center text-white p-5 my-3 mb-4">All Products</h1>

      {loading && <h2>Loading...</h2>} {/* Display loading message */}

      {/* Display error message in a specific area */}
      {error && (
        <div className="alert alert-danger">
          <strong>Error:</strong> {error.message || "Something went wrong!"}
        </div>
      )}

      {/* If no items are available, show a 'No items found' message */}
      {items.length === 0 && !loading && !error && <h3>No items found</h3>}

      <div className="row">
        {/* Display items only if data is successfully fetched */}
        {items.map(item => (
          <div className="col-md-4" key={item.id}>
            <Card>
              <Card.Body>
                <Card.Title className="text-truncate" style={{ maxWidth: "250px" }}>{item.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">ID: {item.id}</Card.Subtitle>
                <Card.Text className="text-truncate" style={{ maxWidth: "250px" }}>
                  {item.description}
                </Card.Text>
                <span>
                  Created at: {new Date(item.created_at).toLocaleString()}<br />
                  Updated at: {new Date(item.updated_at).toLocaleString()}
                </span>
                <Button variant="dark" as={Link} to={`/items/${item.id}`}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
