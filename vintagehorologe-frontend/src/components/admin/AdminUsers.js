import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:8080/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.error
          || err.response?.data?.message
          || 'Failed to fetch users';
        setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="m-3">{error}</Alert>;
  }

  return (
    <div className="p-4">
      <h3 className="mb-4">User Management</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.role.replace('ROLE_', '')}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <Button
                  as={Link}
                  to={`/admin/dashboard/users/${user.id}/orders`}
                  variant="outline-primary"
                  size="sm"
                >
                  View Orders
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminUsers;