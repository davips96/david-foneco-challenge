USE foneco;

CREATE TABLE IF NOT EXISTS comments (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
username varchar(50) NOT NULL,
email varchar(50) NOT NULL,
postdate varchar(15) NOT NULL,
msg TEXT NOT NULL
);