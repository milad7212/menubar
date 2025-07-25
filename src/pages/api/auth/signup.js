import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const dbPath = path.join(process.cwd(), 'db.json');

function readDB() {
  const fileContent = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(fileContent);
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const db = readDB();

    if (db.users.find((user) => user.username === username)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now(),
      username,
      password: hashedPassword,
    };

    db.users.push(newUser);
    writeDB(db);

    res.status(201).json({ message: 'User created successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
