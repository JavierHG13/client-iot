import React, { useState } from 'react'
import { Input, Select, Card, Row, Col, Pagination, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import useProducts from '../../hooks/useProducts'

//Importaciones para mostrarlo mientras carga
import Header from '../../components/Common/Header'
import Loader from '../../components/Common/Loader'
import AppFooter from '../../components/Common/Footer'

import './Productos.css'

const { Search } = Input
const { Option } = Select

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Sensor de Temperatura',
    description: 'Sensor preciso para monitorear la temperatura del agua.',
    price: 29.99,
    category: 'Sensores',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTr93xVYUCzrhgZN7k8fJ9w_TTKxGFD3PCzemwsfQgZKjii7TLm9gSPjimXEtzOr4KlTets97Oe4x-rHnnc3Hy29EM1L0YDU5pqJuT-U9ZtrbIewVpQVRrZTQ&usqp=CAE',
  },
  {
    id: '2',
    name: 'Bomba de Agua',
    description: 'Bomba eficiente para mantener el flujo de agua en tu acuario.',
    price: 49.99,
    category: 'Bombas',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTr93xVYUCzrhgZN7k8fJ9w_TTKxGFD3PCzemwsfQgZKjii7TLm9gSPjimXEtzOr4KlTets97Oe4x-rHnnc3Hy29EM1L0YDU5pqJuT-U9ZtrbIewVpQVRrZTQ&usqp=CAE',
  },
  {
    id: '3',
    name: 'Filtro Biológico',
    description: 'Filtro que mantiene el agua limpia y libre de impurezas.',
    price: 39.99,
    category: 'Filtros',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '1',
    name: 'Sensor de Temperatura',
    description: 'Sensor preciso para monitorear la temperatura del agua.',
    price: 29.99,
    category: 'Sensores',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTr93xVYUCzrhgZN7k8fJ9w_TTKxGFD3PCzemwsfQgZKjii7TLm9gSPjimXEtzOr4KlTets97Oe4x-rHnnc3Hy29EM1L0YDU5pqJuT-U9ZtrbIewVpQVRrZTQ&usqp=CAE',
  },
  {
    id: '2',
    name: 'Bomba de Agua',
    description: 'Bomba eficiente para mantener el flujo de agua en tu acuario.',
    price: 49.99,
    category: 'Bombas',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTr93xVYUCzrhgZN7k8fJ9w_TTKxGFD3PCzemwsfQgZKjii7TLm9gSPjimXEtzOr4KlTets97Oe4x-rHnnc3Hy29EM1L0YDU5pqJuT-U9ZtrbIewVpQVRrZTQ&usqp=CAE',
  },
  {
    id: '3',
    name: 'Filtro Biológico',
    description: 'Filtro que mantiene el agua limpia y libre de impurezas.',
    price: 39.99,
    category: 'Filtros',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '1',
    name: 'Sensor de Temperatura',
    description: 'Sensor preciso para monitorear la temperatura del agua.',
    price: 29.99,
    category: 'Sensores',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTr93xVYUCzrhgZN7k8fJ9w_TTKxGFD3PCzemwsfQgZKjii7TLm9gSPjimXEtzOr4KlTets97Oe4x-rHnnc3Hy29EM1L0YDU5pqJuT-U9ZtrbIewVpQVRrZTQ&usqp=CAE',
  },
  {
    id: '2',
    name: 'Bomba de Agua',
    description: 'Bomba eficiente para mantener el flujo de agua en tu acuario.',
    price: 49.99,
    category: 'Bombas',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTr93xVYUCzrhgZN7k8fJ9w_TTKxGFD3PCzemwsfQgZKjii7TLm9gSPjimXEtzOr4KlTets97Oe4x-rHnnc3Hy29EM1L0YDU5pqJuT-U9ZtrbIewVpQVRrZTQ&usqp=CAE',
  },
  {
    id: '3',
    name: 'Filtro Biológico',
    description: 'Filtro que mantiene el agua limpia y libre de impurezas.',
    price: 39.99,
    category: 'Filtros',
    image: 'https://via.placeholder.com/150',
  },

]

const Productos: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  // Filtrar productos según la búsqueda y la categoría seleccionada
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase())
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true
    return matchesSearch && matchesCategory
  })

  // Paginación
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const { loading } = useProducts();

  if (loading) {
    return (
      //<Loader />
      <div>
        <p>Cargando productos....</p>
      </div>
    );
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
        {paginatedProducts.map((product) => (
          <Col xs={24} sm={12} md={8} key={product.id}>
            <Card
              cover={<img src={product.image} alt={product.name} />}
              className="product-card"
            >
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
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