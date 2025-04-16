CREATE TABLE contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    streetAddress TEXT NOT NULL,
    city TEXT NOT NULL,
    zipCode TEXT NOT NULL,
    country TEXT NOT NULL
);