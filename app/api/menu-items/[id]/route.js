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

export async function GET(request, { params }) {
  const db = await readDB();
  const menuItem = db.menuItems.find((item) => item.id === parseInt(params.id));
  if (!menuItem) {
    return NextResponse.json({ message: 'Menu item not found' }, { status: 404 });
  }
  return NextResponse.json(menuItem);
}

export async function PUT(request, { params }) {
  const db = await readDB();
  const menuItemIndex = db.menuItems.findIndex((item) => item.id === parseInt(params.id));
  if (menuItemIndex === -1) {
    return NextResponse.json({ message: 'Menu item not found' }, { status: 404 });
  }
  const updatedItemData = await request.json();
  const updatedItem = {
    ...db.menuItems[menuItemIndex],
    ...updatedItemData,
  };
  db.menuItems[menuItemIndex] = updatedItem;
  await writeDB(db);
  return NextResponse.json(updatedItem);
}

export async function DELETE(request, { params }) {
  const db = await readDB();
  const menuItemIndex = db.menuItems.findIndex((item) => item.id === parseInt(params.id));
  if (menuItemIndex === -1) {
    return NextResponse.json({ message: 'Menu item not found' }, { status: 404 });
  }
  const [deletedItem] = db.menuItems.splice(menuItemIndex, 1);
  await writeDB(db);
  return NextResponse.json(deletedItem);
}
