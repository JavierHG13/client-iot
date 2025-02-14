import React, {useState} from 'react'
import { Form, Input, Button, message } from 'antd'
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons'
import './Contacto.css'

const { TextArea } = Input

interface Mensaje {
    correo: string;
    mensaje: string;
}

const Contacto: React.FC = () => {
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onFinish = async (values: Mensaje) => {
        try {
            // Simular envío del formulario
            console.log('Datos del formulario:', values)
            await new Promise((resolve) => setTimeout(resolve, 1000)) // Simular delay de red

            // Mostrar mensaje de éxito
            message.success('Mensaje enviado correctamente!')

            setIsLoading(false)
            // Limpiar el formulario
            form.resetFields()
        } catch (error) {
            console.log(error)
            message.error('Error al enviar el mensaje. Inténtelo de nuevo.')
        }finally{
            setIsLoading(true)
        }
    }

    return (
        <div className="contacto-page">
            {/* Título */}
            <h1>Contacto</h1>

            {/* Contenedor principal */}
            <div className="contacto-container">
                {/* Formulario de contacto */}
                <div className="form-section">
                    <h2>Envíanos un mensaje</h2>
                    <Form form={form} name="contacto" onFinish={onFinish} layout="vertical">
                        <Form.Item
                            name="nombre"
                            label="Nombre completo"
                            rules={[
                                { required: true, message: 'Por favor ingrese su nombre' },
                                { min: 3, message: 'El nombre debe tener al menos 3 caracteres' },
                            ]}
                        >
                            <Input placeholder="Juan Pérez" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Correo electrónico"
                            rules={[
                                { required: true, message: 'Por favor ingrese su correo' },
                                { type: 'email', message: 'Ingrese un correo válido' },
                            ]}
                        >
                            <Input placeholder="correo@ejemplo.com" />
                        </Form.Item>

                        <Form.Item
                            name="mensaje"
                            label="Mensaje"
                            rules={[
                                { required: true, message: 'Por favor ingrese su mensaje' },
                                { min: 10, message: 'El mensaje debe tener al menos 10 caracteres' },
                            ]}
                        >
                            <TextArea rows={6} placeholder="Escribe tu mensaje aquí..." />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={isLoading} block>
                                Enviar mensaje
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                {/* Información de contacto y mapa */}
                <div className="info-section">
                    <h2>Información de contacto</h2>

                    <div className="contact-info">
                        <div className="info-item">
                            <MailOutlined className="info-icon" />
                            <p>correo@aquacontrol.com</p>
                        </div>

                        <div className="info-item">
                            <PhoneOutlined className="info-icon" />
                            <p>+52 55 1234 5678</p>
                        </div>

                        <div className="info-item">
                            <EnvironmentOutlined className="info-icon" />
                            <p>Av. Siempre Viva 123, Ciudad de México, México</p>
                        </div>
                    </div>

                    {/* Mapa interactivo (Google Maps) */}
                    <div className="map-container">
                        <iframe
                            title="Ubicación de AquaControl"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.888614771603!2d-99.1678266845337!3d19.42702074608138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sEl%20%C3%81ngel%20de%20la%20Independencia!5e0!3m2!1ses!2smx!4v1633036787894!5m2!1ses!2smx"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contacto