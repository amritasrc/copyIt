import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="border-t border-gray-800 bg-gray-950 text-gray-400">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
                <div>
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/favicon.jpeg" className="w-10 rounded-xl" alt="" />
                        <span className="font-semibold">CopyIt</span>
                    </Link>
                    <p className="mt-1 text-sm">
                        Save, organize, and access your favorite code snippets anytime.
                    </p>
                </div>

                <div className="flex items-center gap-6 text-sm">
                    <Link
                        to="/"
                        className="transition hover:text-white"
                    >
                        Home
                    </Link>

                    <Link
                        to="/snippets"
                        className="transition hover:text-white"
                    >
                        Snippets
                    </Link>

                    <Link
                        to="/about"
                        className="transition hover:text-white"
                    >
                        About
                    </Link>
                </div>
            </div>

            <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} CopyIt. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;