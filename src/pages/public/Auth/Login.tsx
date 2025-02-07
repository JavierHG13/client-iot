import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { Form, Input, Button, Alert, Typography } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import './Login.css'

const { Title } = Typography

interface LoginValues {
    email: string
    password: string
}

const Login: React.FC = () => {
    const [loading, setLoading,] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { login, user } = useAuth()
    const navigate = useNavigate();


    useEffect(() => {
        if (user) {
          navigate("/dashboard");
        }
      }, [user, navigate]);

    const onFinish = async (values: LoginValues) => {
        setLoading(true)
        setError(null)

        try {
            await login(values);
            
        } catch (err) {
            console.log(err)
            setError('Credenciales incorrectas. Por favor, inténtelo de nuevo.')
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <Title level={2} className="login-title">
                    Iniciar Sesión
                </Title>

                {error && (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        style={{ marginBottom: 24 }}
                    />
                )}

                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        label="Correo Electrónico"
                        rules={[
                            { required: true, message: 'Por favor ingrese su correo' },
                            { type: 'email', message: 'Ingrese un correo válido' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="correo@ejemplo.com"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Contraseña"
                        rules={[
                            { required: true, message: 'Por favor ingrese su contraseña' },
                            { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="••••••••"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={loading}
                            block
                        >
                            Iniciar Sesión
                        </Button>
                    </Form.Item>

                    <div className="login-links">
                        <Link to="/registro">Crear una cuenta</Link>
                        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login