-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: laboratorio
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `labo_amos_achat_anexo_cada`
--

DROP TABLE IF EXISTS `labo_amos_achat_anexo_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_achat_anexo_cada` (
  `amos_achat_anexo_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_achat_anexo_achat_iden` bigint(20) DEFAULT NULL,
  `amos_achat_anexo_tipo` int(2) DEFAULT NULL COMMENT '0-Anexo\r\n1-Foto',
  `amos_achat_anexo_descr` varchar(1000) DEFAULT NULL,
  `amos_achat_anexo_arqui` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`amos_achat_anexo_cada_iden`),
  KEY `amos_achat_anexo_cada_FK` (`amos_achat_anexo_achat_iden`),
  CONSTRAINT `amos_achat_anexo_cada_FK` FOREIGN KEY (`amos_achat_anexo_achat_iden`) REFERENCES `labo_amos_achat_cada` (`amos_achat_cada_iden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_achat_anexo_cada`
--

LOCK TABLES `labo_amos_achat_anexo_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_achat_anexo_cada` DISABLE KEYS */;
/*!40000 ALTER TABLE `labo_amos_achat_anexo_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_amos_achat_cada`
--

DROP TABLE IF EXISTS `labo_amos_achat_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_achat_cada` (
  `amos_achat_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_achat_cada_amos_iden` bigint(20) DEFAULT NULL,
  `amos_achat_cada_qtde` int(2) DEFAULT NULL,
  `amos_achat_cada_achat_result` int(2) DEFAULT NULL COMMENT '0-Reprovado\r\n1-Informativo\r\n2-Toleravel\r\n3-Aprovado',
  `amos_achat_cada_expan_result` int(2) DEFAULT NULL COMMENT '0-Reprovado\r\n1-Informativo\r\n2-Toleravel\r\n3-Aprovado',
  `amos_achat_cada_obs` blob DEFAULT NULL,
  `amos_achat_cada_fina` int(2) DEFAULT NULL,
  `amos_achat_cada_fina_data` timestamp NULL DEFAULT NULL COMMENT '0-Anexo\r\n1-Foto',
  `amos_achat_cada_fina_usua_iden` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`amos_achat_cada_iden`),
  KEY `amos_achat_cada_FK` (`amos_achat_cada_amos_iden`),
  KEY `amos_achat_cada_achat_result_idx` (`amos_achat_cada_achat_result`) USING BTREE,
  KEY `amos_achat_cada_expan_result_idx` (`amos_achat_cada_expan_result`) USING BTREE,
  KEY `amos_achat_cada_fina_data_idx` (`amos_achat_cada_fina_data`) USING BTREE,
  KEY `amos_achat_cada_fina_usua_iden_idx` (`amos_achat_cada_fina_usua_iden`) USING BTREE,
  KEY `amos_achat_cada_fina_idx` (`amos_achat_cada_fina`) USING BTREE,
  CONSTRAINT `amos_achat_cada_FK` FOREIGN KEY (`amos_achat_cada_amos_iden`) REFERENCES `labo_amos_cada` (`amos_cada_iden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_achat_cada`
--

LOCK TABLES `labo_amos_achat_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_achat_cada` DISABLE KEYS */;
INSERT INTO `labo_amos_achat_cada` VALUES (2,9,1,3,0,'O',0,'0000-00-00 00:00:00',0);
/*!40000 ALTER TABLE `labo_amos_achat_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_amos_cada`
--

DROP TABLE IF EXISTS `labo_amos_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_cada` (
  `amos_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_cada_regi` varchar(30) DEFAULT NULL,
  `amos_cada_orse` varchar(30) DEFAULT NULL,
  `amos_cada_clie_iden` bigint(20) DEFAULT NULL,
  `amos_cada_fabr_iden` bigint(20) DEFAULT NULL,
  `amos_cada_mate_iden` bigint(20) DEFAULT NULL,
  `amos_cada_area_iden` bigint(20) DEFAULT NULL,
  `amos_cada_emis` timestamp NULL DEFAULT NULL,
  `amos_cada_descr` blob DEFAULT NULL,
  `amos_cada_usua_iden` bigint(20) DEFAULT NULL,
  `amos_cada_corde` timestamp NULL DEFAULT NULL,
  `amos_cada_priori` int(2) DEFAULT NULL,
  `amos_cada_conta` varchar(100) DEFAULT NULL,
  `amos_cada_distri` blob DEFAULT NULL,
  `amos_cada_obser` blob DEFAULT NULL,
  `amos_cada_metalo` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_quimica` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_tracao_1` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_tracao_2` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_dureza` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_charp` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_achat_expan` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_pce` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_dobram_2cps` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_dobram_4cps` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_macrog` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_campo_metalo` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_campo_quimica` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_forne_tracao` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_forne_dureza` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_forne_charp` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_cada_tenan` bigint(20) DEFAULT NULL,
  `amos_cada_empre` bigint(20) DEFAULT NULL,
  `amos_cada_stat` int(3) DEFAULT NULL COMMENT '0-Não\r\n1-Iniciado\r\n2-Sim',
  `amos_cada_situ` int(2) DEFAULT NULL COMMENT '0-Reprovado\r\n1-Informativo\r\n2-Toleravel\r\n3-Aprovado',
  PRIMARY KEY (`amos_cada_iden`),
  KEY `amos_cada_regi_idx` (`amos_cada_regi`) USING BTREE,
  KEY `amos_cada_orse_idx` (`amos_cada_orse`) USING BTREE,
  KEY `amos_cada_clie_iden_idx` (`amos_cada_clie_iden`) USING BTREE,
  KEY `amos_cada_fabr_iden_idx` (`amos_cada_fabr_iden`) USING BTREE,
  KEY `amos_cada_mate_iden_idx` (`amos_cada_mate_iden`) USING BTREE,
  KEY `amos_cada_area_iden_idx` (`amos_cada_area_iden`) USING BTREE,
  KEY `amos_cada_emis_idx` (`amos_cada_emis`) USING BTREE,
  KEY `amos_cada_usua_iden_idx` (`amos_cada_usua_iden`) USING BTREE,
  KEY `amos_cada_corde_idx` (`amos_cada_corde`) USING BTREE,
  KEY `amos_cada_priori_idx` (`amos_cada_priori`) USING BTREE,
  KEY `amos_cada_tenan_idx` (`amos_cada_tenan`) USING BTREE,
  KEY `amos_cada_empre_idx` (`amos_cada_empre`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_cada`
--

LOCK TABLES `labo_amos_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_cada` DISABLE KEYS */;
INSERT INTO `labo_amos_cada` VALUES (9,'0002/21','21-00001',2,3,1,0,'2021-09-26 03:00:00','TESTE DESCRIÇÃO AMOSTRA',1,'2021-07-26 03:00:00',2,'CONTATO OBSERVAÇÃO','afzardo1@gmail.com','TESTE OBSERVAÇÃO',1,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1,0,0,0,-1);
/*!40000 ALTER TABLE `labo_amos_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_amos_charpy_anexo_cada`
--

DROP TABLE IF EXISTS `labo_amos_charpy_anexo_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_charpy_anexo_cada` (
  `amos_charpy_anexo_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_charpy_anexo_charpy_iden` bigint(20) DEFAULT NULL,
  `amos_charpy_anexo_tipo` int(2) DEFAULT NULL COMMENT '0-Anexo\r\n1-Foto',
  `amos_charpy_anexo_descr` varchar(1000) DEFAULT NULL,
  `amos_charpy_anexo_arqui` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`amos_charpy_anexo_cada_iden`),
  KEY `amos_charpy_anexo_cada_FK` (`amos_charpy_anexo_charpy_iden`),
  CONSTRAINT `amos_charpy_anexo_cada_FK` FOREIGN KEY (`amos_charpy_anexo_charpy_iden`) REFERENCES `labo_amos_charpy_cada` (`amos_charpy_cada_iden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_charpy_anexo_cada`
--

LOCK TABLES `labo_amos_charpy_anexo_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_charpy_anexo_cada` DISABLE KEYS */;
INSERT INTO `labo_amos_charpy_anexo_cada` VALUES (12,1,0,'TESTE CHARPY','UBX - RELATORIO DE ALTERACAO DE SALDO - R0 (modelo).xlsm');
/*!40000 ALTER TABLE `labo_amos_charpy_anexo_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_amos_charpy_cada`
--

DROP TABLE IF EXISTS `labo_amos_charpy_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_charpy_cada` (
  `amos_charpy_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_charpy_cada_amos_iden` bigint(20) DEFAULT NULL,
  `amos_charpy_cada_qtde` int(2) DEFAULT NULL,
  `amos_charpy_cada_result` int(2) DEFAULT NULL COMMENT '0-Reprovado\r\n1-Informativo\r\n2-Toleravel\r\n3-Aprovado',
  `amos_charpy_cada_charpy_espe` varchar(50) DEFAULT NULL,
  `amos_charpy_cada_charpy_obti` varchar(50) DEFAULT NULL,
  `amos_charpy_cada_obs` blob DEFAULT NULL,
  `amos_charpy_cada_fina` int(2) DEFAULT NULL,
  `amos_charpy_cada_fina_data` timestamp NULL DEFAULT NULL COMMENT '0-Anexo\r\n1-Foto',
  `amos_charpy_cada_fina_usua_iden` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`amos_charpy_cada_iden`),
  KEY `amos_charpy_cada_FK` (`amos_charpy_cada_amos_iden`),
  KEY `amos_charpy_cada_result_idx` (`amos_charpy_cada_result`) USING BTREE,
  KEY `amos_charpy_cada_fina_data_idx` (`amos_charpy_cada_fina_data`) USING BTREE,
  KEY `amos_charpy_cada_fina_usua_iden_idx` (`amos_charpy_cada_fina_usua_iden`) USING BTREE,
  KEY `amos_charpy_cada_fina_idx` (`amos_charpy_cada_fina`) USING BTREE,
  CONSTRAINT `amos_charpy_cada_FK` FOREIGN KEY (`amos_charpy_cada_amos_iden`) REFERENCES `labo_amos_cada` (`amos_cada_iden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_charpy_cada`
--

LOCK TABLES `labo_amos_charpy_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_charpy_cada` DISABLE KEYS */;
INSERT INTO `labo_amos_charpy_cada` VALUES (1,9,1,1,'6','50','TESTE CHARPY GBGBGBGB',0,'0000-00-00 00:00:00',0);
/*!40000 ALTER TABLE `labo_amos_charpy_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_amos_dobra_anexo_cada`
--

DROP TABLE IF EXISTS `labo_amos_dobra_anexo_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_dobra_anexo_cada` (
  `amos_dobra_anexo_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_dobra_anexo_dobra_iden` bigint(20) DEFAULT NULL,
  `amos_dobra_anexo_tipo` int(2) DEFAULT NULL COMMENT '0-Anexo\r\n1-Foto',
  `amos_dobra_anexo_descr` varchar(1000) DEFAULT NULL,
  `amos_dobra_anexo_arqui` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`amos_dobra_anexo_cada_iden`),
  KEY `amos_dobra_anexo_cada_FK` (`amos_dobra_anexo_dobra_iden`),
  CONSTRAINT `amos_dobra_anexo_cada_FK` FOREIGN KEY (`amos_dobra_anexo_dobra_iden`) REFERENCES `labo_amos_dobra_cada` (`amos_dobra_cada_iden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_dobra_anexo_cada`
--

LOCK TABLES `labo_amos_dobra_anexo_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_dobra_anexo_cada` DISABLE KEYS */;
/*!40000 ALTER TABLE `labo_amos_dobra_anexo_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_amos_dobra_cada`
--

DROP TABLE IF EXISTS `labo_amos_dobra_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_dobra_cada` (
  `amos_dobra_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_dobra_cada_amos_iden` bigint(20) DEFAULT NULL,
  `amos_dobra_cada_qtde` int(2) DEFAULT NULL,
  `amos_dobra_cada_result` int(2) DEFAULT NULL COMMENT '0-Reprovado\r\n1-Informativo\r\n2-Toleravel\r\n3-Aprovado',
  `amos_dobra_cada_obs` blob DEFAULT NULL,
  `amos_dobra_cada_fina` int(2) DEFAULT NULL,
  `amos_dobra_cada_fina_data` timestamp NULL DEFAULT NULL COMMENT '0-Anexo\r\n1-Foto',
  `amos_dobra_cada_fina_usua_iden` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`amos_dobra_cada_iden`),
  KEY `amos_dobra_cada_FK` (`amos_dobra_cada_amos_iden`),
  KEY `amos_dobra_cada_result_idx` (`amos_dobra_cada_result`) USING BTREE,
  KEY `amos_dobra_cada_fina_data_idx` (`amos_dobra_cada_fina_data`) USING BTREE,
  KEY `amos_dobra_cada_fina_usua_iden_idx` (`amos_dobra_cada_fina_usua_iden`) USING BTREE,
  KEY `amos_dobra_cada_fina_idx` (`amos_dobra_cada_fina`) USING BTREE,
  CONSTRAINT `amos_dobra_cada_FK` FOREIGN KEY (`amos_dobra_cada_amos_iden`) REFERENCES `labo_amos_cada` (`amos_cada_iden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_dobra_cada`
--

LOCK TABLES `labo_amos_dobra_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_dobra_cada` DISABLE KEYS */;
/*!40000 ALTER TABLE `labo_amos_dobra_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_amos_dure_anexo_cada`
--

DROP TABLE IF EXISTS `labo_amos_dure_anexo_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_dure_anexo_cada` (
  `amos_dure_anexo_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_dure_anexo_dure_iden` bigint(20) DEFAULT NULL,
  `amos_dure_anexo_tipo` int(2) DEFAULT NULL COMMENT '0-Anexo\r\n1-Foto',
  `amos_dure_anexo_descr` varchar(1000) DEFAULT NULL,
  `amos_dure_anexo_arqui` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`amos_dure_anexo_cada_iden`),
  KEY `amos_dure_anexo_cada_FK` (`amos_dure_anexo_dure_iden`),
  CONSTRAINT `amos_dure_anexo_cada_FK` FOREIGN KEY (`amos_dure_anexo_dure_iden`) REFERENCES `labo_amos_dure_cada` (`amos_dure_cada_iden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_dure_anexo_cada`
--

LOCK TABLES `labo_amos_dure_anexo_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_dure_anexo_cada` DISABLE KEYS */;
/*!40000 ALTER TABLE `labo_amos_dure_anexo_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_amos_dure_cada`
--

DROP TABLE IF EXISTS `labo_amos_dure_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_dure_cada` (
  `amos_dure_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_dure_cada_amos_iden` bigint(20) DEFAULT NULL,
  `amos_dure_cada_qtde` int(2) DEFAULT NULL,
  `amos_dure_cada_result` int(2) DEFAULT NULL COMMENT '0-Reprovado\r\n1-Informativo\r\n2-Toleravel\r\n3-Aprovado',
  `amos_dure_cada_dure_espe` varchar(50) DEFAULT NULL,
  `amos_dure_cada_dure_obti` varchar(50) DEFAULT NULL,
  `amos_dure_cada_vickers` int(3) DEFAULT NULL COMMENT '0-Nenhum\r\n1-Ensaio de Dureza Vickers\r\n2-Ensaio Microdureza Vickers',
  `amos_dure_cada_obs` blob DEFAULT NULL,
  `amos_dure_cada_espe_super` varchar(50) DEFAULT NULL,
  `amos_dure_cada_obti_super` varchar(50) DEFAULT NULL,
  `amos_dure_cada_espe_nucle` varchar(50) DEFAULT NULL,
  `amos_dure_cada_obti_nucle` varchar(50) DEFAULT NULL,
  `amos_dure_cada_fina` int(2) DEFAULT NULL,
  `amos_dure_cada_fina_data` timestamp NULL DEFAULT NULL COMMENT '0-Anexo\r\n1-Foto',
  `amos_dure_cada_fina_usua_iden` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`amos_dure_cada_iden`),
  KEY `amos_dure_cada_FK` (`amos_dure_cada_amos_iden`),
  KEY `amos_dure_cada_result_idx` (`amos_dure_cada_result`) USING BTREE,
  KEY `amos_dure_cada_fina_data_idx` (`amos_dure_cada_fina_data`) USING BTREE,
  KEY `amos_dure_cada_fina_usua_iden_idx` (`amos_dure_cada_fina_usua_iden`) USING BTREE,
  KEY `amos_dure_cada_fina_idx` (`amos_dure_cada_fina`) USING BTREE,
  CONSTRAINT `amos_dure_cada_FK` FOREIGN KEY (`amos_dure_cada_amos_iden`) REFERENCES `labo_amos_cada` (`amos_cada_iden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_dure_cada`
--

LOCK TABLES `labo_amos_dure_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_dure_cada` DISABLE KEYS */;
/*!40000 ALTER TABLE `labo_amos_dure_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_amos_macro_anexo_cada`
--

DROP TABLE IF EXISTS `labo_amos_macro_anexo_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_macro_anexo_cada` (
  `amos_macro_anexo_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_macro_anexo_macro_iden` bigint(20) DEFAULT NULL,
  `amos_macro_anexo_tipo` int(2) DEFAULT NULL COMMENT '0-Anexo\r\n1-Foto',
  `amos_macro_anexo_descr` varchar(1000) DEFAULT NULL,
  `amos_macro_anexo_arqui` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`amos_macro_anexo_cada_iden`),
  KEY `amos_macro_anexo_cada_FK` (`amos_macro_anexo_macro_iden`),
  CONSTRAINT `amos_macro_anexo_cada_FK` FOREIGN KEY (`amos_macro_anexo_macro_iden`) REFERENCES `labo_amos_macro_cada` (`amos_macro_cada_iden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_macro_anexo_cada`
--

LOCK TABLES `labo_amos_macro_anexo_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_macro_anexo_cada` DISABLE KEYS */;
INSERT INTO `labo_amos_macro_anexo_cada` VALUES (11,4,0,'XBFBCVBFGHF','putty.exe');
/*!40000 ALTER TABLE `labo_amos_macro_anexo_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_amos_macro_cada`
--

DROP TABLE IF EXISTS `labo_amos_macro_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_macro_cada` (
  `amos_macro_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_macro_cada_amos_iden` bigint(20) DEFAULT NULL,
  `amos_macro_cada_qtde` int(2) DEFAULT NULL,
  `amos_macro_cada_result` int(2) DEFAULT NULL COMMENT '0-Reprovado\r\n1-Informativo\r\n2-Toleravel\r\n3-Aprovado',
  `amos_macro_cada_obs` blob DEFAULT NULL,
  `amos_macro_cada_fina` int(2) DEFAULT NULL,
  `amos_macro_cada_fina_data` timestamp NULL DEFAULT NULL COMMENT '0-Anexo\r\n1-Foto',
  `amos_macro_cada_fina_usua_iden` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`amos_macro_cada_iden`),
  KEY `amos_macro_cada_FK` (`amos_macro_cada_amos_iden`),
  KEY `amos_macro_cada_result_idx` (`amos_macro_cada_result`) USING BTREE,
  KEY `amos_macro_cada_fina_data_idx` (`amos_macro_cada_fina_data`) USING BTREE,
  KEY `amos_macro_cada_fina_usua_iden_idx` (`amos_macro_cada_fina_usua_iden`) USING BTREE,
  KEY `amos_macro_cada_fina_idx` (`amos_macro_cada_fina`) USING BTREE,
  CONSTRAINT `amos_macro_cada_FK` FOREIGN KEY (`amos_macro_cada_amos_iden`) REFERENCES `labo_amos_cada` (`amos_cada_iden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_macro_cada`
--

LOCK TABLES `labo_amos_macro_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_macro_cada` DISABLE KEYS */;
INSERT INTO `labo_amos_macro_cada` VALUES (4,9,1,2,'TESTE',0,'0000-00-00 00:00:00',0);
/*!40000 ALTER TABLE `labo_amos_macro_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_amos_meta_anexo_cada`
--

DROP TABLE IF EXISTS `labo_amos_meta_anexo_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_meta_anexo_cada` (
  `amos_meta_anexo_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_meta_anexo_meta_iden` bigint(20) DEFAULT NULL,
  `amos_meta_anexo_tipo` int(2) DEFAULT NULL COMMENT '0-Anexo\r\n1-Foto',
  `amos_meta_anexo_descr` varchar(1000) DEFAULT NULL,
  `amos_meta_anexo_arqui` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`amos_meta_anexo_cada_iden`),
  KEY `amos_meta_anexo_cada_FK` (`amos_meta_anexo_meta_iden`),
  CONSTRAINT `amos_meta_anexo_cada_FK` FOREIGN KEY (`amos_meta_anexo_meta_iden`) REFERENCES `labo_amos_meta_cada` (`amos_meta_cada_iden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_meta_anexo_cada`
--

LOCK TABLES `labo_amos_meta_anexo_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_meta_anexo_cada` DISABLE KEYS */;
/*!40000 ALTER TABLE `labo_amos_meta_anexo_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_amos_meta_cada`
--

DROP TABLE IF EXISTS `labo_amos_meta_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_meta_cada` (
  `amos_meta_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_meta_cada_amos_iden` bigint(20) DEFAULT NULL,
  `amos_meta_cada_result` int(2) DEFAULT NULL COMMENT '0-Reprovado\r\n1-Informativo\r\n2-Toleravel\r\n3-Aprovado',
  `amos_meta_cada_reag` varchar(30) DEFAULT NULL,
  `amos_meta_cada_qtde` int(11) DEFAULT NULL,
  `amos_meta_cada_matriz` blob DEFAULT NULL,
  `amos_meta_cada_graos` blob DEFAULT NULL,
  `amos_meta_cada_parti` blob DEFAULT NULL,
  `amos_meta_cada_caract` blob DEFAULT NULL,
  `amos_meta_cada_obs` blob DEFAULT NULL,
  `amos_meta_cada_grafi` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_meta_cada_fina` int(2) DEFAULT NULL COMMENT '0-Não\r\n1-Sim',
  `amos_meta_cada_fina_data` timestamp NULL DEFAULT NULL,
  `amos_meta_cada_fina_usua_iden` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`amos_meta_cada_iden`),
  KEY `amos_meta_cada_result_idx` (`amos_meta_cada_result`) USING BTREE,
  KEY `amos_meta_cada_fina_idx` (`amos_meta_cada_fina`) USING BTREE,
  KEY `amos_meta_cada_fina_data_idx` (`amos_meta_cada_fina_data`) USING BTREE,
  KEY `amos_meta_cada_fina_usua_iden_idx` (`amos_meta_cada_fina_usua_iden`) USING BTREE,
  KEY `amos_meta_cada_fk` (`amos_meta_cada_amos_iden`),
  CONSTRAINT `amos_meta_cada_fk` FOREIGN KEY (`amos_meta_cada_amos_iden`) REFERENCES `labo_amos_cada` (`amos_cada_iden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_meta_cada`
--

LOCK TABLES `labo_amos_meta_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_meta_cada` DISABLE KEYS */;
INSERT INTO `labo_amos_meta_cada` VALUES (1,9,1,'NITAL - 3%',1,'M','T','P','C','OD',1,0,'0000-00-00 00:00:00','NULL');
/*!40000 ALTER TABLE `labo_amos_meta_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_amos_pcend_anexo_cada`
--

DROP TABLE IF EXISTS `labo_amos_pcend_anexo_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_pcend_anexo_cada` (
  `amos_pcend_anexo_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_pcend_anexo_pcend_iden` bigint(20) DEFAULT NULL,
  `amos_pcend_anexo_tipo` int(2) DEFAULT NULL COMMENT '0-Anexo\r\n1-Foto',
  `amos_pcend_anexo_descr` varchar(1000) DEFAULT NULL,
  `amos_pcend_anexo_arqui` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`amos_pcend_anexo_cada_iden`),
  KEY `amos_pcend_anexo_cada_FK` (`amos_pcend_anexo_pcend_iden`),
  CONSTRAINT `amos_pcend_anexo_cada_FK` FOREIGN KEY (`amos_pcend_anexo_pcend_iden`) REFERENCES `labo_amos_pcend_cada` (`amos_pcend_cada_iden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_pcend_anexo_cada`
--

LOCK TABLES `labo_amos_pcend_anexo_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_pcend_anexo_cada` DISABLE KEYS */;
INSERT INTO `labo_amos_pcend_anexo_cada` VALUES (12,6,0,'RRFRF4F4F4TG55G56YH','LAYOUT WSNFSE_PriMAX.pdf');
/*!40000 ALTER TABLE `labo_amos_pcend_anexo_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_amos_pcend_cada`
--

DROP TABLE IF EXISTS `labo_amos_pcend_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_pcend_cada` (
  `amos_pcend_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_pcend_cada_amos_iden` bigint(20) DEFAULT NULL,
  `amos_pcend_cada_qtde` int(2) DEFAULT NULL,
  `amos_pcend_cada_result` int(2) DEFAULT NULL COMMENT '0-Reprovado\r\n1-Informativo\r\n2-Toleravel\r\n3-Aprovado',
  `amos_pcend_cada_obs` blob DEFAULT NULL,
  `amos_pcend_cada_fina` int(2) DEFAULT NULL,
  `amos_pcend_cada_fina_data` timestamp NULL DEFAULT NULL COMMENT '0-Anexo\r\n1-Foto',
  `amos_pcend_cada_fina_usua_iden` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`amos_pcend_cada_iden`),
  KEY `amos_pcend_cada_FK` (`amos_pcend_cada_amos_iden`),
  KEY `amos_pcend_cada_result_idx` (`amos_pcend_cada_result`) USING BTREE,
  KEY `amos_pcend_cada_fina_data_idx` (`amos_pcend_cada_fina_data`) USING BTREE,
  KEY `amos_pcend_cada_fina_usua_iden_idx` (`amos_pcend_cada_fina_usua_iden`) USING BTREE,
  KEY `amos_pcend_cada_fina_idx` (`amos_pcend_cada_fina`) USING BTREE,
  CONSTRAINT `amos_pcend_cada_FK` FOREIGN KEY (`amos_pcend_cada_amos_iden`) REFERENCES `labo_amos_cada` (`amos_cada_iden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_pcend_cada`
--

LOCK TABLES `labo_amos_pcend_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_pcend_cada` DISABLE KEYS */;
INSERT INTO `labo_amos_pcend_cada` VALUES (6,9,1,2,'SASDASDASD',0,'0000-00-00 00:00:00',0);
/*!40000 ALTER TABLE `labo_amos_pcend_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_amos_quimi_cada`
--

DROP TABLE IF EXISTS `labo_amos_quimi_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_amos_quimi_cada` (
  `amos_quimi_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `amos_quimi_cada_amos_iden` bigint(20) DEFAULT NULL,
  `amos_quimi_cada_qtde` int(2) DEFAULT NULL,
  `amos_quimi_cada_result` int(2) DEFAULT NULL COMMENT '0-Reprovado\r\n1-Informativo\r\n2-Toleravel\r\n3-Aprovado',
  `amos_quimi_cada_espe_C` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_C` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Si` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Si` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Mn` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Mn` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_P` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_P` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_S` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_S` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Cr` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Cr` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Ni` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Ni` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Mo` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Mo` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Cu` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Cu` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Al` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Al` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Fe` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Fe` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_V` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_V` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Co` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Co` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Nb` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Nb` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Ti` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Ti` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_W` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_W` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Mg` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Mg` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Zn` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Zn` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Pb` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Pb` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Sb` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Sb` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Sn` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Sn` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Ca` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Ca` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Cl` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Cl` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_N` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_N` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Na` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Na` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_espe_Ceq` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obti_Ceq` varchar(80) DEFAULT NULL,
  `amos_quimi_cada_obs` blob DEFAULT NULL,
  `amos_quimi_cada_fina` int(2) DEFAULT NULL,
  `amos_quimi_cada_fina_data` timestamp NULL DEFAULT NULL COMMENT '0-Anexo\r\n1-Foto',
  `amos_quimi_cada_fina_usua_iden` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`amos_quimi_cada_iden`),
  KEY `amos_quimi_cada_FK` (`amos_quimi_cada_amos_iden`),
  KEY `amos_quimi_cada_result_idx` (`amos_quimi_cada_result`) USING BTREE,
  KEY `amos_quimi_cada_fina_data_idx` (`amos_quimi_cada_fina_data`) USING BTREE,
  KEY `amos_quimi_cada_fina_usua_iden_idx` (`amos_quimi_cada_fina_usua_iden`) USING BTREE,
  KEY `amos_quimi_cada_fina_idx` (`amos_quimi_cada_fina`) USING BTREE,
  CONSTRAINT `amos_quimi_cada_FK` FOREIGN KEY (`amos_quimi_cada_amos_iden`) REFERENCES `labo_amos_cada` (`amos_cada_iden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_amos_quimi_cada`
--

LOCK TABLES `labo_amos_quimi_cada` WRITE;
/*!40000 ALTER TABLE `labo_amos_quimi_cada` DISABLE KEYS */;
/*!40000 ALTER TABLE `labo_amos_quimi_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_area_cada`
--

DROP TABLE IF EXISTS `labo_area_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_area_cada` (
  `area_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `area_cada_refe` varchar(20) DEFAULT NULL,
  `area_cada_descr` varchar(150) DEFAULT NULL,
  `area_cada_stat` int(2) DEFAULT NULL COMMENT '0-Inativo\r\n1-Ativo',
  `area_cada_tenan` bigint(20) DEFAULT NULL,
  `area_cada_empre` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`area_cada_iden`),
  KEY `area_cada_refe_idx` (`area_cada_refe`) USING BTREE,
  KEY `area_cada_descr_idx` (`area_cada_descr`) USING BTREE,
  KEY `area_cada_stat_idx` (`area_cada_stat`) USING BTREE,
  KEY `area_cada_tenan_idx` (`area_cada_tenan`) USING BTREE,
  KEY `area_cada_empre_idx` (`area_cada_empre`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_area_cada`
--

LOCK TABLES `labo_area_cada` WRITE;
/*!40000 ALTER TABLE `labo_area_cada` DISABLE KEYS */;
INSERT INTO `labo_area_cada` VALUES (1,'LLL11','AREA 1',1,0,0);
/*!40000 ALTER TABLE `labo_area_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_clie_cada`
--

DROP TABLE IF EXISTS `labo_clie_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_clie_cada` (
  `clie_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `clie_cada_refe` varchar(20) DEFAULT NULL,
  `clie_cada_docu` varchar(20) DEFAULT NULL,
  `clie_cada_nome` varchar(150) DEFAULT NULL,
  `clie_cada_tenan` bigint(20) DEFAULT NULL,
  `clie_cada_empre` bigint(20) DEFAULT NULL,
  `clie_cada_stat` int(2) DEFAULT NULL COMMENT '0-Inativo\r\n1-Ativo',
  PRIMARY KEY (`clie_cada_iden`),
  KEY `clie_cada_tenan_idx` (`clie_cada_tenan`) USING BTREE,
  KEY `clie_cada_empr_idx` (`clie_cada_empre`) USING BTREE,
  KEY `clie_cada_refe_idx` (`clie_cada_refe`) USING BTREE,
  KEY `clie_cada_docu_idx` (`clie_cada_docu`) USING BTREE,
  KEY `clie_cada_nome_idx` (`clie_cada_nome`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_clie_cada`
--

LOCK TABLES `labo_clie_cada` WRITE;
/*!40000 ALTER TABLE `labo_clie_cada` DISABLE KEYS */;
INSERT INTO `labo_clie_cada` VALUES (2,'123','32.186.930/801','CLIENTE 1',0,0,1);
/*!40000 ALTER TABLE `labo_clie_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_fabr_cada`
--

DROP TABLE IF EXISTS `labo_fabr_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_fabr_cada` (
  `fabr_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `fabr_cada_refe` varchar(20) DEFAULT NULL,
  `fabr_cada_docu` varchar(20) DEFAULT NULL,
  `fabr_cada_nome` varchar(150) DEFAULT NULL,
  `fabr_cada_tenan` bigint(20) DEFAULT NULL,
  `fabr_cada_empre` bigint(20) DEFAULT NULL,
  `fabr_cada_stat` int(2) DEFAULT NULL COMMENT '0-Inativo\r\n1-Ativo',
  PRIMARY KEY (`fabr_cada_iden`),
  KEY `fabr_cada_refe_idx` (`fabr_cada_refe`) USING BTREE,
  KEY `fabr_cada_docu_idx` (`fabr_cada_docu`) USING BTREE,
  KEY `fabr_cada_nome_idx` (`fabr_cada_nome`) USING BTREE,
  KEY `fabr_cada_tenan_idx` (`fabr_cada_tenan`) USING BTREE,
  KEY `fabr_cada_empre_idx` (`fabr_cada_empre`) USING BTREE,
  KEY `fabr_cada_stat_idx` (`fabr_cada_stat`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_fabr_cada`
--

LOCK TABLES `labo_fabr_cada` WRITE;
/*!40000 ALTER TABLE `labo_fabr_cada` DISABLE KEYS */;
INSERT INTO `labo_fabr_cada` VALUES (3,'123','32.186.930/803','FABRICANTE 1',0,0,1);
/*!40000 ALTER TABLE `labo_fabr_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labo_mate_cada`
--

DROP TABLE IF EXISTS `labo_mate_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labo_mate_cada` (
  `mate_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `mate_cada_descr` varchar(150) DEFAULT NULL,
  `mate_cada_forne` varchar(150) DEFAULT NULL,
  `mate_cada_limi_resi` varchar(80) DEFAULT NULL,
  `mate_cada_limi_esco` varchar(80) DEFAULT NULL,
  `mate_cada_along` varchar(80) DEFAULT NULL,
  `mate_cada_redu_area` varchar(80) DEFAULT NULL,
  `mate_cada_dure` varchar(80) DEFAULT NULL,
  `mate_cada_dure_super` varchar(80) DEFAULT NULL,
  `mate_cada_dure_nucle` varchar(80) DEFAULT NULL,
  `mate_cada_impa` varchar(80) DEFAULT NULL,
  `mate_cada_prof_cama_endu` varchar(80) DEFAULT NULL,
  `mate_cada_C` varchar(80) DEFAULT NULL,
  `mate_cada_Si` varchar(80) DEFAULT NULL,
  `mate_cada_Mn` varchar(80) DEFAULT NULL,
  `mate_cada_P` varchar(80) DEFAULT NULL,
  `mate_cada_S` varchar(80) DEFAULT NULL,
  `mate_cada_Cr` varchar(80) DEFAULT NULL,
  `mate_cada_Ni` varchar(80) DEFAULT NULL,
  `mate_cada_Mo` varchar(80) DEFAULT NULL,
  `mate_cada_Cu` varchar(80) DEFAULT NULL,
  `mate_cada_Al` varchar(80) DEFAULT NULL,
  `mate_cada_Fe` varchar(80) DEFAULT NULL,
  `mate_cada_V` varchar(80) DEFAULT NULL,
  `mate_cada_Co` varchar(80) DEFAULT NULL,
  `mate_cada_Nb` varchar(80) DEFAULT NULL,
  `mate_cada_Ti` varchar(80) DEFAULT NULL,
  `mate_cada_W` varchar(80) DEFAULT NULL,
  `mate_cada_Mg` varchar(80) DEFAULT NULL,
  `mate_cada_Zn` varchar(80) DEFAULT NULL,
  `mate_cada_Pb` varchar(80) DEFAULT NULL,
  `mate_cada_Sb` varchar(80) DEFAULT NULL,
  `mate_cada_Sn` varchar(80) DEFAULT NULL,
  `mate_cada_Ca` varchar(80) DEFAULT NULL,
  `mate_cada_Cl` varchar(80) DEFAULT NULL,
  `mate_cada_N` varchar(80) DEFAULT NULL,
  `mate_cada_Na` varchar(80) DEFAULT NULL,
  `mate_cada_Ceq` varchar(80) DEFAULT NULL,
  `mate_cada_tenant_iden` bigint(20) DEFAULT NULL,
  `mate_cada_empre_iden` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`mate_cada_iden`),
  KEY `mate_cada_descr_idx` (`mate_cada_descr`) USING BTREE,
  KEY `mate_cada_forne_idx` (`mate_cada_forne`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labo_mate_cada`
--

LOCK TABLES `labo_mate_cada` WRITE;
/*!40000 ALTER TABLE `labo_mate_cada` DISABLE KEYS */;
INSERT INTO `labo_mate_cada` VALUES (1,'TESTE 2','TESTE1','1','2','3','4','5','5.1','5.2','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33',0,0);
/*!40000 ALTER TABLE `labo_mate_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sist_empre_cada`
--

DROP TABLE IF EXISTS `sist_empre_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sist_empre_cada` (
  `empre_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `empre_cada_docu` varchar(25) DEFAULT NULL,
  `empre_cada_docu_esta` varchar(25) DEFAULT NULL,
  `empre_cada_nome` varchar(150) DEFAULT NULL,
  `empre_cada_cep` varchar(20) DEFAULT NULL,
  `empre_cada_ende` varchar(150) DEFAULT NULL,
  `empre_cada_nume` varchar(10) DEFAULT NULL,
  `empre_cada_bairo` varchar(100) DEFAULT NULL,
  `empre_cada_cida` varchar(100) DEFAULT NULL,
  `empre_cada_esta` varchar(3) DEFAULT NULL,
  `empre_cada_usua_iden` bigint(20) DEFAULT NULL,
  `empre_cada_stat` int(2) DEFAULT NULL COMMENT '0 - Inativo\r\n1 - Ativo',
  `empre_cada_tenant` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`empre_cada_iden`),
  KEY `empre_cada_usua_iden_idx` (`empre_cada_usua_iden`) USING BTREE,
  KEY `empre_cada_nome_idx` (`empre_cada_nome`) USING BTREE,
  KEY `empre_cada_docu_idx` (`empre_cada_docu`) USING BTREE,
  KEY `empre_cada_stat_idx` (`empre_cada_stat`) USING BTREE,
  KEY `empre_cada_tenant_idx` (`empre_cada_tenant`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sist_empre_cada`
--

LOCK TABLES `sist_empre_cada` WRITE;
/*!40000 ALTER TABLE `sist_empre_cada` DISABLE KEYS */;
INSERT INTO `sist_empre_cada` VALUES (3,'00.360.305/0001-04','9687987987','EMPRESA 1','70092-900','ST BANCARIO SUL QUADRA 04','34','ASA SUL','BRASILIA','SP',21,1,2);
/*!40000 ALTER TABLE `sist_empre_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sist_para`
--

DROP TABLE IF EXISTS `sist_para`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sist_para` (
  `sist_para_iden` int(11) NOT NULL AUTO_INCREMENT,
  `sist_para_tenant` bigint(20) DEFAULT NULL,
  `sist_para_empre` bigint(20) DEFAULT NULL,
  `sis_para_logo` varchar(1000) DEFAULT NULL,
  `sis_para_selo` varchar(1000) DEFAULT NULL,
  `sist_para_smtp` varchar(256) DEFAULT NULL,
  `sist_para_porta` varchar(4) DEFAULT NULL,
  `sist_para_secu` varchar(20) DEFAULT NULL,
  `sist_para_auth` varchar(20) DEFAULT NULL,
  `sist_para_user` varchar(256) DEFAULT NULL,
  `sis_para_pwd` varchar(100) DEFAULT NULL,
  `sis_para_from` varchar(256) DEFAULT NULL,
  `sis_para_from_name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`sist_para_iden`),
  KEY `sist_para_tenant_idx` (`sist_para_tenant`) USING BTREE,
  KEY `sist_para_empre_idx` (`sist_para_empre`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sist_para`
--

LOCK TABLES `sist_para` WRITE;
/*!40000 ALTER TABLE `sist_para` DISABLE KEYS */;
INSERT INTO `sist_para` VALUES (1,0,0,'0_LOGO.PNG','0_SELO.PNG','smtp.gmail.com','587',NULL,'true','afzardo1@gmail.com','15963afz','sistema@provider.com','MENSAGEIRO DO SISTEMA');
/*!40000 ALTER TABLE `sist_para` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sist_tenant_cada`
--

DROP TABLE IF EXISTS `sist_tenant_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sist_tenant_cada` (
  `tenant_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `tenant_cada_docu` varchar(25) DEFAULT NULL,
  `tenant_cada_docu_esta` varchar(25) DEFAULT NULL,
  `tenant_cada_nome` varchar(150) DEFAULT NULL,
  `tenant_cada_cep` varchar(20) DEFAULT NULL,
  `tenant_cada_ende` varchar(150) DEFAULT NULL,
  `tenant_cada_nume` varchar(10) DEFAULT NULL,
  `tenant_cada_bairo` varchar(100) DEFAULT NULL,
  `tenant_cada_cida` varchar(100) DEFAULT NULL,
  `tenant_cada_esta` varchar(3) DEFAULT NULL,
  `tenant_cada_usua_iden` bigint(20) DEFAULT NULL,
  `tenant_cada_stat` int(2) DEFAULT NULL COMMENT '0 - Inativo\r\n1 - Ativo',
  PRIMARY KEY (`tenant_cada_iden`),
  KEY `tenant_cada_usua_iden_idx` (`tenant_cada_usua_iden`) USING BTREE,
  KEY `tenant_cada_nome_idx` (`tenant_cada_nome`) USING BTREE,
  KEY `tenant_cada_docu_idx` (`tenant_cada_docu`) USING BTREE,
  KEY `tenant_cada_stat_idx` (`tenant_cada_stat`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sist_tenant_cada`
--

LOCK TABLES `sist_tenant_cada` WRITE;
/*!40000 ALTER TABLE `sist_tenant_cada` DISABLE KEYS */;
INSERT INTO `sist_tenant_cada` VALUES (2,'321.869.308-03','123','INQUILINO 1','14160-340','RUA SEM ALI MERE','199','JARDIM AMÉRICA','SERTÃOZINHO','SP',21,1);
/*!40000 ALTER TABLE `sist_tenant_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sist_usua_aces_cada`
--

DROP TABLE IF EXISTS `sist_usua_aces_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sist_usua_aces_cada` (
  `usua_aces_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `usua_aces_cada_usua_iden` bigint(20) DEFAULT NULL,
  `usua_aces_cada_opca_iden` int(11) DEFAULT NULL,
  `usua_aces_cada_opca_stat` int(2) DEFAULT NULL COMMENT '0 - Inativo\r\n1 - Ativo',
  PRIMARY KEY (`usua_aces_cada_iden`),
  KEY `usua_aces_cada_fk` (`usua_aces_cada_usua_iden`),
  KEY `usua_aces_cada_opcao_iden_idx` (`usua_aces_cada_opca_iden`) USING BTREE,
  KEY `usua_aces_cada_opca_stat_idx` (`usua_aces_cada_opca_stat`) USING BTREE,
  CONSTRAINT `usua_aces_cada_fk` FOREIGN KEY (`usua_aces_cada_usua_iden`) REFERENCES `sist_usua_cada` (`usua_cada_iden`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sist_usua_aces_cada`
--

LOCK TABLES `sist_usua_aces_cada` WRITE;
/*!40000 ALTER TABLE `sist_usua_aces_cada` DISABLE KEYS */;
INSERT INTO `sist_usua_aces_cada` VALUES (5,1,11,1),(6,1,12,1),(7,1,13,1),(8,1,14,1),(9,21,11,1),(10,21,12,1),(11,21,13,1),(12,21,14,1),(13,1,21,1),(14,1,22,1),(15,1,23,1),(16,1,24,1),(17,21,21,0),(18,21,22,0),(19,21,23,0),(20,21,24,0),(21,1,31,1),(22,1,32,1),(23,1,33,1),(24,1,34,1),(25,1,41,1),(26,1,42,1),(27,1,43,1),(28,1,44,1),(29,21,31,1),(30,21,32,1),(31,21,33,1),(32,21,34,1),(33,21,41,1),(34,21,42,1),(35,21,43,1),(36,21,44,1),(37,1,51,1),(38,1,52,1),(39,1,53,1),(40,1,54,1),(41,1,61,1),(42,1,62,1),(43,1,63,1),(44,1,64,1),(45,1,71,1),(46,1,72,1),(47,1,73,1),(48,1,74,1),(49,1,81,1),(50,1,82,1),(51,1,83,1),(52,1,84,1),(53,1,91,1),(54,1,92,1),(55,1,93,1),(56,1,94,1),(57,21,51,0),(58,21,52,0),(59,21,53,0),(60,21,54,0),(61,21,61,0),(62,21,62,0),(63,21,63,0),(64,21,64,0),(65,21,71,0),(66,21,72,0),(67,21,73,0),(68,21,74,0),(69,21,81,0),(70,21,82,0),(71,21,83,0),(72,21,84,0),(73,21,91,0),(74,21,92,0),(75,21,93,0),(76,21,94,0),(77,1,101,1),(78,1,102,1),(79,1,103,1),(80,1,104,1),(81,1,111,1),(82,1,112,1),(83,1,113,1),(84,1,114,1),(85,1,115,1),(86,1,116,1),(87,1,117,1),(88,1,118,1),(89,1,119,1),(90,1,120,1),(91,1,121,1),(92,1,122,1),(93,21,101,0),(94,21,102,0),(95,21,103,0),(96,21,104,0),(97,21,111,0),(98,21,112,0),(99,21,113,0),(100,21,114,0),(101,21,115,0),(102,21,116,0),(103,21,117,0),(104,21,118,0),(105,21,119,0),(106,21,120,0),(107,21,121,0),(108,21,122,0),(109,21,123,0),(110,21,124,0),(111,21,125,0),(112,21,126,0),(113,1,123,1),(114,1,124,1),(115,1,125,1),(116,1,126,1),(117,1,127,1),(118,1,128,1),(119,1,129,1),(120,1,130,1);
/*!40000 ALTER TABLE `sist_usua_aces_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sist_usua_cada`
--

DROP TABLE IF EXISTS `sist_usua_cada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sist_usua_cada` (
  `usua_cada_iden` bigint(20) NOT NULL AUTO_INCREMENT,
  `usua_cada_nome` varchar(150) DEFAULT NULL,
  `usua_cada_tipo` varchar(60) DEFAULT NULL,
  `usua_cada_login` varchar(150) DEFAULT NULL,
  `usua_cada_senha` varchar(256) DEFAULT NULL,
  `usua_cada_status` int(2) DEFAULT NULL COMMENT '0 - Inativo\r\n1 - Ativo',
  `usua_cada_tenant` bigint(20) DEFAULT NULL COMMENT '0 - ADMINISTRADOR DE TENANTES',
  `usua_cada_empre` bigint(20) DEFAULT NULL,
  `usua_cada_troca_senha` int(2) DEFAULT NULL COMMENT '0 - Não Trocar\r\n1 - Trocar',
  `usua_cada_adm` int(1) DEFAULT NULL COMMENT '0 - Adm root\r\n1 - Outros',
  PRIMARY KEY (`usua_cada_iden`),
  KEY `usua_cada_nome_idx` (`usua_cada_nome`) USING BTREE,
  KEY `usua_cada_login_idx` (`usua_cada_login`) USING BTREE,
  KEY `usua_cada_senha_idx` (`usua_cada_senha`) USING BTREE,
  KEY `usua_cada_status_idx` (`usua_cada_status`) USING BTREE,
  KEY `usua_cada_tenant_idx` (`usua_cada_tenant`) USING BTREE,
  KEY `usua_cada_empre_idx` (`usua_cada_empre`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sist_usua_cada`
--

LOCK TABLES `sist_usua_cada` WRITE;
/*!40000 ALTER TABLE `sist_usua_cada` DISABLE KEYS */;
INSERT INTO `sist_usua_cada` VALUES (1,'ADMINISTRADOR DO SISTEMA 1','ADMINISTRADOR','admin@provider.com','21232f297a57a5a743894a0e4a801fc3',1,0,0,0,0),(21,'ALEXANDRE FARINELLI ZARDO','ADMINISTRADOR TENANT','afzardo1@gmail.com','1a52efa4fa28a1237d90c379fc9e4534',0,2,0,0,1);
/*!40000 ALTER TABLE `sist_usua_cada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'laboratorio'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-26 21:47:51
