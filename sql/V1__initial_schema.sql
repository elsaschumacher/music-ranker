
create table ratings (
  songId varchar(255) not null,
  userId varchar(255) not null,
  rating float not null,
  primary key (songId, userId)
);