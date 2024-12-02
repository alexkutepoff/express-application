-- Создание базы данных, если она еще не существует
CREATE DATABASE IF NOT EXISTS expressapplication;

USE expressapplication;

-- Создание таблицы транзакций
CREATE TABLE
    transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        dateTime DATETIME NOT NULL,
        author VARCHAR(50) NOT NULL,
        sum DECIMAL(10, 2) NOT NULL,
        category VARCHAR(50) NOT NULL,
        comment TEXT
    );