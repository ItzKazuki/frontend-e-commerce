import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-extrabold">ERROR</h1>
      <h1 className="text-2xl text-red-700 font-extrabold mt-2">404</h1>
      <img src="http://local.kazukikun.space:8000/assets/img/not-found.svg" width={350} className="py-4" alt="Error" />
      <h1 className="text-lg">Page Not Found</h1>
      <Link to={'/'} className="btn btn-primary mt-3 text-xl">Go Back</Link>
    </div>
  );
}
