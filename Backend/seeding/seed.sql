use bms;
insert into role(id,name,roleCode,createdAt,updatedAt)
values(UUID(),'Admin','admin',now(),now());

insert into role(id,name,roleCode,createdAt,updatedAt)
values(UUID(),'User','user',now(),now());


insert into user(id,email,username,password,createdAt,updatedAt,roleId)
values(UUID(),'parbhat@gmail.com','parbhat dhanuk','$2a$12$EAXnDJ3ahSzywaaJKzTxKOUlmnmJZLwTwLbYmQtO0Lv4zitfdSTMS',now(),now(),'add roleId here from role table');