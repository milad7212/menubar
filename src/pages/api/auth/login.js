import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const dbPath = path.join(process.cwd(), 'db.json');

function readDB() {
  const fileContent = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(fileContent);
}

const SECRET_KEY = 'your_secret_key'; // In a real app, use an environment variable

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const db = readDB();
    const user = db.users.find((user) => user.username === username);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
