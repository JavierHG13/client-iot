import React from 'react';
import './About.css';

const About: React.FC = () => {
    return (
        <div className="about-page">
            {/* Título */}
            <h1>Acerca de Nosotros</h1>

            {/* Contenedor principal */}
            <div className="about-container">
                {/* Sección de Introducción */}
                <section className="about-intro">
                    <p>
                        En AquaControl, nos dedicamos a la innovación en el control de calidad del agua para acuarios,
                        estanques y peceras. Nuestra misión es proporcionar tecnología avanzada para el monitoreo y
                        mantenimiento eficiente del agua, asegurando un entorno saludable para la vida acuática.
                    </p>
                </section>

                {/* Sección de Historia */}
                <section className="about-history">
                    <h2>Nuestra Historia</h2>
                    <p>
                        Fundada en 2020, AquaControl nació de la necesidad de proporcionar soluciones accesibles y
                        eficientes para los amantes de la acuariofilia y la acuicultura. Desde entonces, hemos
                        desarrollado dispositivos IoT de última generación que permiten un monitoreo preciso y
                        automatizado del agua.
                    </p>
                </section>

                {/* Sección de Valores */}
                <section className="about-values">
                    <h2>Nuestros Valores</h2>
                    <ul>
                        <li><strong>Innovación:</strong> Apostamos por la tecnología para mejorar la calidad del agua.</li>
                        <li><strong>Sostenibilidad:</strong> Nos preocupamos por el medio ambiente y la conservación de recursos.</li>
                        <li><strong>Compromiso:</strong> Trabajamos para ofrecer productos confiables y eficientes.</li>
                    </ul>
                </section>

                {/* Sección de Equipo */}
                <section className="about-team">
                    <h2>Conoce a Nuestro Equipo</h2>
                    <p>
                        Nuestro equipo está compuesto por ingenieros, biólogos y entusiastas del mundo acuático, unidos
                        por la pasión de mejorar la calidad del agua a través de la tecnología.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default About;
