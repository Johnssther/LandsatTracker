import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import * as satellite from 'satellite.js';

// TLE (Two-Line Element) para Landsat 8 y 9
// const TLE_LANDSAT_8 = [
//     '1 39084U 13008A   22222.27637483  .00000036  00000-0  22627-4 0  9994',
//     '2 39084  98.2085 172.5241 0001570  98.1601 261.9886 14.57102522505916',
// ];

const TLE_LANDSAT_8 = [
    '1 39084U 13008A   24280.79344377  .00002481  00000-0  56051-3 0  9991',
    '2 39084  98.2180 348.9979 0001313  94.2857 265.8492 14.57116925619661'
];



const TLE_LANDSAT_9 = [
    '1 49260U 21088A   24280.82780792  .00002639  00000-0  59538-3 0  9992',
    '2 49260  98.2208 349.0303 0001273  90.8261 269.3083 14.57127514160941'
];




// URL del icono personalizado de satélite
const satelliteIconUrl = 'http://137.184.49.59//img/iconsatellite.svg';

// Configurar el nuevo icono personalizado de Leaflet
const satelliteIcon = new L.Icon({
    iconUrl: satelliteIconUrl,
    iconSize: [38, 38], // tamaño del icono
    iconAnchor: [19, 19], // posición del icono
    popupAnchor: [0, -19], // posición del popup respecto al icono
});

// Función para obtener la ubicación del satélite en un momento específico
const getSatellitePositionAtTime = (tle, date) => {
    const satrec = satellite.twoline2satrec(tle[0], tle[1]);
    const positionAndVelocity = satellite.propagate(satrec, date);
    const position = satellite.eciToGeodetic(
        positionAndVelocity.position,
        satellite.gstime(date)
    );
    return {
        lat: satellite.degreesLat(position.latitude),
        lng: satellite.degreesLong(position.longitude),
    };
};

// Función para obtener las posiciones históricas de los últimos 5 minutos
const getHistoricalPositions = (tle, intervalSeconds, totalMinutes) => {
    const now = new Date();
    const historicalPositions = [];
    for (let i = totalMinutes * 60; i >= 0; i -= intervalSeconds) {
        const pastTime = new Date(now.getTime() - i * 1000);
        const position = getSatellitePositionAtTime(tle, pastTime);
        historicalPositions.push(position);
    }
    return historicalPositions;
};

export default function Index() {
    const [landsat8Position, setLandsat8Position] = useState(null);
    const [landsat9Position, setLandsat9Position] = useState(null);
    const [landsat8Trajectory, setLandsat8Trajectory] = useState([]); // Guarda las posiciones anteriores de Landsat 8
    const [landsat9Trajectory, setLandsat9Trajectory] = useState([]); // Guarda las posiciones anteriores de Landsat 9

    // Obtener las posiciones históricas y actuales inmediatamente después de cargar
    useEffect(() => {
        // Cálculo de posiciones históricas al cargar la página
        const historicalLandsat8 = getHistoricalPositions(TLE_LANDSAT_8, 5, 120); // Intervalo de 5 segundos durante 5 minutos
        const historicalLandsat9 = getHistoricalPositions(TLE_LANDSAT_9, 5, 120);

        setLandsat8Trajectory(historicalLandsat8);
        setLandsat9Trajectory(historicalLandsat9);

        // Cálculo inmediato de las posiciones actuales
        const currentLandsat8Position = getSatellitePositionAtTime(TLE_LANDSAT_8, new Date());
        const currentLandsat9Position = getSatellitePositionAtTime(TLE_LANDSAT_9, new Date());

        setLandsat8Position(currentLandsat8Position);
        setLandsat9Position(currentLandsat9Position);
    }, []);

    // Actualiza las posiciones actuales de Landsat 8 y 9 cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            const newLandsat8Position = getSatellitePositionAtTime(TLE_LANDSAT_8, new Date());
            const newLandsat9Position = getSatellitePositionAtTime(TLE_LANDSAT_9, new Date());

            setLandsat8Position(newLandsat8Position);
            setLandsat9Position(newLandsat9Position);

            // Actualiza la trayectoria acumulando posiciones actuales
            setLandsat8Trajectory((prev) => [...prev, newLandsat8Position]);
            setLandsat9Trajectory((prev) => [...prev, newLandsat9Position]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Global Satellite Tracking - Landsat 8 & 9
                </h2>
            }
        >
            <Head title="Satellite Map" />
            <div className="py-5">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    
                    {/* Mapa de Leaflet */}
                    <MapContainer
                        center={[0, 0]} // Centrado a nivel mundial
                        zoom={2}
                        style={{ height: "600px", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {/* Marker y trayectoria para Landsat 8 */}
                        {landsat8Position && (
                            <>
                                <Marker 
                                    position={[landsat8Position.lat, landsat8Position.lng]} 
                                    icon={satelliteIcon} // Asigna el icono personalizado
                                >
                                    <Popup>
                                        Landsat 8<br />
                                        Lat: {landsat8Position.lat.toFixed(4)}, Lng: {landsat8Position.lng.toFixed(4)}
                                    </Popup>
                                </Marker>
                                <Polyline positions={landsat8Trajectory} color="blue" />
                            </>
                        )}

                        {/* Marker y trayectoria para Landsat 9 */}
                        {landsat9Position && (
                            <>
                                <Marker 
                                    position={[landsat9Position.lat, landsat9Position.lng]} 
                                    icon={satelliteIcon} // Asigna el icono personalizado
                                >
                                    <Popup>
                                        Landsat 9<br />
                                        Lat: {landsat9Position.lat.toFixed(4)}, Lng: {landsat9Position.lng.toFixed(4)}
                                    </Popup>
                                </Marker>
                                <Polyline positions={landsat9Trajectory} color="red" />
                            </>
                        )}
                    </MapContainer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
