CREATE DATABASE IF NOT EXISTS sepptic;
USE sepptic;

CREATE TABLE User (
    User_ID INT AUTO_INCREMENT PRIMARY KEY,
    Password VARCHAR(255) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE UserEventLog (
    Event_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT NOT NULL,
    Event_Name VARCHAR(50) NOT NULL,
    Timestamp DATETIME NOT NULL,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON UPDATE RESTRICT
);

CREATE TABLE Conversation (
    Conversation_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT NOT NULL,
    Campaign_ID INT NOT NULL,
    Character_ID INT NOT NULL,
    From_ID INT NOT NULL,
    Realtime BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON UPDATE RESTRICT
);

CREATE TABLE Transcript (
    Transcript_ID INT AUTO_INCREMENT PRIMARY KEY,
    Text TEXT NOT NULL,
    Timestamp DATETIME NOT NULL,
    Conversation_ID INT NOT NULL,
    FOREIGN KEY (Conversation_ID) REFERENCES Conversation(Conversation_ID) ON UPDATE RESTRICT
);

CREATE TABLE Message (
    Message_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_Sent BOOLEAN DEFAULT FALSE,
    Message TEXT NOT NULL,
    Timestamp DATETIME NOT NULL,
    Conversation_ID INT NOT NULL,
    FOREIGN KEY (Conversation_ID) REFERENCES Conversation(Conversation_ID) ON UPDATE RESTRICT
);

CREATE TABLE Session (
    Token VARCHAR(255) PRIMARY KEY,
    Expiration DATE NOT NULL,
    User_ID INT NOT NULL,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON UPDATE RESTRICT
);

CREATE TABLE Campaign (
    Id INT NOT NULL PRIMARY KEY,
    Data MEDIUMTEXT NOT NULL
);

-- Indexes for foreign key optimization
CREATE INDEX idx_user_id_conversation ON Conversation(User_ID);
CREATE INDEX idx_user_id_intel ON Intel(User_ID);
CREATE INDEX idx_conversation_id_message ON Message(Conversation_ID);
CREATE INDEX idx_user_id_session ON Session(User_ID);
