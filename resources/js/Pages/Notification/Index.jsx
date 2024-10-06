import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index() {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Config Notifications
                </h2>
            }
        >
            <Head title="Map" />
            <div className="py-5">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident dolorum nesciunt facilis aliquid culpa, ratione incidunt, et doloribus cupiditate, dolorem reprehenderit id quam voluptatum sed cumque deleniti perferendis facere autem?</p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
