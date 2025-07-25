import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const dbPath = path.join(process.cwd(), 'db.json');

async function readDB() {
  const fileContent = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(fileContent);
}

const SECRET_KEY = 'your_secret_key'; // In a real app, use an environment variable

export async function POST(request) {
  const { username, password } = await request.json();
  const db = await readDB();
  const user = db.users.find((user) => user.username === username);

  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: '1h',
  });

  return NextResponse.json({ token });
}
