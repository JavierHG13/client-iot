import React from 'react'
import { Button, Card, Row, Col } from 'antd'
import { RocketOutlined, TeamOutlined, ToolOutlined } from '@ant-design/icons'
import './Home.css'

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-content">
          <h1>Bienvenido a AquaControl</h1>
          <p>
            La solución perfecta para el monitoreo y control de tu acuario.
            Conecta, monitorea y disfruta de un ecosistema saludable.
          </p>
          <div className="hero-actions">
            <Button type="primary" size="large">
              Comenzar
            </Button>
            <Button size="large">Ver más</Button>
          </div>
        </div>


      </section>

      {/* Características principales */}
      <section className="features-section">
        <h2>¿Por qué elegir AquaControl?</h2>
        <Row gutter={[24, 24]} className="features-row">
          <Col xs={24} sm={12} md={8}>
            <Card className="feature-card">
              <RocketOutlined className="feature-icon" />
              <h3>Fácil de usar</h3>
              <p>
                Interfaz intuitiva y sencilla para que puedas monitorear tu
                acuario sin complicaciones.
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className="feature-card">
              <TeamOutlined className="feature-icon" />
              <h3>Conectividad total</h3>
              <p>
                Conéctate desde cualquier dispositivo y accede a los datos de tu
                acuario en tiempo real.
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className="feature-card">
              <ToolOutlined className="feature-icon" />
              <h3>Control avanzado</h3>
              <p>
                Ajusta parámetros como temperatura, pH y nivel de agua de forma
                remota.
              </p>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Llamado a la acción (CTA) */}
      <section className="cta-section">
        <h2>¿Listo para comenzar?</h2>
        <p>
          Regístrate ahora y lleva el control de tu acuario al siguiente nivel.
        </p>
        <Button type="primary" size="large">
          Registrarse
        </Button>
      </section>

    </div>
  )
}

export default Home