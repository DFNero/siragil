-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2025 at 03:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `siragil_nndb`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('owner','admin','kasir','operator') NOT NULL DEFAULT 'kasir',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'norm', 'norm@gmail.com', '$2b$10$zHz7uhBSO/toH4imuzsvPOkE2EkX4V6o9fdlUgZWuKTfyFVBWsjsK', 'kasir', '2025-11-21 06:31:05'),
(2, 'owner', 'owner@gmail.com', '$2b$10$v6PXwyQpmt5XN.hQ.lYEVujxkmKTCqBow9dykBFq2kn5.gBlTzpWy', 'owner', '2025-11-21 06:32:09'),
(3, 'admin', 'admin1@gmail.com', '$2b$10$ihVmh8PpX/zI0/oUom08s.9wUG5vitOWqJLHLAoT.UI5IkEVYdP9q', 'admin', '2025-11-21 06:34:06'),
(4, 'operator', 'operator1@gmail.com', '$2b$10$zFsigdnpJ9yPklEhFgXXz.EUakpqiMVYib5TizXBsQzDfGfzBMTKa', 'operator', '2025-11-21 06:34:49'),
(5, 'kalo', 'kalo@gmail.com', '$2b$10$OXS0xJYItegUgtpYSs7K0exoRL9CPy3oXzekErr2RulyVThsnU3za', 'kasir', '2025-11-21 06:49:42'),
(6, 'poin', 'poin@gmail.com', '$2b$10$Nwy0Vw6IVwvq4lo1Pnur9u4vb10xlj/WnALRC4bxZ5qyFpE9OUy5y', 'kasir', '2025-11-21 07:00:32'),
(7, 'abby', 'abby@gmail.com', '$2b$10$v3Ww.v.Rgh3Oe8TZWug16uL00u6xTfnTDwjppBVEribNPAx3leN/i', 'kasir', '2025-11-21 07:06:48'),
(8, 'pon', 'pon@gmail.com', '$2b$10$U31AHRsh8xMMXKewjIdMW.svGVs82tzaIGySoce7cTwKCnm8eHbWO', 'kasir', '2025-11-23 14:04:50'),
(9, 'lol', 'lol@gmail.com', '$2b$10$.xrOw.PJSAKPnU3AjO4wAOByGN52knT3EmcdUHxHLcfprA28GGhVm', 'kasir', '2025-11-23 14:05:38'),
(10, 'boi', 'boi@gmail.com', '$2b$10$0rwMcFKA47.IOGEThXegieQr/X4Q/q8p5WVP2T53pgspYIGOLJ5OC', 'kasir', '2025-11-24 01:22:49'),
(11, 'sdada', 'da@gmail.com', '$2b$10$TM09dSN.TMW2s1lYpwAKxO1Pzj2LCfW7Q432otsdMPZcVFk3SqV0S', 'kasir', '2025-11-24 14:22:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
