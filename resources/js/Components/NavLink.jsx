import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-400 text-gray-100 focus:border-indigo-700'
                    : 'border-transparent text-gray-100 hover:border-gray-300 hover:text-gray-100 focus:border-gray-100 focus:text-gray-100') +
                className
            }
        >
            {children}
        </Link>
    );
}
