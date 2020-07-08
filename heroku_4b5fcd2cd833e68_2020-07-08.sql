# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: eu-cdbr-west-03.cleardb.net (MySQL 5.6.47-log)
# Database: heroku_4b5fcd2cd833e68
# Generation Time: 2020-07-08 08:59:09 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table albums
# ------------------------------------------------------------

DROP TABLE IF EXISTS `albums`;

CREATE TABLE `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;

INSERT INTO `albums` (`id`, `title`, `user_id`)
VALUES
	(2,'People',2),
	(3,'Food',3),
	(4,'Animals',4),
	(5,'Travel',5),
	(6,'Misc',1),
	(7,'Nature',7),
	(8,'Fruits',1),
	(27,'Forest',1),
	(28,'Mixed',1);

/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table albums_photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `albums_photos`;

CREATE TABLE `albums_photos` (
  `photo_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `albums_photos` WRITE;
/*!40000 ALTER TABLE `albums_photos` DISABLE KEYS */;

INSERT INTO `albums_photos` (`photo_id`, `album_id`)
VALUES
	(1,2),
	(2,2),
	(3,2),
	(4,1),
	(5,1),
	(6,1),
	(43,1),
	(47,2),
	(43,6);

/*!40000 ALTER TABLE `albums_photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;

INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `user_id`)
VALUES
	(1,'Boy in blue hoodie','https://unsplash.com/photos/PNQ2SMlsyOc',NULL,2),
	(2,'Woman in yellow shirt','https://unsplash.com/photos/i-JkONlmR_o',NULL,2),
	(3,'Man in brown hat','https://unsplash.com/photos/0tEEFB_Ppwg',NULL,2),
	(4,'Orange flowers','https://unsplash.com/photos/koy6FlCCy5s',NULL,1),
	(5,'Tulips','https://unsplash.com/photos/eHlVZcSrjfg',NULL,1),
	(6,'Cherry blossoms','https://unsplash.com/photos/sKJ7zSylUao',NULL,1),
	(7,'Pizza','https://unsplash.com/photos/MNtag_eXMKw',NULL,3),
	(8,'Avocado','https://unsplash.com/photos/9aOswReDKPo',NULL,3),
	(9,'Pancakes','https://unsplash.com/photos/8Nc_oQsc2qQ',NULL,3),
	(10,'Icecream','https://unsplash.com/photos/TLD6iCOlyb0',NULL,3),
	(11,'Meatballs','https://unsplash.com/photos/OFismyezPnY',NULL,3),
	(12,'Fox','https://unsplash.com/photos/CQl3Y5bV6FA',NULL,4),
	(13,'Paris','https://unsplash.com/photos/QAwciFlS1g4',NULL,5),
	(14,'New York','https://unsplash.com/photos/wh-7GeXxItI',NULL,5),
	(15,'Barcelona','https://unsplash.com/photos/LSscVPEyQpI',NULL,5),
	(16,'Malmö','https://unsplash.com/photos/dEOIskG3Oes',NULL,5),
	(17,'Ocean','https://unsplash.com/photos/oR0uERTVyD0',NULL,1),
	(24,'Barcelona','https://unsplash.com/photos/LSscVPEyQpI',NULL,7),
	(25,'Pink Rose','https://unsplash.com/photos/x68FaxTyx90',NULL,1),
	(26,'Forest','https://unsplash.com/photos/LSscVPEyQpI',NULL,7),
	(35,'Barcelona','https://unsplash.com/photos/LSscVPEyQpI',NULL,5),
	(40,'Forest','https://unsplash.com/photos/LSscVPEyQpI',NULL,1),
	(42,'Forest','https://unsplash.com/photos/LSscVPEyQpI',NULL,1),
	(43,'Cough','https://unsplash.com/photos/avt0TnE_NS0',NULL,1),
	(47,'Woman in yellow dress','https://unsplash.com/photos/iyBO7fdK3pE',NULL,1);

/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`)
VALUES
	(1,'inanivald@hotmail.com','$2b$10$MinGDN5lwDpI9nZFUF6RyOZ/ELRvtwTs9O8nMabt5xQwqd0VZMI82','Ina','Nivald'),
	(2,'lisa.larsson@gmail.com','$2b$10$Af141995xy/gFQ4WCX.BieeGY6loKL3a6S7DIOF8InYJNwM8BRv9G','Lisa','Larsson'),
	(3,'anna.andersson@gmail.com','$2b$10$RwFhDU6RGMIlYk140Bwaq.brqB4PZZjY5y/hF0bJ93Dg/hCg48hZi','Anna','Andersson'),
	(4,'kalle@johansson.se','$2b$10$T8j5bkDbAMkfMbniTCtueuXk8tIp6nNGsdQvK72u8s7p1WoR0njC6','Kalle','Johansson'),
	(5,'pelle@persson.se','$2b$10$8/HGxvJtL4.JpT104Oo0duZVvJLprtPZzBD65oYFhP8xYgQH8I8B2','Pelle','Persson'),
	(7,'mats@matsson.se','$2b$10$XhMZC7A03TPrdeMzA.Zlnuvdbiy9F9jM1RQclxdQC7ClXUZ.QRm9G','Mats','Matsson');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
