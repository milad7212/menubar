import Layout from '../components/Layout';
import MenuItem from '../components/MenuItem';

async function getMenuItems() {
  const res = await fetch('http://localhost:3000/api/menu-items', { cache: 'no-store' });
  const menuItems = await res.json();
  return menuItems;
}

const MenuPage = async () => {
  const menuItems = await getMenuItems();

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">منو</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </Layout>
  );
};

export default MenuPage;
