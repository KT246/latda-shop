import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <div>
        <h2 className="text-lg">
          404 Not Found
          <span className="border-l-2 ps-2 ms-2">
            Could not find requested resource
          </span>
        </h2>

        <Link className="mt-10 hover:text-blue-700" href="/cashier">
          Return Home
        </Link>
      </div>
    </div>
  );
}
