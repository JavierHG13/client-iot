import React from 'react'
import './Footer.css'
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; @2025, Todos los derechos reservados.</p>
        <nav>
          <a href="/politica-privacidad">Política de Privacidad</a>
          <a href="/terminos">Términos y Condiciones</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer