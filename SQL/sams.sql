-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sams_collection
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_applications`
--

DROP TABLE IF EXISTS `account_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_applications` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `student_email` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `university` varchar(45) DEFAULT NULL,
  `bank` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `postcode` varchar(45) DEFAULT NULL,
  `course` varchar(45) DEFAULT NULL,
  `student_id` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT 'pending',
  `createdAt` varchar(45) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `request_uad` varchar(45) DEFAULT '0',
  `account_passport` varchar(45) DEFAULT NULL,
  `brp_number` varchar(45) DEFAULT NULL,
  `bos_message` varchar(45) DEFAULT NULL,
  `uad_message` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_applications`
--

LOCK TABLES `account_applications` WRITE;
/*!40000 ALTER TABLE `account_applications` DISABLE KEYS */;
INSERT INTO `account_applications` VALUES (1,'k','k','kkl@gmai.com','79879','UCL','Lloyd','lj','lj','lj','lkjlk','k','approved',NULL,NULL,NULL,'1',NULL,NULL,NULL,NULL),(3,'Mahender','Bommagani','u2012592@uel.ac.uk','07424152806','UEL','HSBC','17 Th Foxgloves','Essex','CM120TE','Msc','U2012592','approved',NULL,NULL,40,'0',NULL,NULL,NULL,''),(4,'dhanush','k','dhanush@gmail.om','78678657878','UCL','LLOYDS','billeicay','uk','767667576','mba','1212','pending',NULL,NULL,40,'0','1274528254','785875287',NULL,''),(22,'test','te','1212@gmail.com','12321321','UEL','HSBC','fsd','fsdf','fsd','fdsf','12211','rejected',NULL,NULL,49,'0','fsd','fa',NULL,'wrong data'),(23,'test','te','1212@gmail.com','1212@gmail.com','UEL','HSBC','fsd','fsdf','fsd','1212@gmail.com','tewt','pending',NULL,NULL,49,'0','tew','tw',NULL,NULL),(24,'test','te','1212@gmail.com','1212@gmail.com','UEL','HSBC','fsd','fsdf','fsd','1212@gmail.com','fds','approved',NULL,NULL,49,'0','fds','fds','fdsfdsfds',NULL),(25,'Sainath','G','sainath@gmail.com','788988888','UEL','HSBC','Eastham','London','Cm111','Msc','12345-U','rejected',NULL,NULL,51,'0','s678686','68686686',NULL,'Wrong information');
/*!40000 ALTER TABLE `account_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(16) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fullname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `Id` int NOT NULL AUTO_INCREMENT,
  `stakeholder` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `stakeholder_university` varchar(255) DEFAULT NULL,
  `stakeholder_bank` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('test','dh235@gmail.com','$2a$10$Mvi9/2Kp8TvR6aHyWUuZfedZAYqhf4rcc.SjhgPDAaetSMdnn4nES','2020-11-02 13:35:39','Test',NULL,2,'admin',NULL,NULL,NULL),('test123','test@gmail.com','$2a$10$fZEm57R3IjaaywwuCkrvEOp/g53W5uN0Xz9s2x2.dqhfJQJyKA4kq','2020-11-02 16:38:32','test',NULL,39,'student',NULL,NULL,NULL),('Mahender','mahi@gmail.com','$2a$10$zXpQw8ConylMbBugltxeUOBALuB8Xjrjch732lnKS5vaIGMI/QVXq','2020-11-02 18:19:57','Mahender',NULL,40,'UAD',NULL,'UEL',NULL),('student','student@gmail.com','$2a$10$7rctwtUxBmKNgM1M8QXjSOM2tlnu0RsKrAVlvm0vPN4Uw4Uo2Kon.','2020-11-21 18:51:03','student',NULL,41,'US',NULL,NULL,NULL),('bank','bank@gmail.com','$2a$10$NFgxjxzQHR0.ryFN6i/MhOtqTnrYBnAlJTFHejfxaMgo90kAWwUzW','2020-11-21 18:59:37','bank',NULL,42,'BOS',NULL,NULL,'HSBC'),('university','university@gmail.com','$2a$10$ZlWy0k5XmRBfLHTRtznGR.8Hl0wfhz50UFKHwmwvQAlwnhwkcMRq.','2020-11-21 19:04:32','university',NULL,43,'UAD',NULL,'UEL',NULL),('student1','student1@gmail.com','$2a$10$Oqm0t6PjqZuTDdAn6uHPMOIve3qA3l/BcCbEqelVvFDGs0lNvkMVy','2020-11-25 20:28:37','student',NULL,49,'US',NULL,'UEL',''),('Test111','test111@gmail.com','$2a$10$A2jVf96VFuDIb.ZZSJXA7OauMa1uA6xbCKiwXaHizHhBsZX23XZ1a','2020-11-26 18:17:07','Test111',NULL,50,'US',NULL,'',''),('sainath','sainath@gmail.com','$2a$10$2V0KxWvh0h4YBnfKNxa2ouBzyXD8OllwUYKpvyz5u1iSSO7oFiOoS','2020-11-27 11:44:21','Sainath',NULL,51,'US','122334','','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-28 19:27:51
