import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import * as satellite from 'satellite.js';

// TLE (Two-Line Element) para Landsat 8 y 9
const TLE_LANDSAT_8 = [
    '1 39084U 13008A   22222.27637483  .00000036  00000-0  22627-4 0  9994',
    '2 39084  98.2085 172.5241 0001570  98.1601 261.9886 14.57102522505916',
];
const TLE_LANDSAT_9 = [
    '1 49260U 21088A   22222.23409167 -.00000129  00000-0  00000+0 0  9991',
    '2 49260  98.2022 205.6764 0001391  98.7123 261.4237 14.57195847 13413',
];

// URL del icono personalizado de satélite
const satelliteIconUrl = 'http://localhost/LandsatTracker/public/img/iconsatellite.svg';

// Configurar el nuevo icono personalizado de Leaflet
const satelliteIcon = new L.Icon({
    iconUrl: satelliteIconUrl,
    iconSize: [38, 38], // tamaño del icono
    iconAnchor: [19, 19], // posición del icono
    popupAnchor: [0, -19], // posición del popup respecto al icono
});

// Función para obtener la ubicación del satélite en tiempo real
const getSatellitePosition = (tle) => {
    const satrec = satellite.twoline2satrec(tle[0], tle[1]);
    const now = new Date();
    const positionAndVelocity = satellite.propagate(satrec, now);
    const position = satellite.eciToGeodetic(
        positionAndVelocity.position,
        satellite.gstime(now)
    );
    return {
        lat: satellite.degreesLat(position.latitude),
        lng: satellite.degreesLong(position.longitude),
    };
};

export default function Index() {
    const [landsat8Position, setLandsat8Position] = useState(null);
    const [landsat9Position, setLandsat9Position] = useState(null);
    const [landsat8Trajectory, setLandsat8Trajectory] = useState([]); // Guarda las posiciones anteriores de Landsat 8
    const [landsat9Trajectory, setLandsat9Trajectory] = useState([]); // Guarda las posiciones anteriores de Landsat 9

    // Actualiza las posiciones de Landsat 8 y 9 cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            const newLandsat8Position = getSatellitePosition(TLE_LANDSAT_8);
            const newLandsat9Position = getSatellitePosition(TLE_LANDSAT_9);

            setLandsat8Position(newLandsat8Position);
            setLandsat9Position(newLandsat9Position);

            // Actualiza la trayectoria acumulando posiciones anteriores
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
