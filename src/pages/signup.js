import Layout from '@/components/Layout';
import { useState } from 'react';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        alert('ثبت نام با موفقیت انجام شد');
        window.location.href = '/login';
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('خطا در ثبت نام');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4 text-center">ثبت نام</h1>
      <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-bold mb-2"
          >
            نام کاربری
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-bold mb-2"
          >
            رمز عبور
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            ثبت نام
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default SignupPage;
