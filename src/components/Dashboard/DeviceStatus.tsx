import React, { useState, useEffect } from "react";
import { Slider, Button, Alert, Card, Typography, Select } from "antd";
import {
  DashboardOutlined,
  HeatMapOutlined,
  BulbOutlined,
  ExperimentOutlined
} from "@ant-design/icons";
import "./DeviceStatus.css";

const { Title, Text } = Typography;
const { Option } = Select;

type DeviceStatusType = "connected" | "disconnected";

interface AquariumData {
  id: string;
  name: string;
  status: DeviceStatusType;
  pH: number;
  waterLevel: number;
  temperature: number;
}

interface IoTStatusProps {
  devices: AquariumData[];
  onTemperatureChange?: (deviceId: string, newTemp: number) => void;
}

const DeviceStatus: React.FC<IoTStatusProps> = ({ devices, onTemperatureChange }) => {

  const [selectedDeviceId, setSelectedDeviceId] = useState(devices[0]?.id || "");
  
  const selectedDevice = devices.find((device) => device.id === selectedDeviceId);

  const [tempValue, setTempValue] = useState(selectedDevice?.temperature || 20);
  const [isEditingTemp, setIsEditingTemp] = useState(false);

  useEffect(() => {
    if (selectedDevice) {
      setTempValue(selectedDevice.temperature);
    }
  }, [selectedDevice]);

  const handleTempChange = (value: number) => {
    if (value >= 20 && value <= 30) {
      setTempValue(value);
    }
  };

  const saveTemperature = () => {
    if (onTemperatureChange && selectedDevice) {
      onTemperatureChange(selectedDevice.id, tempValue);
    }
    setIsEditingTemp(false);
  };

  if (!selectedDevice) {
    return <Alert message="No hay dispositivos disponibles" type="warning" showIcon />;
  }

  return (
    <Card className="iot-status-card">
      <div className="status-header">
        <DashboardOutlined className="status-icon" />
        <Title level={4} style={{ margin: 0 }}>Estado del Acuario</Title>
      </div>

      <Select 
        value={selectedDeviceId}
        onChange={setSelectedDeviceId}
        style={{ width: "100%", marginBottom: 16 }}
      >
        {devices.map((device) => (
          <Option key={device.id} value={device.id}>
            {device.name} ({device.status === "connected" ? "Conectado" : "Desconectado"})
          </Option>
        ))}
      </Select>

      <div className="sensor-data">
        {/* Temperatura */}
        <div className="data-item">
          <HeatMapOutlined className="data-icon" />
          <div className="data-content">
            <Text strong>Temperatura:</Text>
            {isEditingTemp ? (
              <div className="temp-control">
                <Slider
                  min={20}
                  max={30}
                  step={0.5}
                  value={tempValue}
                  onChange={handleTempChange}
                  style={{ width: 200 }}
                />
                <Button type="primary" onClick={saveTemperature} style={{ marginLeft: 16 }}>
                  Guardar
                </Button>
              </div>
            ) : (
              <Text>
                {tempValue}°C{" "}
                <Button type="link" onClick={() => setIsEditingTemp(true)}>Editar</Button>
              </Text>
            )}
          </div>
        </div>

        {/* Nivel de pH */}
        <div className="data-item">
          <BulbOutlined className="data-icon" />
          <div className="data-content">
            <Text strong>Nivel de pH:</Text>
            <Text>{selectedDevice.pH}</Text>
          </div>
        </div>

        {/* Nivel de Agua */}
        <div className="data-item">
          <ExperimentOutlined className="data-icon" />
          <div className="data-content">
            <Text strong>Nivel de Agua:</Text>
            <Text>{selectedDevice.waterLevel}%</Text>
          </div>
        </div>
      </div>

      {selectedDevice.status === "disconnected" && (
        <Alert
          message="Dispositivo desconectado"
          description="El dispositivo IoT no está enviando datos. Verifica la conexión."
          type="error"
          showIcon
          style={{ marginTop: 16 }}
        />
      )}
    </Card>
  );
};

export default DeviceStatus;
