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
                    <div className="">

                        <main className=" h-screen w-screen">

                            <section
                                className="bg-cover bg-center h-screen flex items-center justify-center"
                                style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2012/01/09/09/59/earth-11595_1280.jpg')" }}
                            >
                                <div className="bg-black bg-opacity-60 p-12 text-center rounded-2xl shadow-lg backdrop-blur-sm">
                                    <h2 className="text-6xl font-extrabold text-white drop-shadow-lg">
                                        🚨 Your Crops Are at Risk
                                    </h2>
                                    <p className="text-2xl text-gray-200 mt-6 leading-relaxed mb-5">
                                        Are you making the best decisions for your land? 🌱 Without real-time data, your yields could be suffering. Get insights from Landsat 8 and 9 today and take control of your farm's future.
                                    </p>
                                    <Link
                                        href={route('login')}
                                        className="mt-8 bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-800 transition-transform transform hover:scale-105 shadow-xl"
                                    >
                                        Start Tracking 🌍
                                    </Link>
                                    <p className="text-lg text-gray-400 mt-4">
                                        🚀 Join us in the NASA Space Apps Challenge 2024!
                                    </p>
                                </div>
                            </section>
                            <section className="bg-white text-gray-800 py-20">
                                <div className="max-w-6xl mx-auto text-center">
                                    <h2 className="text-4xl font-semibold mb-10">💡 What’s the Problem?</h2>
                                    <p className="text-xl">
                                        Keeping the soil fertile and productive for each harvest requires constant evaluation of its condition.
                                        Without precise data, you could be making risky decisions that lower the quality of your crops. 🌾
                                    </p>
                                </div>
                            </section>

                            <section className="bg-gray-100 py-20">
                                <div className="max-w-6xl mx-auto text-center  text-gray-700">
                                    <h2 className="text-4xl font-semibold mb-10">🚀 The Solution</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="p-6 bg-white rounded-lg shadow-md">
                                            <h3 className="text-2xl font-bold">🛰️ Real-Time Satellite Monitoring</h3>
                                            <p className="mt-4">Know the real-time status of your land thanks to Landsat 8 and 9 satellite data.</p>
                                        </div>
                                        <div className="p-6 bg-white rounded-lg shadow-md">
                                            <h3 className="text-2xl font-bold">📊 Precise Terrain Analysis</h3>
                                            <p className="mt-4">Evaluate soil reflectance and make informed decisions about when to let the land rest or start the next planting.</p>
                                        </div>
                                        <div className="p-6 bg-white rounded-lg shadow-md">
                                            <h3 className="text-2xl font-bold">🔔 Custom Notifications</h3>
                                            <p className="mt-4">Receive alerts when the satellite passes over your zone and access the latest data.</p>
                                        </div>
                                        <div className="p-6 bg-white rounded-lg shadow-md">
                                            <h3 className="text-2xl font-bold">📅 Data History</h3>
                                            <p className="mt-4">Access historical data and optimize your agricultural decisions for the long term.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-slate-800 text-white py-20">
                                <div className="max-w-6xl mx-auto text-center">
                                    <h2 className="text-4xl font-semibold mb-10">🌍 Ready to Start Monitoring Today?</h2>
                                    <p className="text-lg mb-10">
                                        Increase your crop productivity and make decisions based on scientific data.
                                        Don’t leave the next harvest to chance. It’s time to monitor intelligently! 🚜
                                    </p>
                                    <Link
                                        href={route('login')}
                                        className="mt-8 bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition-transform transform hover:scale-105 shadow-xl"
                                    >
                                        Start Tracking 🌍
                                    </Link>
                                </div>
                            </section>


                            <footer className="bg-black text-white py-6">
                                <div className="max-w-6xl mx-auto text-center">
                                    <p className="text-sm">Participants:</p>
                                    <p className="text-lg font-semibold">Mayelin Stefania Aguilar & John Alejandro Hernandez</p>
                                    <a
                                        href="https://www.spaceappschallenge.org/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline mt-2 block"
                                    >
                                        https://www.spaceappschallenge.org/
                                    </a>
                                </div>
                            </footer>
                        </main>


                    </div>
                </div>
            </div>
        </>
    );
}
