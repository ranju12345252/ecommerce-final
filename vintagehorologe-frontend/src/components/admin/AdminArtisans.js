import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import axios from 'axios';
import { formatDate } from '../../utils/helpers';

const AdminArtisans = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchArtisans = async () => {
    try {
      const { data } = await axios.get('/api/admin/auth/artisans', { // Add /auth
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setArtisans(data);
    } catch (err) {
      setError('Failed to fetch artisans');
    }
  };

  const verifyArtisan = async (artisanId) => {
    try {
      await axios.put(`/api/admin/auth/artisans/${artisanId}/verify`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchArtisans();
    } catch (err) {
      setError('Failed to verify artisan');
    }
  };

  useEffect(() => { fetchArtisans(); }, []);

  return (
    <div className="admin-artisans">
      <h2 className="mb-4">Artisan Management</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {artisans.map(artisan => (
              <tr key={artisan.id}>
                <td>{artisan.id}</td>
                <td>{artisan.name}</td>
                <td>{artisan.email}</td>
                <td>
                  <Badge bg={artisan.active ? 'success' : 'danger'}>
                    {artisan.active ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td>
                  {artisan.verified ? (
                    <Badge bg="success">Verified</Badge>
                  ) : (
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => verifyArtisan(artisan.id)}
                    >
                      Verify
                    </Button>
                  )}
                </td>
                <td>
                  <Button variant="outline-info" size="sm">
                    View
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

export default AdminArtisans;