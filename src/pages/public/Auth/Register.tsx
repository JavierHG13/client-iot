import React, { useState } from 'react'
import { Form, Input, Button, Select, message } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './Register.css'

const { Option } = Select

const Registro: React.FC = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onFinish = async (values: any) => {

        setLoading(true)
        try {
            // Simular una llamada a la API
            console.log('Datos del formulario:', values)
            await new Promise((resolve) => setTimeout(resolve, 1000)) // Simular delay de red

            // Mostrar mensaje de éxito
            message.success('Registro exitoso! Redirigiendo...')

            // Redirigir al usuario después del registro
            setTimeout(() => {
                navigate('/dashboard')
            }, 1500)
        } catch (error) {
            console.log(error)
            message.error('Error al registrar. Inténtelo de nuevo.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="registro-page">
            <div className="registro-card">
                <h1>Regístrate</h1>
                
                <Form
                    form={form}
                    name="registro"
                    onFinish={onFinish}
                    layout="vertical"
                    scrollToFirstError
                >
                    {/* Nombre */}
                    <Form.Item
                        name="nombre"
                        label="Nombre completo"
                        rules={[
                            { required: true, message: 'Por favor ingrese su nombre completo' },
                            { min: 3, message: 'El nombre debe tener al menos 3 caracteres' },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Juan Pérez" />
                    </Form.Item>

                    {/* Correo electrónico */}
                    <Form.Item
                        name="email"
                        label="Correo electrónico"
                        rules={[
                            { required: true, message: 'Por favor ingrese su correo' },
                            { type: 'email', message: 'Ingrese un correo válido' },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="correo@ejemplo.com" />
                    </Form.Item>

                    {/* Contraseña */}
                    <Form.Item
                        name="password"
                        label="Contraseña"
                        rules={[
                            { required: true, message: 'Por favor ingrese su contraseña' },
                            { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
                        ]}
                        hasFeedback
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
                    </Form.Item>

                    {/* Confirmar contraseña */}
                    <Form.Item
                        name="confirmarPassword"
                        label="Confirmar contraseña"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Por favor confirme su contraseña' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject('Las contraseñas no coinciden')
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
                    </Form.Item>

                    {/* Rol (opcional) */}
                    <Form.Item
                        name="rol"
                        label="Rol"
                        rules={[{ required: true, message: 'Por favor seleccione un rol' }]}
                    >
                        <Select placeholder="Seleccione su rol">
                            <Option value="user">Usuario</Option>
                            <Option value="admin">Administrador</Option>
                        </Select>
                    </Form.Item>

                    {/* Botón de registro */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                            size="large"
                        >
                            Registrarse
                        </Button>
                    </Form.Item>
                </Form>

                {/* Enlace para iniciar sesión */}
                <div className="login-link">
                    ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
                </div>
            </div>
        </div>
    )
}

export default Registro