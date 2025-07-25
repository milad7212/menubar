import Layout from '@/components/Layout';
import { useState } from 'react';
import withAuth from '@/hocs/withAuth';

const AddItemPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/menu-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price: parseFloat(price), description }),
      });
      if (res.ok) {
        alert('آیتم با موفقیت اضافه شد');
        setName('');
        setPrice('');
        setDescription('');
      } else {
        alert('خطا در اضافه کردن آیتم');
      }
    } catch (error) {
      console.error(error);
      alert('خطا در اضافه کردن آیتم');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">اضافه کردن آیتم جدید</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold mb-2">
            نام آیتم
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-bold mb-2">
            قیمت
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-bold mb-2">
            توضیحات
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            اضافه کردن
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default withAuth(AddItemPage);
