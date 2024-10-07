import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    // Notificaciones ficticias con tiempos más realistas para Landsat 8 y 9
    const notifications = [
        { id: 1, message: 'Landsat 8 ha pasado por tu ubicación', time: 'Hace 1 hora y 3 minutos', satellite: 'Landsat 8' },
        { id: 2, message: 'Landsat 9 ha pasado por tu ubicación', time: 'Hace 1 hora y 4 minutos', satellite: 'Landsat 9' },
        { id: 3, message: 'Landsat 8 ha pasado por tu ubicación', time: 'Hace 2 horas y 6 minutos', satellite: 'Landsat 8' },
        { id: 4, message: 'Landsat 9 ha pasado por tu ubicación', time: 'Hace 2 horas y 7 minutos', satellite: 'Landsat 9' },
        { id: 5, message: 'Landsat 8 ha pasado por tu ubicación', time: 'Hace 5 horas y 45 minutos', satellite: 'Landsat 8' },
        { id: 6, message: 'Landsat 9 ha pasado por tu ubicación', time: 'Hace 5 horas y 46 minutos', satellite: 'Landsat 9' },
        { id: 7, message: 'Landsat 8 ha pasado por tu ubicación', time: 'Hace 1 día', satellite: 'Landsat 8' },
        { id: 8, message: 'Landsat 9 ha pasado por tu ubicación', time: 'Hace 1 día y 1 hora', satellite: 'Landsat 9' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Config Notifications
                </h2>
            }
        >
            <Head title="Satellite Notifications" />
            <div className="py-5">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 rounded-lg shadow-lg ${
                                notification.satellite === 'Landsat 8' ? 'bg-blue-500' : 'bg-red-500'
                            } text-white`}
                        >
                            <p className="text-lg font-semibold">{notification.message}</p>
                            <p className="text-sm text-gray-400">{notification.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
