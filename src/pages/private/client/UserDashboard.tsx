import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import DeviceStatus from "../../../components/Dashboard/DeviceStatus";
import './UserDashboard.css'

const UserDashboard: React.FC = () => {

  const { user, logout, hasRole } = useAuth();

  if (!user) {
    return <div>No autenticado</div>;
  }

  type DeviceStatusType = "connected" | "disconnected";

  interface AquariumData {
    id: string;
    name: string;
    status: DeviceStatusType;
    pH: number;
    waterLevel: number;
    temperature: number;
  }
  
  const dispositivos: AquariumData[] = [
    { id: "1", name: "Acuario Sala", status: "connected", pH: 7.2, waterLevel: 80, temperature: 26 },
    { id: "2", name: "Acuario Oficina", status: "disconnected", pH: 6.8, waterLevel: 60, temperature: 24 },
    { id: "3", name: "Estanque Jardín", status: "connected", pH: 7.5, waterLevel: 90, temperature: 27 }
  ];

  const handleTemperatureChange = (deviceId: string, newTemp: number) => {
    console.log(`Temperatura del dispositivo ${deviceId} actualizada a: ${newTemp}°C`);
  };

  return (
    <div className="">

      <h1>Bienvenido, {user.nombre}!</h1>
      <p>Email: {user.email}</p>
      <p>Rol: {user.rol}</p>
      {hasRole("admin") && <p>Tienes acceso de administrador</p>}
      <button onClick={logout}>Cerrar sesión</button>

      <div style={{ padding: 24 }}>
        <div>
          <h2>Estado de los Dispositivos</h2>
          <DeviceStatus devices={dispositivos} onTemperatureChange={handleTemperatureChange} />
        </div>
      </div>

    </div>
  );
}
export default UserDashboard;
