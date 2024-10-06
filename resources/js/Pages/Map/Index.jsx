import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Importamos los iconos de Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Configurar los iconos de Leaflet
function configureLeafletIcons() {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x,
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
    });
}

// Componente para manejar el clic en el mapa y agregar marcadores
function ClickableMap({ onMapClick }) {
    // Escucha los eventos del mapa
    useMapEvents({
        click(e) {
            // Cuando el usuario hace clic en el mapa, obtenemos las coordenadas y ejecutamos la función onMapClick
            onMapClick(e.latlng);
        }
    });
    
    return null; // Este componente no renderiza nada visible, solo maneja eventos.
}

export default function Index() {
    // Configuración de los iconos de Leaflet
    useEffect(() => {
        configureLeafletIcons();
    }, []);

    // Estado para almacenar las ubicaciones seleccionadas
    const [locations, setLocations] = useState([]);

    // Manejar clic en el mapa
    const handleMapClick = (latlng) => {
        // Añadir la nueva ubicación al estado
        setLocations([...locations, latlng]);        
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Mapa interactivo con selección de ubicaciones
                </h2>
            }
        >
            <Head title="Map" />
            <div className="py-5">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    
                    {/* Mapa de Leaflet */}
                    <MapContainer
                        center={[51.505, -0.09]}
                        zoom={13}
                        style={{ height: "500px", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {/* Componente para manejar clics en el mapa */}
                        <ClickableMap onMapClick={handleMapClick} />

                        {/* Renderizar marcadores en las ubicaciones seleccionadas */}
                        {locations.map((location, index) => (
                            <Marker key={index} position={location}>
                                <Popup>
                                    Marcador {index + 1}: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
