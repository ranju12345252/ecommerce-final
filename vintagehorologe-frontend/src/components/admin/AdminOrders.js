import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert, Badge, Button, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { Link } from 'react-router-dom';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const statusVariant = (status) => {
    switch (status) {
      case 'DELIVERED': return 'success';
      case 'CANCELLED': return 'danger';
      case 'PROCESSING': return 'warning';
      default: return 'primary';
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const { data } = await axios.get('http://localhost:8080/api/admin/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(data);
      } catch (err) {
        const errorMessage = err.response?.data?.error
          || 'Failed to fetch orders';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="mb-4">Order Management</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {orders.length === 0 ? (
        <Card className="text-center">
          <Card.Body>
            <h4>No orders found</h4>
          </Card.Body>
        </Card>
      ) : (
        orders.map(order => (
          <Card key={order.id} className="mb-4 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center bg-light">
              <div>
                <h5 className="mb-0">Order #{order.razorpayOrderId}</h5>
                <small className="text-muted">
                  {formatDate(order.orderDate)} • {order.user.email}
                </small>
              </div>
              <Badge bg={statusVariant(order.status)}>
                {order.status}
              </Badge>
            </Card.Header>

            <Card.Body>
              <ListGroup variant="flush">
                {order.items.map(item => (
                  <ListGroup.Item key={item.productId} className="py-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6>{item.productName}</h6>
                        <div className="d-flex gap-2">
                          {item.imageUrls?.slice(0, 2).map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt={item.productName}
                              className="img-thumbnail"
                              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="h6">
                          {formatCurrency(item.price)} × {item.quantity}
                        </div>
                        <small className="text-muted">
                          Product ID: {item.productId}
                        </small>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="mt-4 d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Total: {formatCurrency(order.totalAmount)}</h4>
                <div className="text-muted">
                  Payment ID: {order.razorpayPaymentId || 'N/A'}
                </div>
              </div>
            </Card.Body>

            <Card.Footer className="d-flex justify-content-between align-items-center">
              <Button
                as={Link}
                to={`/admin/dashboard/users/${order.user.id}/orders`}
                variant="outline-primary"
                size="sm"
              >
                View User's Orders
              </Button>
              <small className="text-muted">
                Order ID: {order.id}
              </small>
            </Card.Footer>
          </Card>
        ))
      )}
    </div>
  );
};

export default AdminOrders;