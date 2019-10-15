create database bucket_besties_db;

use bucket_besties_db;

create table Users(
id varchar(100),
firstName varchar(100) not null,
lastName varchar(100) not null,
userName varchar(100) not null,
email varchar(50) not null,
lat decimal(5,3) not null,
lon decimal(5,3) not null,
zip char(5) not null,
primary key(id)
);

create table Activities(
id int auto_increment,
activityDescription varchar(100) not null,
category varchar(50) not null,
primary key(id)
);

create table Bridge(
id int auto_increment,
userID varchar(100) not null,
activityID int not null,
completeByDate date,
completed boolean default false,
completedOnDate date,
primary key(id)
);

