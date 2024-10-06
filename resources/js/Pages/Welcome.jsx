import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <header className="flex justify-center items-center bg-black px-2 h-16">
                    <div className="flex lg:col-start-2 justify-between">
                        <p className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 uppercase hover:from-yellow-500 hover:to-pink-500 transition duration-700 ease-in-out transform hover:scale-125 hover:rotate-6 hover:skew-y-3 shadow-2xl hover:shadow-pink-500/50 drop-shadow-xl animate-pulse">
                            Landsat
                        </p>
                    </div>
                    <nav className="-mx-3 flex flex-1 justify-end p-2">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div className="">
                                <Link
                                    href={route('login')}
                                    className="mt-6 bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition"
                                >
                                    Log in
                                </Link>
                            </div>
                        )}
                    </nav>
                </header>
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative">

                        <main className=" h-screen">
                            {/* Hero Section */}
                            <section
                                className="bg-cover bg-center h-screen flex items-center justify-center"
                                style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2012/01/09/09/59/earth-11595_1280.jpg')" }}
                            >
                                <div className="bg-black bg-opacity-60 p-12 text-center rounded-2xl shadow-lg backdrop-blur-sm">
                                    <h2 className="text-6xl font-extrabold text-white drop-shadow-lg">
                                        Satellite Data Solutions
                                    </h2>
                                    <p className="text-2xl text-gray-200 mt-6 leading-relaxed mb-5">
                                        Using Landsat 8 and 9 to solve environmental and space challenges.
                                    </p>
                                    <Link
                                        href={route('login')}
                                        className="mt-8 bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-800 transition-transform transform hover:scale-105 shadow-xl"
                                    >
                                        Start Tracking
                                    </Link>
                                </div>
                            </section>


                            {/* About Section */}
                            <section id="about" className="py-20 px-10 bg-white">
                                <h2 className="text-4xl font-bold text-center mb-8">Acerca del Proyecto</h2>
                                <p className="text-lg text-center max-w-3xl mx-auto mb-12">
                                    En este proyecto, estamos utilizando los datos satelitales proporcionados por Landsat 8 y 9
                                    para generar soluciones a los desafíos actuales relacionados con la observación de la Tierra.
                                    Esto incluye el monitoreo del cambio climático, la gestión de recursos naturales, y más.
                                </p>
                                <div className="flex justify-center">
                                    <img
                                        src="/path-to-project-image.jpg"
                                        alt="Project Preview"
                                        className="rounded-lg shadow-lg w-2/3"
                                    />
                                </div>
                            </section>

                            {/* Features Section */}
                            <section id="features" className="py-20 px-10 bg-gray-50">
                                <h2 className="text-4xl font-bold text-center mb-8">Características Principales</h2>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="text-2xl font-bold mb-4">Monitoreo Ambiental</h3>
                                        <p>
                                            Usamos imágenes satelitales de Landsat para monitorear cambios en el medio ambiente, como deforestación, crecimiento urbano y más.
                                        </p>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="text-2xl font-bold mb-4">Análisis de Datos</h3>
                                        <p>
                                            Los datos de Landsat se procesan utilizando técnicas de análisis avanzadas para obtener información clave sobre los recursos naturales.
                                        </p>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="text-2xl font-bold mb-4">Visualización Personalizada</h3>
                                        <p>
                                            Generamos visualizaciones a partir de los datos recolectados, permitiendo la interpretación rápida y eficaz de los resultados.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            CIAZ - challenge space NASA 2024
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
