-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2024-09-02 06:47:44
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
(1, '異論は認める！', '2024-07-01 15:46:07'),
(2, 'だがこいつが許すかな？', '2024-07-08 10:04:24'),
(3, 'a', '2024-07-08 15:25:18'),
(4, 'a', '2024-07-08 15:25:38'),
(5, 'あ', '2024-07-08 16:03:02'),
(6, 'あ', '2024-07-08 16:06:25');

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
(1, '軍事'),
(2, '政治経済'),
(3, '学問'),
(4, 'ゲーム'),
(5, '趣味'),
(6, '社会');

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
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 2, 4),
(5, 2, 5),
(6, 3, 6),
(7, 3, 7),
(8, 4, 8),
(9, 4, 9),
(10, 4, 11),
(11, 4, 10),
(12, 5, 12),
(13, 5, 13),
(14, 5, 14),
(15, 6, 15),
(16, 6, 16);

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
(2, '戦闘機'),
(3, '政治'),
(4, '株式'),
(5, '経済'),
(6, '理系全般'),
(7, '文系全般'),
(8, 'ゲーム速報'),
(9, '任天堂'),
(10, 'ソニー'),
(11, 'マイクロソフト'),
(12, '趣味一般'),
(13, 'お絵描き'),
(14, 'ラジコン'),
(15, '裁判・司法'),
(16, '議員・選挙');

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
(1, 'F-22は最強だ', 2, '2024-07-01 15:45:34'),
(2, 'KV-1装甲硬すぎない？', 1, '2024-07-08 10:06:15'),
(3, 'ｓ', 2, '2024-07-08 16:00:55'),
(4, 'メビウス１強すぎ', 2, '2024-07-08 16:06:42');

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
(1, 1, 1),
(2, 2, 2),
(3, 1, 3),
(4, 1, 4),
(5, 2, 5),
(6, 2, 6);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- テーブルの AUTO_INCREMENT `main_genres`
--
ALTER TABLE `main_genres`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- テーブルの AUTO_INCREMENT `main_genres_sub_genres`
--
ALTER TABLE `main_genres_sub_genres`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- テーブルの AUTO_INCREMENT `sub_genres`
--
ALTER TABLE `sub_genres`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- テーブルの AUTO_INCREMENT `threads`
--
ALTER TABLE `threads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- テーブルの AUTO_INCREMENT `threads_comments`
--
ALTER TABLE `threads_comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
