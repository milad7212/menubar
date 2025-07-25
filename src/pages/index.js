import Layout from '@/components/Layout';
import Link from 'next/link';

const HomePage = () => {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">به کافه منو خوش آمدید</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          راهی آسان برای ساختن منوی کافه شما
        </p>
        <Link href="/menu" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          مشاهده منو
        </Link>
      </div>
    </Layout>
  );
};

export default HomePage;
