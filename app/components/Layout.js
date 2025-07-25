import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            کافه منو
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/menu" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              منو
            </Link>
            <Link href="/add-item" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              اضافه کردن آیتم
            </Link>
            <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              ورود
            </Link>
            <Link href="/signup" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
              ثبت نام
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-6 py-8">{children}</main>
      <footer className="bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; 2024 کافه منو
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
