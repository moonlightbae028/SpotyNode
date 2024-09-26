-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 26, 2024 at 02:58 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `villaverde_alvin`
--

-- --------------------------------------------------------

--
-- Table structure for table `tonapsongs`
--

DROP TABLE IF EXISTS `tonapsongs`;
CREATE TABLE IF NOT EXISTS `tonapsongs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `filepath` varchar(255) NOT NULL,
  `album_cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '/uploads/default_cover.jpg',
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `uploader_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lyrics_file` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tonapsongs`
--

INSERT INTO `tonapsongs` (`id`, `filename`, `filepath`, `album_cover`, `uploaded_at`, `uploader_name`, `lyrics_file`) VALUES
(29, '1727362066357.mp4', '/uploads/1727362066357.mp4', '/uploads/1727362066390.jfif', '2024-09-26 14:47:46', 'goodnight n go Ariana Grande  •  Sweetener  •  2018', NULL),
(30, '1727362289916.mp4', '/uploads/1727362289916.mp4', '/uploads/1727362289953.jfif', '2024-09-26 14:51:29', 'Here Comes The Sun (Remastered 2009) The Beatles  •  Abbey Road  •  1969', NULL),
(27, '1727360607794.mp4', '/uploads/1727360607794.mp4', '/uploads/1727360607827.jpg', '2024-09-26 14:23:27', 'Apple Charli xcx  •  BRAT  •  2024', NULL),
(28, '1727361312302.mp4', '/uploads/1727361312302.mp4', '/uploads/1727361312308.png', '2024-09-26 14:35:12', 'Supernova aespa  •  Supernova  •  2024', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
