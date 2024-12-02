-- Использование базы данных
USE expressapplication;

-- Заполнение таблицы transactions тестовыми данными
INSERT INTO
    transactions (dateTime, author, sum, category, comment)
VALUES
    (
        '2024-12-01 14:30:00',
        'Alice',
        100.50,
        'Продукты',
        'Bought fruits and vegetables'
    ),
    (
        '2024-12-01 16:00:00',
        'Bob',
        200.00,
        'Продукты',
        'Purchased headphones'
    ),
    (
        '2024-12-02 09:15:00',
        'Charlie',
        50.75,
        'Транспорт',
        'Taxi fare'
    ),
    (
        '2024-12-02 13:45:00',
        'Alice',
        120.00,
        'Книги',
        'Lunch with friends'
    ),
    (
        '2024-12-03 11:00:00',
        'Bob',
        75.00,
        'Книги',
        'Bought a new novel'
    );