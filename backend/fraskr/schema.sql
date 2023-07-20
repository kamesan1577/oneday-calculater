DROP TABLE IF EXISTS history;

CREATE TABLE history (
    cookie_id TEXT NOT NULL,
    num1 REAL NOT NULL,
    num2 REAL NOT NULL,
    operant TEXT NOT NULL,
    result REAL NOT NULL,
    time_stamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);