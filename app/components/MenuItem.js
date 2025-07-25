'use client';
import Link from 'next/link';
import Image from 'next/image';

const MenuItem = ({ item }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-transform hover:scale-105">
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={300}
        height={200}
        className="rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-lg text-green-500">{item.price} تومان</span>
        <div>
          {item.videoUrl && (
            <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mr-4">
              ویدیو
            </a>
          )}
          {item.audioUrl && (
            <a href={item.audioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              صوت
            </a>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Link href={`/edit-item/${item.id}`} className="text-blue-500 hover:underline">
          ویرایش
        </Link>
        <button
          onClick={async () => {
            if (confirm('آیا از حذف این آیتم مطمئن هستید؟')) {
              const res = await fetch(`/api/menu-items/${item.id}`, {
                method: 'DELETE',
              });
              if (res.ok) {
                alert('آیتم با موفقیت حذف شد');
                window.location.reload();
              } else {
                alert('خطا در حذف آیتم');
              }
            }
          }}
          className="text-red-500 hover:underline"
        >
          حذف
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
