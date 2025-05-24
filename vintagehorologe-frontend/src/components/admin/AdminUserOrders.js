import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Badge, Alert, Spinner, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { formatCurrency } from '../../utils/currency';

const AdminUserOrders = () => {
    const { userId } = useParams();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(`http://localhost:8080/api/admin/users/${userId}/orders`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(response.data);
            } catch (err) {
                // Handle error response properly
                const errorMessage = err.response?.data?.error
                    || err.response?.data?.message
                    || 'Failed to load orders';
                setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [userId]);

    if (loading) {
        return (
            <Container className="my-5 text-center">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4">User Orders</h2>

            {orders.length === 0 ? (
                <Card className="text-center">
                    <Card.Body>
                        <h4>No orders found for this user</h4>
                    </Card.Body>
                </Card>
            ) : (
                orders.map(order => (
                    <Card key={order.id} className="mb-4 shadow-sm">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-0">Order #{order.razorpayOrderId}</h5>
                                <small className="text-muted">
                                    {new Date(order.orderDate).toLocaleDateString()}
                                </small>
                            </div>
                            <Badge bg={order.status === 'DELIVERED' ? 'success' : 'primary'}>
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
                                                    {item.imageUrls.slice(0, 2).map((img, idx) => (
                                                        <img
                                                            key={idx}
                                                            src={img}
                                                            alt={item.productName}
                                                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <div>{formatCurrency(item.price)} × {item.quantity}</div>
                                                <div className="text-muted small">
                                                    Product ID: {item.productId}
                                                </div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            <div className="mt-4 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Total: {formatCurrency(order.totalAmount)}</h5>
                                <div className="text-muted">
                                    Payment ID: {order.razorpayPaymentId || 'N/A'}
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default AdminUserOrders;