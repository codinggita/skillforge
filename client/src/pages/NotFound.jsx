import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg glass rounded-3xl p-12 border border-white/5 glow-purple">
        <h1 className="text-9xl font-black gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Let's get you back to writing some sweet code!
        </p>
        <Link
          to="/"
          className="inline-flex px-8 py-3.5 gradient-brand text-white font-bold rounded-xl hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
