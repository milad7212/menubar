import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

function readDB() {
  const fileContent = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(fileContent);
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  const { id } = req.query;
  const db = readDB();
  const menuItemIndex = db.menuItems.findIndex((item) => item.id === parseInt(id));

  if (menuItemIndex === -1) {
    return res.status(404).json({ message: 'Menu item not found' });
  }

  if (req.method === 'GET') {
    res.status(200).json(db.menuItems[menuItemIndex]);
  } else if (req.method === 'PUT') {
    const updatedItem = {
      ...db.menuItems[menuItemIndex],
      ...req.body,
    };
    db.menuItems[menuItemIndex] = updatedItem;
    writeDB(db);
    res.status(200).json(updatedItem);
  } else if (req.method === 'DELETE') {
    const deletedItem = db.menuItems.splice(menuItemIndex, 1);
    writeDB(db);
    res.status(200).json(deletedItem[0]);
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
