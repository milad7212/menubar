import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const dbPath = path.join(process.cwd(), 'db.json');

async function readDB() {
  const fileContent = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(fileContent);
}

async function writeDB(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export async function POST(request) {
  const { username, password } = await request.json();
  const db = await readDB();

  if (db.users.find((user) => user.username === username)) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    username,
    password: hashedPassword,
  };

  db.users.push(newUser);
  await writeDB(db);

  return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}
