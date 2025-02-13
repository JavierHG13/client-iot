import React, { useState } from 'react'
import { Input, Select, Card, Row, Col, Pagination, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import useProducts from '../../hooks/useProducts'
import Loader from '../../components/Common/Loader'

import './Productos.css'

const { Search } = Input
const { Option } = Select

const Productos: React.FC = () => {

  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const { products, loading } = useProducts();
  const pageSize = 6

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.nombre
      .toLowerCase()
      .includes(searchText.toLowerCase())
    const matchesCategory = selectedCategory
      ? product.categoria === selectedCategory
      : true
    return matchesSearch && matchesCategory
  })

  // Paginación
  const productosPaginados = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

  return (
    <div className="productos-page">
    
      {/* Filtros y búsqueda */}
      <div className="filters-section">
        <Search
          placeholder="Buscar productos..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-bar"
        />

        <Select
          placeholder="Filtrar por categoría"
          allowClear
          size="large"
          onChange={(value) => setSelectedCategory(value)}
          className="category-filter"
        >
          <Option value="Sensores">Sensores</Option>
          <Option value="Bombas">Bombas</Option>
          <Option value="Filtros">Filtros</Option>
        </Select>
      </div>

      {/* Listado de productos */}
      <Row gutter={[24, 24]} className="products-grid">
        {productosPaginados.map((product) => (
          <Col xs={24} sm={12} md={8} key={product._id}>
            <Card
              cover={
                <img
                  src={product.imagen?.[0] || "https://via.placeholder.com/150"}
                  loading="lazy" 
                  alt={product.nombre}
                />
              }
              className="product-card"
            >
              <h3>{product.nombre}</h3>
              <p>{product.descripcion}</p>
              <p className="product-price">${product.precio.toFixed(2)}</p>
              <Button type="primary" block>
                Ver detalles
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Paginación */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredProducts.length}
        onChange={(page) => setCurrentPage(page)}
        className="pagination"
      />
    </div>
  )
}

export default Productos
