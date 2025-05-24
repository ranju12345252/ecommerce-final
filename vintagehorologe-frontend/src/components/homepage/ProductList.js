import React, { useEffect, useState } from 'react';
import { Carousel, Card, Container, Row, Col, Form, Button, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch, BsStarFill, BsHeart } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

// --- PriceRangeSlider Component ---
const PriceRangeSlider = ({
    min,
    max,
    step,
    values,
    onChange,
    label,
    idPrefix = "price-range"
}) => {
    const [minValue, setMinValue] = useState(values[0]);
    const [maxValue, setMaxValue] = useState(values[1]);

    useEffect(() => {
        setMinValue(values[0]);
        setMaxValue(values[1]);
    }, [values]);

    const handleMinChange = (e) => {
        const newMinVal = Math.min(parseInt(e.target.value, 10), maxValue - step);
        if (newMinVal !== minValue) {
            setMinValue(newMinVal);
            onChange([newMinVal, maxValue]);
        }
    };

    const handleMaxChange = (e) => {
        const newMaxVal = Math.max(parseInt(e.target.value, 10), minValue + step);
        if (newMaxVal !== maxValue) {
            setMaxValue(newMaxVal);
            onChange([minValue, newMaxVal]);
        }
    };

    const handleMinInputChange = (e) => {
        let newMinVal = parseInt(e.target.value, 10);
        if (isNaN(newMinVal) || newMinVal < min) newMinVal = min;
        if (newMinVal > maxValue - step) newMinVal = maxValue - step;
        setMinValue(newMinVal);
        onChange([newMinVal, maxValue]);
    };

    const handleMaxInputChange = (e) => {
        let newMaxVal = parseInt(e.target.value, 10);
        if (isNaN(newMaxVal) || newMaxVal > max) newMaxVal = max;
        if (newMaxVal < minValue + step) newMaxVal = minValue + step;
        setMaxValue(newMaxVal);
        onChange([minValue, newMaxVal]);
    };

    const minPosPercent = ((minValue - min) / (max - min)) * 100;
    const maxPosPercent = ((maxValue - min) / (max - min)) * 100;

    return (
        <Form.Group>
            <Form.Label htmlFor={`${idPrefix}-min-input`} className="d-flex justify-content-between">
                <span>{label}</span>
                <span className="text-muted">
                    ${minValue.toLocaleString()} - ${maxValue.toLocaleString()}
                </span>
            </Form.Label>
            <div className="range-slider-container mb-3">
                <div className="slider-track-wrapper">
                    <div className="slider-track-background" />
                    <div
                        className="slider-track-active"
                        style={{ left: `${minPosPercent}%`, right: `${100 - maxPosPercent}%` }}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={minValue}
                        onChange={handleMinChange}
                        className="form-range range-slider-input range-slider-input-min"
                        id={`${idPrefix}-min-slider`}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={maxValue}
                        onChange={handleMaxChange}
                        className="form-range range-slider-input range-slider-input-max"
                        id={`${idPrefix}-max-slider`}
                    />
                    <div className="slider-thumb slider-thumb-min" style={{ left: `${minPosPercent}%` }} />
                    <div className="slider-thumb slider-thumb-max" style={{ left: `${maxPosPercent}%` }} />
                </div>
            </div>
            <div className="d-flex gap-3">
                <Form.Control
                    type="number"
                    min={min}
                    max={maxValue - step}
                    value={minValue}
                    onChange={handleMinInputChange}
                    className="rounded-pill text-center price-range-manual-input"
                    placeholder="Min price"
                    aria-label="Minimum Price"
                    id={`${idPrefix}-min-input`}
                />
                <div className="text-muted my-auto">–</div>
                <Form.Control
                    type="number"
                    min={minValue + step}
                    max={max}
                    value={maxValue}
                    onChange={handleMaxInputChange}
                    className="rounded-pill text-center price-range-manual-input"
                    placeholder="Max price"
                    aria-label="Maximum Price"
                    id={`${idPrefix}-max-input`}
                />
            </div>
        </Form.Group>
    );
};

// --- ProductList Component ---
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        ethicalScore: 0,
        priceRange: [0, 100000],
        searchQuery: '',
        priceStep: 100
    });
    const [sortBy, setSortBy] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);

                // Optional: Calculate max price from products
                const maxPrice = data.reduce((max, p) => p.price > max ? p.price : max, 0);
                setFilters(prev => ({
                    ...prev,
                    priceRange: [0, Math.max(1000, Math.ceil(maxPrice / 1000) * 1000) || 100000]
                }));

            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const searchRegex = new RegExp(filters.searchQuery, 'i');
        return (
            (searchRegex.test(product.name) || searchRegex.test(product.materials)) &&
            (!filters.category || product.artisanCategory === filters.category) &&
            product.ethicalScore >= filters.ethicalScore &&
            product.price >= filters.priceRange[0] &&
            product.price <= filters.priceRange[1]
        );
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price_asc': return a.price - b.price;
            case 'price_desc': return b.price - a.price;
            case 'ethical_desc': return b.ethicalScore - a.ethicalScore;
            case 'popularity': return b.salesCount - a.salesCount;
            default: return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });

    const handlePriceRangeChange = (values) => {
        setFilters(prev => ({
            ...prev,
            priceRange: [values[0], values[1]]
        }));
    };

    const uniqueCategories = [...new Set(products.map(p => p.artisanCategory))];

    if (loading) {
        return <Container className="my-5 text-center"><h4>Loading products...</h4></Container>;
    }

    return (
        <Container className="my-5 product-list-page">
            <div className="search-header mb-5 p-4 bg-dark text-white rounded-3">
                <h2 className="mb-4">Discover Antique Watches</h2>
                <div className="position-relative">
                    <BsSearch className="search-icon" />
                    <Form.Control
                        type="search"
                        placeholder="Search by product name or materials..."
                        value={filters.searchQuery}
                        onChange={e => setFilters({ ...filters, searchQuery: e.target.value })}
                        className="ps-5 rounded-pill border-0 py-2 shadow search-input"
                    />
                </div>
            </div>

            <div className="filter-sidebar bg-light p-4 rounded-3 shadow-sm mb-4">
                <Row className="g-4 align-items-end">
                    <Col md={6} lg={3}>
                        <Form.Group controlId="categoryFilter">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                value={filters.category}
                                onChange={e => setFilters({ ...filters, category: e.target.value })}
                                className="rounded-pill"
                            >
                                <option value="">All Categories</option>
                                {uniqueCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={6} lg={3}>
                        <Form.Group controlId="ethicalFilter">
                            <Form.Label>Min. Ethical Rating</Form.Label>
                            <div className="d-flex align-items-center gap-2">
                                <Form.Range
                                    min="0"
                                    max="10"
                                    value={filters.ethicalScore}
                                    onChange={e => setFilters({ ...filters, ethicalScore: Number(e.target.value) })}
                                    className="ethical-score-slider"
                                />
                                <Badge pill bg="success" className="fs-6 ethical-score-badge">{filters.ethicalScore}+</Badge>
                            </div>
                        </Form.Group>
                    </Col>

                    <Col md={12} lg={4}>
                        <PriceRangeSlider
                            min={0}
                            max={100000}
                            step={filters.priceStep}
                            values={filters.priceRange}
                            onChange={handlePriceRangeChange}
                            label="Price Range"
                            idPrefix="main-price-filter"
                        />
                    </Col>

                    <Col md={12} lg={2}>
                        <Form.Group controlId="sortFilter">
                            <Form.Label>Sort By</Form.Label>
                            <Form.Select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="rounded-pill"
                            >
                                <option value="">Newest</option>
                                <option value="price_asc">Price: Low-High</option>
                                <option value="price_desc">Price: High-Low</option>
                                <option value="ethical_desc">Ethical Rating (Highest)</option>
                                <option value="popularity">Popularity</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </div>

            <Row className="g-4">
                {sortedProducts.map(product => (
                    <Col key={product.id} xl={3} lg={4} md={6}>
                        <Card className="h-100 shadow-sm border-0 overflow-hidden product-card">
                            <div className="product-card-image-container">
                                <Carousel indicators={product.imageData?.length > 1} controls={product.imageData?.length > 1} interval={null}>
                                    {(product.imageData && product.imageData.length > 0 ? product.imageData : ['/placeholder.jpg']).map((img, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                src={img || '/placeholder.jpg'}
                                                alt={`${product.name} ${index + 1}`}
                                                className="product-card-image"
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                                {product.imageData && product.imageData.length > 1 && (
                                    <div className="carousel-thumbnails-wrapper">
                                        {product.imageData.map((img, index) => (
                                            <div
                                                key={index}
                                                className="thumbnail-item"
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Thumbnail ${product.name} ${index + 1}`}
                                                    className="thumbnail-image"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <Button variant="light" size="sm" className="wishlist-button">
                                    <BsHeart className="text-danger" />
                                </Button>
                                {product.stock > 0 && product.stock <= 5 && (
                                    <Badge bg="warning" text="dark" className="stock-badge low-stock-badge">
                                        Only {product.stock} left!
                                    </Badge>
                                )}
                                {product.stock === 0 && (
                                    <Badge bg="danger" className="stock-badge out-of-stock-badge">
                                        Out of Stock
                                    </Badge>
                                )}
                            </div>

                            <Card.Body className="d-flex flex-column p-3">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <Badge pill bg="light" text="dark" className="category-badge">
                                        {product.artisanCategory}
                                    </Badge>
                                    <div className="d-flex align-items-center gap-1 ethical-display">
                                        <BsStarFill className="text-warning" />
                                        <span className="text-muted fw-bold">
                                            {product.ethicalScore}
                                        </span>
                                    </div>
                                </div>

                                <Card.Title as="h5" className="product-name mb-2">
                                    {product.name}
                                </Card.Title>

                                <div className="mt-auto">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            {product.price * 1.2 > product.price && (
                                                <span className="original-price text-muted text-decoration-line-through me-2">
                                                    ${(product.price * 1.2).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </span>
                                            )}
                                            <span className="current-price">
                                                ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        <Button
                                            variant="outline-dark"
                                            size="sm"
                                            className="rounded-pill px-3 view-product-button"
                                            onClick={() => navigate(`/products/${product.id}`)}
                                            disabled={product.stock === 0}
                                        >
                                            {product.stock === 0 ? "Unavailable" : "View"}
                                        </Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {!loading && sortedProducts.length === 0 && (
                <div className="text-center py-5">
                    <h4 className="text-muted">No products match your criteria.</h4>
                    <p className="text-muted">Try adjusting your filters or search terms.</p>
                    <Button
                        variant="outline-secondary"
                        className="mt-3"
                        onClick={() => {
                            setFilters({
                                category: '',
                                ethicalScore: 0,
                                priceRange: [0, 100000],
                                searchQuery: '',
                                priceStep: 100
                            });
                            setSortBy('');
                        }}
                    >
                        Clear All Filters
                    </Button>
                </div>
            )}

            <style>{`
                .product-list-page .search-header .search-icon {
                    position: absolute;
                    top: 50%;
                    left: 1rem;
                    transform: translateY(-50%);
                    font-size: 1.25rem;
                    color: #6c757d;
                }
                .product-list-page .search-header .search-input {
                    padding-left: 3rem;
                }

                .range-slider-container {
                    position: relative;
                    height: 40px;
                    display: flex;
                    align-items: center;
                }
                .slider-track-wrapper {
                    position: relative;
                    width: 100%;
                    height: 20px;
                    display: flex;
                    align-items: center;
                }
                .slider-track-background, .slider-track-active {
                    position: absolute;
                    height: 6px;
                    border-radius: 3px;
                    width: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .slider-track-background {
                    background-color: #dee2e6;
                }
                .slider-track-active {
                    background-color: #0d6efd;
                }
                .range-slider-input {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                    pointer-events: none;
                    margin: 0;
                }
                .slider-thumb {
                    width: 20px;
                    height: 20px;
                    background-color: #0d6efd;
                    border: 2px solid white;
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    z-index: 2;
                    pointer-events: none;
                }

                .product-card {
                    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                }
                .product-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15) !important;
                }
                .product-card-image-container {
                    position: relative;
                    height: 220px;
                    background-color: #f8f9fa;
                    overflow: hidden;
                }
                .product-card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .carousel-thumbnails-wrapper {
                    position: absolute;
                    bottom: 8px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 6px;
                    padding: 4px;
                    background-color: rgba(255, 255, 255, 0.7);
                    border-radius: 8px;
                    z-index: 10;
                }
                .thumbnail-item {
                    width: 40px;
                    height: 40px;
                    border: 2px solid transparent;
                    border-radius: 6px;
                    overflow: hidden;
                    cursor: pointer;
                    opacity: 0.7;
                    transition: opacity 0.2s, border-color 0.2s;
                }
                .thumbnail-item:hover {
                    opacity: 1;
                    border-color: #0d6efd;
                }
                .wishlist-button {
                    position: absolute;
                    top: 0.75rem;
                    right: 0.75rem;
                    border-radius: 50%;
                    padding: 0.3rem 0.45rem;
                    line-height: 1;
                    z-index: 10;
                    background-color: rgba(255, 255, 255, 0.8);
                }
                .wishlist-button:hover {
                    background-color: rgba(255, 255, 255, 1);
                }
                .stock-badge {
                    position: absolute;
                    top: 0.75rem;
                    left: 0.75rem;
                    font-size: 0.75em;
                    z-index: 10;
                }
                .product-name {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #212529;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    min-height: 2.6rem;
                }
            `}</style>
        </Container>
    );
};

export default ProductList;