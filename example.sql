-- schema.sql

-- Таблица администраторов
CREATE TABLE admins (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Таблица книг
CREATE TABLE booklib (
  id int NOT NULL AUTO_INCREMENT,
  img_url varchar(255) NOT NULL,
  title varchar(255) NOT NULL,
  type varchar(100) NOT NULL,
  language varchar(255) NOT NULL,
  year int NOT NULL,
  author varchar(255) NOT NULL,
  description text,
  link varchar(255) DEFAULT NULL,
  specialty varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Таблица коллекций
CREATE TABLE collections (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  description text,
  img_url text,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Связь книги и коллекции
CREATE TABLE collection_books (
  collection_id int NOT NULL,
  book_id int NOT NULL,
  PRIMARY KEY (collection_id, book_id),
  KEY book_id (book_id),
  CONSTRAINT collection_books_ibfk_1 FOREIGN KEY (collection_id) REFERENCES collections (id) ON DELETE CASCADE,
  CONSTRAINT collection_books_ibfk_2 FOREIGN KEY (book_id) REFERENCES booklib (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Таблица новостей
CREATE TABLE news (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  text text COLLATE utf8mb4_unicode_ci NOT NULL,
  date datetime NOT NULL,
  author_name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица персон
CREATE TABLE persons (
  id int NOT NULL AUTO_INCREMENT,
  kz_name varchar(255) DEFAULT '',
  ru_name varchar(255) DEFAULT '',
  birthdate date NOT NULL,
  kz_quote text,
  ru_quote text,
  kz_description text,
  ru_description text,
  img_url text,
  link1 text,
  link_name1 text,
  link2 text,
  link_name2 text,
  link3 text,
  link_name3 text,
  link4 text,
  link_name4 text,
  link5 text,
  link_name5 text,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Таблица студентов
CREATE TABLE students (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(100) DEFAULT NULL,
  last_name varchar(100) DEFAULT NULL,
  group_name varchar(100) DEFAULT NULL,
  password varchar(255) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
