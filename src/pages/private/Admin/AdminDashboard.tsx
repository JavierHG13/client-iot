import React from 'react'
import { Card, Row, Col, Statistic, Table, Button } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import './AdminDashboard.css'

const AdminDashboard: React.FC = () => {
  // Datos de ejemplo para las estadísticas
  const statsData = [
    {
      title: 'Usuarios Registrados',
      value: 1245,
      change: 12,
      isIncrease: true,
    },
    {
      title: 'Ventas Totales',
      value: 25689,
      change: 8,
      isIncrease: true,
    },
    {
      title: 'Productos Activos',
      value: 345,
      change: -3,
      isIncrease: false,
    },
    {
      title: 'Órdenes Pendientes',
      value: 23,
      change: -5,
      isIncrease: false,
    },
  ]

  // Datos de ejemplo para la tabla de últimas órdenes
  const ordersColumns = [
    {
      title: 'ID de Orden',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Cliente',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
      ),
    },
  ]

  const ordersData = [
    {
      id: 'ORD12345',
      customer: 'Juan Pérez',
      amount: 120.5,
      status: 'Completado',
    },
    {
      id: 'ORD12346',
      customer: 'María Gómez',
      amount: 89.99,
      status: 'Pendiente',
    },
    {
      id: 'ORD12347',
      customer: 'Carlos López',
      amount: 45.0,
      status: 'Cancelado',
    },
  ]

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>

      {/* Estadísticas rápidas */}
      <Row gutter={16} className="stats-row">
        {statsData.map((stat, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                precision={0}
                valueStyle={{ color: stat.isIncrease ? '#3f8600' : '#cf1322' }}
                prefix={
                  stat.isIncrease ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                }
                suffix="%"
              />
              <p className="stat-change">
                {stat.change > 0 ? '+' : ''}
                {stat.change}% respecto al mes anterior
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Tabla de últimas órdenes */}
      <Card title="Últimas Órdenes" className="orders-card">
        <Table
          columns={ordersColumns}
          dataSource={ordersData}
          pagination={{ pageSize: 5 }}
          rowKey="id"
        />
      </Card>

      {/* Acciones rápidas */}
      <Row gutter={16} className="actions-row">
        <Col span={8}>
          <Button type="primary" block>
            Gestionar Usuarios
          </Button>
        </Col>
        <Col span={8}>
          <Button type="primary" block>
            Gestionar Productos
          </Button>
        </Col>
        <Col span={8}>
          <Button type="primary" block>
            Ver Reportes
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default AdminDashboard