import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-between">
          <Link href="/" className="text-xl font-bold">
            کافه منو
          </Link>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/menu">منو</Link>
            </li>
            <li>
              <Link href="/add-item">اضافه کردن آیتم</Link>
            </li>
            <li>
              <Link href="/login">ورود</Link>
            </li>
            <li>
              <Link href="/signup">ثبت نام</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 کافه منو</p>
      </footer>
    </div>
  );
};

export default Layout;
