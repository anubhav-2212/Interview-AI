import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
// import axios from 'axios';

const Login = () => {


    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">
                <h1 className="text-3xl font-bold text-pink-500 text-center mt-2 mb-8">Login</h1>

                {/* Added px-6 to pull email/password away from the edges */}
                <form className="flex flex-col gap-5 px-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-gray-300 text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-gray-300 text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm mt-2">
                        <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded bg-gray-800 border-gray-700" />
                            Remember me
                        </label>
                        <a href="#" className="text-blue-500 hover:text-blue-400 transition">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 mt-2 shadow-lg hover:shadow-blue-500/25"
                    >
                        Login
                    </button>

                    <p className="text-center text-gray-400 text-sm mt-2">
                        Don't have an account?{' '}
                        <a href="#" className="text-blue-500 hover:text-blue-400 transition font-medium">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );

};

export default Login;