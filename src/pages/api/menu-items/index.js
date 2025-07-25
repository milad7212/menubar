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
  if (req.method === 'GET') {
    const db = readDB();
    res.status(200).json(db.menuItems);
  } else if (req.method === 'POST') {
    const db = readDB();
    const newItem = {
      id: Date.now(),
      ...req.body,
    };
    db.menuItems.push(newItem);
    writeDB(db);
    res.status(201).json(newItem);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
