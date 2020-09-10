-- --------------------------------------------------------
-- Hôte :                        localhost
-- Version du serveur:           5.7.24 - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Listage de la structure de la base pour url-rewriter-plugin
CREATE DATABASE IF NOT EXISTS `url-rewriter-plugin` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `url-rewriter-plugin`;

-- Listage de la structure de la table url-rewriter-plugin. urlrewriter
CREATE TABLE IF NOT EXISTS `urlrewriter` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `original` text,
  `custom` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Listage des données de la table url-rewriter-plugin.urlrewriter : ~4 rows (environ)
DELETE FROM `urlrewriter`;
/*!40000 ALTER TABLE `urlrewriter` DISABLE KEYS */;
INSERT INTO `urlrewriter` (`id`, `original`, `custom`) VALUES
	(1, 'https://www.youtube.com/watch?v=FgApngD5faY&ab_channel=Monstercat%3AUncaged', 'http://yohannmoy.fr/badcomputer'),
	(2, 'https://www.youtube.com/watch?v=Ge_TiNc-BiI&ab_channel=Monstercat%3AUncaged', 'http://yohannmoy.fr/muzz');
/*!40000 ALTER TABLE `urlrewriter` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
