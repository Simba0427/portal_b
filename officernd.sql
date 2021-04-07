
DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `locations` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT;


DROP TABLE IF EXISTS `reports`;
CREATE TABLE `reports` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `location_id` varchar(50) DEFAULT NULL,
  `file_path` text,
  `file_name` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB;


INSERT INTO `reports` VALUES (7,'Billling','Beverly, MA','5d1bcda0dbd6e40010479eec','http://161.35.106.39:3000/uploads/LGrnrHqhfyJoPfYuH8NyeTS6bL8Qiguj3kyJCUAXXWRWY.pdf','test.pdf','2021-03-26 14:54:00');


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(400) DEFAULT NULL,
  `user_role` varchar(10) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `locations` text,
  `location_id` varchar(100) DEFAULT NULL,
  `status` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB;

INSERT INTO `users` VALUES (1,'Frank','Hertz','frank@localworks.us','f64561e04c3be9cea6271afcd2b324f4b8654ed1b011f4f15ff4436e0100d5a0','admin','222222222222222',NULL,NULL,NULL,'2020-12-23 00:47:49'),(16,'Bev Test','test','bevtest@localworks.us','423485b3909b916ec08724bd93bb05e8a864ce48c003d46f248ee1ed6a455658','user',NULL,'Beverly, MA','5d1bcda0dbd6e40010479eec',NULL,'2021-03-26 15:46:44');
