create database if not exists swb;
use swb;

create table if not exists posts(
    id int not null auto_increment primary key,
    body text
);