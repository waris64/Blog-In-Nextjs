import React from 'react';
import Link from 'next/link';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-lg font-bold">Admin Panel</div>
        <ul className="flex flex-col flex-grow">
          <li className="p-3 hover:bg-gray-700">
            <Link href="/admin">
              <a>Dashboard</a>
            </Link>
          </li>
          <li className="p-3 hover:bg-gray-700">
            <Link href="/admin/create">
              <a>Create Blog</a>
            </Link>
          </li>
          <li className="p-3 hover:bg-gray-700">
            <Link href="/admin/manage">
              <a>Manage Blogs</a>
            </Link>
          </li>
        </ul>
        <div className="p-4 text-sm border-t border-gray-700">© 2025 Admin Panel</div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
