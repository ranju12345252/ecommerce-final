import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import axios from 'axios';
import { formatCurrency, formatDate } from '../../utils/helpers';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/admin/auth/products', { // Add /auth
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
    }
  };

  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/admin/auth/products/${productId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        fetchProducts();
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <div className="admin-products">
      <h2 className="mb-4">Product Management</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Artisan</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>
                  <Badge bg="info">{product.category}</Badge>
                </td>
                <td>{product.artisan?.name || 'N/A'}</td>
                <td>{product.stock}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminProducts;