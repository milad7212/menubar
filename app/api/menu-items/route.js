import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const dbPath = path.join(process.cwd(), 'db.json');

async function readDB() {
  const fileContent = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(fileContent);
}

async function writeDB(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const db = await readDB();
  return NextResponse.json(db.menuItems);
}

export async function POST(request) {
  const db = await readDB();
  const newItem = await request.json();
  newItem.id = Date.now();
  db.menuItems.push(newItem);
  await writeDB(db);
  return NextResponse.json(newItem, { status: 201 });
}
