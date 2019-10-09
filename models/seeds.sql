use bucket_besties_db;


insert into Users(firstName, lastName, username, email, lat, lon, zip)
values('test', 'user001', 'testuser001', 'testuser001@gmail.com', '40.822', '-74.238', '07042');

insert into Users(firstName, lastName, username, email, lat, lon, zip)
values('test', 'user002', 'testuser002', 'testuser002@gmail.com', '40.825', '-74.109', '07070');

insert into Users(firstName, lastName, username, email, lat, lon, zip)
values('test', 'user003', 'testuser003', 'testuser003@gmail.com', '40.840', '-74.200', '07030');

insert into Users(firstName, lastName, username, email, lat, lon, zip)
values('test', 'user004', 'testuser004', 'testuser004@gmail.com', '40.755', '-74.068', '07073');

insert into Users(firstName, lastName, username, email, lat, lon, zip)
values('test', 'user005', 'testuser005', 'testuser005@gmail.com', '40.731', '-74.173', '07041');




insert into activities(activityDescription, category)
values ("Travel to Paris", "Travel");

insert into activities(activityDescription, category)
values ("Skydiving", "Thrills");

insert into activities(activityDescription, category)
values ("Eat baby shark", "Food");

insert into activities(activityDescription, category)
values ("Run a marathon", "Challenges");

insert into activities(activityDescription, category)
values ("Bungee jumping", "Thrills");





insert into bridge(userID, activityID, completeByDate)
values (1,2,'2020-12-31');

insert into bridge(userID, activityID, completeByDate)
values (2,2,'2021-07-31');

insert into bridge(userID, activityID, completeByDate)
values (3,1,'2019-10-31');

insert into bridge(userID, activityID, completeByDate)
values (4,3,'2019-11-15');

insert into bridge(userID, activityID, completeByDate)
values (5,4,'2022-01-31');

insert into bridge(userID, activityID, completeByDate)
values (5,5,'2023-01-31');



