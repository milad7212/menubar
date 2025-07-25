import Layout from '../components/Layout';
import MenuItem from '../components/MenuItem';

async function getMenuItems() {
  const res = await fetch('http://localhost:3000/api/menu-items', { cache: 'no-store' });
  const menuItems = await res.json();
  return menuItems;
}

const MenuPage = async () => {
  const menuItems = await getMenuItems();

  const menuByCategory = menuItems.reduce((acc, item) => {
    const category = item.category || 'متفرقه';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">منو</h1>
      {Object.entries(menuByCategory).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-700 dark:text-gray-300 border-b-2 border-gray-700 dark:border-gray-300 pb-2">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default MenuPage;
