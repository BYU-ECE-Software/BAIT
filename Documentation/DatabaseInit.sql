CREATE DATABASE IF NOT EXISTS sepptic;

USE sepptic;

CREATE TABLE User (
  User_ID INT NOT NULL AUTO_INCREMENT,
  Password VARCHAR(255) NOT NULL,
  Name VARCHAR(100) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  PRIMARY KEY (User_ID),
  UNIQUE (Email)
);

CREATE TABLE Intel (
  Intel_Record_ID INT NOT NULL AUTO_INCREMENT,
  Campaign_ID INT NOT NULL,
  Character_ID INT NOT NULL,
  Intel_ID INT NOT NULL,
  User_ID INT NOT NULL,
  PRIMARY KEY (Intel_Record_ID),
  FOREIGN KEY (User_ID) REFERENCES User(User_ID)
);

CREATE TABLE Conversation (
  Conversation_ID INT NOT NULL AUTO_INCREMENT,
  User_ID INT NOT NULL,
  PRIMARY KEY (Conversation_ID),
  FOREIGN KEY (User_ID) REFERENCES User(User_ID)
);

CREATE TABLE Session (
  Token VARCHAR(255) NOT NULL,
  Expiration DATE NOT NULL,
  User_ID INT NOT NULL,
  PRIMARY KEY (Token),
  FOREIGN KEY (User_ID) REFERENCES User(User_ID)
);

CREATE TABLE Message (
  Message_ID INT NOT NULL AUTO_INCREMENT,
  User_Sent BOOLEAN DEFAULT FALSE,
  Message TEXT NOT NULL,
  Timestamp DATE NOT NULL,
  Conversation_ID INT NOT NULL,
  PRIMARY KEY (Message_ID),
  FOREIGN KEY (Conversation_ID) REFERENCES Conversation(Conversation_ID)
);
