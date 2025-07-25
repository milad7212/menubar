import Layout from '@/components/Layout';
import MenuItem from '@/components/MenuItem';

const MenuPage = ({ menuItems }) => {
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

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/menu-items');
  const menuItems = await res.json();

  return {
    props: {
      menuItems,
    },
  };
}

export default MenuPage;
