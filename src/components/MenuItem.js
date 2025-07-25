import Link from 'next/link';

const MenuItem = ({ item }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
      <div className="flex justify-between items-center">
        <span className="font-bold">{item.price} تومان</span>
        <div>
          <Link href={`/edit-item/${item.id}`} className="text-blue-500 hover:underline mr-4">
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
    </div>
  );
};

export default MenuItem;
