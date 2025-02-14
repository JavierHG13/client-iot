import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
//import Loader from "../../../components/Common/Loader";
import './Verficacion.css'

const { Title, Text } = Typography;

const Verificacion: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [codigoExpirado, setCodigoExpirado] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCodigoExpirado(true);
        }, 2 * 60 * 1000); // 2 minutos

        return () => clearTimeout(timer); // Limpiar el timer al desmontar el componente
    }, []);

    // Obtener el código de verificación y el correo del estado de la ruta
    const { email } = location.state || {
        email: "correo@ejemplo.com",
    };

    const onFinish = async (values: { codigo: string }) => {
        setLoading(true);
        try {
            // Simular verificación del código
            if (values.codigo) {
                message.success("¡Código verificado correctamente!");
                navigate("/dashboard"); // Redirigir al dashboard después de la verificación
            } else {
                message.error("Código incorrecto. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.log(error)
            message.error("Error al verificar el código. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

 

    if (codigoExpirado) {
        return (
          <div className="verificacion-container">
            <div className="verificacion-card">
              <Title level={2}>Código expirado</Title>
              <Text>
                El código de verificación ha expirado. Por favor, solicita un nuevo
                código.
              </Text>
              <Button type="primary" onClick={() => navigate("/registro")}>
                Solicitar nuevo código
              </Button>
            </div>
          </div>
        );
      }

    return (
        <div className="verificacion-container">
            <div className="verificacion-card">
                <Title level={2} className="verificacion-title">
                    Verifica tu cuenta
                </Title>
                <Text className="verificacion-subtitle">
                    Te hemos enviado un código de verificación a{" "}
                    <strong>{email}</strong>. Por favor, ingrésalo a continuación.
                </Text>

                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="codigo"
                        label="Código de verificación"
                        rules={[
                            { required: true, message: "Por favor ingresa el código" },
                            { len: 6, message: "El código debe tener 6 caracteres" },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Ej: 2ad77f"
                            maxLength={6}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                            size="large"
                        >
                            Verificar
                        </Button>
                    </Form.Item>
                </Form>

                <Text className="verificacion-nota">
                    Nota: Este código expira en 2 minutos. Si no lo recibes, revisa tu
                    carpeta de spam o solicita un nuevo código.
                </Text>
            </div>
        </div>
    );
};

export default Verificacion;