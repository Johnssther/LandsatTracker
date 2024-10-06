import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0"
        style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2013/03/11/02/13/united-states-92351_1280.jpg')" }}>
            <div>
                <Link href="/">
                    <p>Landsat</p>
                </Link>
            </div>

            <div className="mt-6 w-full bg-white/80 overflow-hidden px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
