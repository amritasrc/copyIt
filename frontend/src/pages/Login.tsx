import { useState } from 'react'
import axios from 'axios';
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        try {
            const response = await api.post("/users/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);

            navigate("/dashboard");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Something went wrong");
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-12">
            <div className="w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <img src="/favicon.png" alt="CopyIt" className="mx-auto mb-3 h-12 w-12 rounded-full" />
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">CopyIt</h1>
                    <p className="mt-2 text-sm text-neutral-500">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            aria-required="true"
                            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-1"
                        />
                    </div>

                    <div>
                        <div className="mb-1.5 flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                                Password
                            </label>
                            <a href="#" className="text-sm text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            aria-required="true"
                            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-1"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember"
                            type="checkbox"
                            name="remember"
                            className="h-4 w-4 rounded border-neutral-300 bg-white accent-neutral-900"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-neutral-600">
                            Remember me
                        </label>
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                    >
                        Sign in
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-500">
                    Don&apos;t have an account?{' '}
                    <Link to='/signup' className="font-medium text-neutral-900 underline-offset-4 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login