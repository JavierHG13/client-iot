import React from 'react';
import { Layout, Row, Col } from 'antd';
import { 
  FacebookFilled, 
  TwitterCircleFilled, 
  InstagramFilled, 
  LinkedinFilled,
  QuestionCircleOutlined,
  InfoCircleOutlined,
  BookOutlined,
  MailOutlined
} from '@ant-design/icons';
import './Footer.css';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  
  return (
    <Footer className="main-footer">
      <Row gutter={[24, 24]}>
        {/* Sección Sobre nosotros */}
        <Col xs={24} sm={12} md={6}>
          <div className="footer-section">
            <h3>AquaControl</h3>
            <ul className="footer-links">
              <li><a href="/sobre-nosotros"><InfoCircleOutlined /> Sobre nosotros</a></li>
              <li><a href="/blog"><BookOutlined /> Blog</a></li>
              <li><a href="/equipo"><BookOutlined /> Nuestro equipo</a></li>
              <li><a href="/socios"><BookOutlined /> Socios</a></li>
            </ul>
          </div>
        </Col>

        {/* Sección Legal */}
        <Col xs={24} sm={12} md={6}>
          <div className="footer-section">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li><a href="/politica-privacidad"><BookOutlined /> Política de privacidad</a></li>
              <li><a href="/terminos-servicio"><BookOutlined /> Términos de servicio</a></li>
              <li><a href="/politica-cookies"><BookOutlined /> Política de cookies</a></li>
              <li><a href="/garantias"><BookOutlined /> Garantías</a></li>
            </ul>
          </div>
        </Col>

        {/* Sección Soporte */}
        <Col xs={24} sm={12} md={6}>
          <div className="footer-section">
            <h3>Soporte</h3>
            <ul className="footer-links">
              <li><a href="/faq"><QuestionCircleOutlined /> Preguntas frecuentes</a></li>
              <li><a href="/soporte-tecnico"><QuestionCircleOutlined /> Soporte técnico</a></li>
              <li><a href="/contacto"><MailOutlined /> Contacto</a></li>
              <li><a href="/centro-ayuda"><QuestionCircleOutlined /> Centro de ayuda</a></li>
            </ul>
          </div>
        </Col>

        {/* Sección Redes sociales */}
        <Col xs={24} sm={12} md={6}>
          <div className="footer-section">
            <h3>Conéctate</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookFilled className="social-icon" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterCircleFilled className="social-icon" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramFilled className="social-icon" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedinFilled className="social-icon" />
              </a>
            </div>
            
            <div className="newsletter">
              <h4>Suscríbete a nuestro boletín</h4>
              <input type="email" placeholder="Tu correo electrónico" />
              <button>Suscribirse</button>
            </div>
          </div>
        </Col>
      </Row>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} AquaControl. Todos los derechos reservados.</p>
        <div className="payment-methods">
          <span>Métodos de pago:</span>
          <img src="/visa.png" alt="Visa" />
          <img src="/mastercard.png" alt="Mastercard" />
          <img src="/paypal.png" alt="PayPal" />
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;