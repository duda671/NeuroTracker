"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDatabase = exports.getReportsByUserId = exports.getUserByName = exports.getUserById = exports.addReportToUser = exports.writeDatabase = exports.addUser = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dataFilePath = path_1.default.join(__dirname, '../data.json');
const readDatabase = () => {
    const rawData = fs_1.default.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(rawData);
};
exports.readDatabase = readDatabase;
const writeDatabase = (data) => {
    fs_1.default.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};
exports.writeDatabase = writeDatabase;
const addUser = (user) => {
    const db = readDatabase();
    db.users.push(user);
    writeDatabase(db);
};
exports.addUser = addUser;
const addReportToUser = (userId, report) => {
    const db = readDatabase();
    const user = db.users.find(user => user.id === userId);
    if (user) {
        user.reports.push(report);
        writeDatabase(db);
    }
    else {
        throw new Error('User not found');
    }
};
exports.addReportToUser = addReportToUser;
const getUserById = (id) => {
    const db = readDatabase();
    return db.users.find(user => user.id === id);
};
exports.getUserById = getUserById;
const getReportsByUserId = (userId) => {
    const user = getUserById(userId);
    return user ? user.reports : undefined;
};
exports.getReportsByUserId = getReportsByUserId;
const getUserByName = (userName) => {
    const db = readDatabase();
    return db.users.find(user => user.userName === userName);
};
exports.getUserByName = getUserByName;
