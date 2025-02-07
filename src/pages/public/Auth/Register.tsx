import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import './Register.css'


interface User {
    nombre: string,
    apellidos: string,
    correo: string,
    telefono: number,
    password: string
}

const Registro: React.FC = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onFinish = async (values: User) => {

        setLoading(true)
        try {

            const response = await axios.post('http://localhost:3000/api/register', values)

            console.log(response.data)

            message.success('Registro exitoso! Redirigiendo...')

            // Redirigir a la vista de verificación con el código y el correo
            navigate("/verificacion", {
                //state: {  email },
            });

        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                console.log(error.response?.data)
                // Manejar errores de Axios
                if (error.response) {
                    // Mostrar el mensaje de error del backend
                    message.error(error.response.data.message);

                    message.error("Error de conexión. Inténtalo de nuevo.");
                }
            } else {
                // Error desconocido
                message.error("Error inesperado. Inténtalo de nuevo.");
            }
        } finally {
            setLoading(false);
        }
    };




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
                        <Input prefix={<UserOutlined />} placeholder="Javier" />
                    </Form.Item>

                    {/* Apellidos */}
                    <Form.Item
                        name="apellidos"
                        label="Apellidos"
                        rules={[
                            { required: true, message: 'Por favor ingrese su apellido' },
                            { min: 10, message: 'El apellido debe tener al menos 5 caracteres' },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Hernandez" />
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

                    {/* Correo electrónico */}
                    <Form.Item
                        name="telefono"
                        label="Telefono"
                        rules={[
                            { required: true, message: 'Por favor ingrese su telefono' },
                            { min: 10, message: 'El telefono minimo 10 numeros' },
                        ]}
                    >

                        <Input prefix={<PhoneOutlined />} placeholder="" />
                    </Form.Item>

                    {/* Contraseña */}
                    <Form.Item
                        name="password"
                        label="Contraseña"
                        rules={[
                            { required: true, message: "Por favor ingrese su contraseña" },
                            { min: 6, message: "La contraseña debe tener al menos 6 caracteres" },
                            {
                                validator: (_, value) => {
                                    const errores = [];
                                    if (!/[A-Z]/.test(value)) errores.push("Debe contener al menos una mayúscula");
                                    if (!/[a-z]/.test(value)) errores.push("Debe contener al menos una minúscula");
                                    if (!/[!@#$%^&*]/.test(value)) errores.push("Debe contener al menos un carácter especial (@$!%*?&)");
                                    
                                    return errores.length > 0 ? Promise.reject(errores) : Promise.resolve();
                                },
                            },
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