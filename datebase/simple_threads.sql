-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2024-06-24 06:22:00
-- サーバのバージョン： 10.4.32-MariaDB
-- PHP のバージョン: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `simple_threads`
--
CREATE DATABASE IF NOT EXISTS `simple_threads` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `simple_threads`;

-- --------------------------------------------------------

--
-- テーブルの構造 `comments`
--

CREATE TABLE `comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `text` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `comments`
--

INSERT INTO `comments` (`id`, `text`, `created_at`) VALUES
(1, '初めての書き込み！', '2024-06-24 11:08:47'),
(2, 'こんにちは！', '2024-06-24 11:12:52');

-- --------------------------------------------------------

--
-- テーブルの構造 `main_genres`
--

CREATE TABLE `main_genres` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `main_genres`
--

INSERT INTO `main_genres` (`id`, `name`) VALUES
(1, '軍事');

-- --------------------------------------------------------

--
-- テーブルの構造 `main_genres_sub_genres`
--

CREATE TABLE `main_genres_sub_genres` (
  `id` int(10) UNSIGNED NOT NULL,
  `main_genres_id` int(10) UNSIGNED NOT NULL,
  `sub_genres_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `main_genres_sub_genres`
--

INSERT INTO `main_genres_sub_genres` (`id`, `main_genres_id`, `sub_genres_id`) VALUES
(2, 1, 1);

-- --------------------------------------------------------

--
-- テーブルの構造 `sub_genres`
--

CREATE TABLE `sub_genres` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `sub_genres`
--

INSERT INTO `sub_genres` (`id`, `name`) VALUES
(1, '戦車'),
(2, '戦闘機');

-- --------------------------------------------------------

--
-- テーブルの構造 `threads`
--

CREATE TABLE `threads` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `sub_genres_id` int(10) UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `threads`
--

INSERT INTO `threads` (`id`, `name`, `sub_genres_id`, `created_at`) VALUES
(1, 'aa', 1, '2024-06-24 11:50:14'),
(11, 'aa', 2, '2024-06-24 11:51:20');

-- --------------------------------------------------------

--
-- テーブルの構造 `threads_comments`
--

CREATE TABLE `threads_comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `threads_id` int(10) UNSIGNED NOT NULL,
  `comments_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `threads_comments`
--

INSERT INTO `threads_comments` (`id`, `threads_id`, `comments_id`) VALUES
(10, 1, 1),
(11, 1, 2),
(12, 11, 1);

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `main_genres`
--
ALTER TABLE `main_genres`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `main_genres_sub_genres`
--
ALTER TABLE `main_genres_sub_genres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `main_genres_id` (`main_genres_id`),
  ADD KEY `sub_genres_id` (`sub_genres_id`);

--
-- テーブルのインデックス `sub_genres`
--
ALTER TABLE `sub_genres`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `threads`
--
ALTER TABLE `threads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sub_genres_id` (`sub_genres_id`);

--
-- テーブルのインデックス `threads_comments`
--
ALTER TABLE `threads_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `threads_id` (`threads_id`),
  ADD KEY `comments_id` (`comments_id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- テーブルの AUTO_INCREMENT `main_genres`
--
ALTER TABLE `main_genres`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- テーブルの AUTO_INCREMENT `main_genres_sub_genres`
--
ALTER TABLE `main_genres_sub_genres`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- テーブルの AUTO_INCREMENT `sub_genres`
--
ALTER TABLE `sub_genres`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- テーブルの AUTO_INCREMENT `threads`
--
ALTER TABLE `threads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- テーブルの AUTO_INCREMENT `threads_comments`
--
ALTER TABLE `threads_comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `main_genres_sub_genres`
--
ALTER TABLE `main_genres_sub_genres`
  ADD CONSTRAINT `main_genres_sub_genres_ibfk_1` FOREIGN KEY (`main_genres_id`) REFERENCES `main_genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `main_genres_sub_genres_ibfk_2` FOREIGN KEY (`sub_genres_id`) REFERENCES `sub_genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- テーブルの制約 `threads`
--
ALTER TABLE `threads`
  ADD CONSTRAINT `threads_ibfk_3` FOREIGN KEY (`sub_genres_id`) REFERENCES `sub_genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- テーブルの制約 `threads_comments`
--
ALTER TABLE `threads_comments`
  ADD CONSTRAINT `threads_comments_ibfk_1` FOREIGN KEY (`comments_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `threads_comments_ibfk_2` FOREIGN KEY (`threads_id`) REFERENCES `threads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
