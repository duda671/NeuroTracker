import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(__dirname, '../data.json');

interface Report {
  id: string;
  report: string;
}

interface User {
  id: string;
  userName: string;
  userAge: string;
  reports: Report[];
}

interface Database {
  users: User[];
}

const readDatabase = (): Database => {
  const rawData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(rawData);
};

const writeDatabase = (data: Database) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

const addUser = (user: User) => {
  const db = readDatabase();
  db.users.push(user);
  writeDatabase(db);
};

const addReportToUser = (userId: string, report: Report) => {
  const db = readDatabase();
  const user = db.users.find(user => user.id === userId);
  if (user) {
    user.reports.push(report);
    writeDatabase(db);
  } else {
    throw new Error('User not found');
  }
};

const getUserById = (id: string): User | undefined => {
  const db = readDatabase();
  return db.users.find(user => user.id === id);
};

const getReportsByUserId = (userId: string): Report[] | undefined => {
  const user = getUserById(userId);
  return user ? user.reports : undefined;
};

const getUserByName = (userName: string) => {
  const db = readDatabase();
  return db.users.find(user => user.userName === userName);
};


export { addUser,writeDatabase, addReportToUser, getUserById, getUserByName,getReportsByUserId, readDatabase };
