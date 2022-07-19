# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: sg1-ss103.a2hosting.com (MySQL 5.5.5-10.5.15-MariaDB-cll-lve)
# Database: centra55_centralsoft
# Generation Time: 2022-04-03 03:36:25 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table bankAcct
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bankAcct`;

CREATE TABLE `bankAcct` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankAcctNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postcode` int(11) DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `tel1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fax` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `openingBal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `curBal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastTxnDate` int(11) DEFAULT NULL,
  `curTxnDate` int(11) DEFAULT NULL,
  `date_created` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glNo` int(11) DEFAULT NULL,
  `glSub` int(11) DEFAULT NULL,
  `glType` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `bankAcct` WRITE;
/*!40000 ALTER TABLE `bankAcct` DISABLE KEYS */;

INSERT INTO `bankAcct` (`id`, `companyID`, `bankID`, `bankName`, `bankAcctNo`, `address1`, `address2`, `postcode`, `city`, `state`, `country`, `level`, `tel1`, `tel2`, `fax`, `email`, `openingBal`, `curBal`, `lastTxnDate`, `curTxnDate`, `date_created`, `glNo`, `glSub`, `glType`)
VALUES
	(1,'codesquad','RHB','RHB Bank Berhad','RHB-123456','111, Lorong 456','Jalan Tun Juga',93350,'Kuching','Sarawak','Malaysia',NULL,'+60821238882','0821899999','0823377888','amb@gmail.com','0.00',NULL,NULL,NULL,'2021-11-13',4002,600,401),
	(2,'codesquad','AMB','AMB Bank Berhad','AMB-123456','111, Lorong 123','Jalan Tun Juga',87698,'Kuching','Sarawak','Malaysia',NULL,'+6082123777','0821899999','777666','amb@gmail.com','1200.00',NULL,NULL,NULL,'2021-11-13',4005,220,401),
	(4,'codesquad','PBB','PBB Bank Berhad','PBB-123456','111, Lorong 799','Jalan Tun Juga',87698,'Kuching','Sarawak','Malaysia',NULL,'+6082996688','0821899999','08233789890','pbb@gmail.com.my','0.00',NULL,NULL,NULL,'2021-11-16',4005,330,401),
	(5,'codesquad','CIMB','CIMB Bank','CIMB-123456','111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia',NULL,'+608217879','082777666','082555777','cimb@gmail.com.my','0.00',NULL,NULL,NULL,'2021-11-16',4005,660,401),
	(6,'codesquad','HSBC','Hongkong Bank','HSBC-123456','111, Lorong 0001','Jalan Tun Juga balle',43345,'Kuching','Sarawak','Malaysia',NULL,'+6082123887723','+6082123378764','0823373789883','hsbc@gmail.com','0.00',NULL,NULL,NULL,'2021-11-16',4005,550,401),
	(7,'codesquad','SCB','Standard CHarter','SCB-123456','111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia',NULL,'+60821238882','+60821238883','0823377666','percylim@gmail.com','0.00',NULL,NULL,NULL,'2021-12-27',4005,201,401),
	(8,'codesquad','SCB1','Standard Charter Bank Bhd.','SCB1-2333','111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia',NULL,'+60821238882','+60821238882','0828877666','percylim@gmail.com','0.00','0.00',NULL,NULL,'2022-02-01',4005,201,401),
	(9,'codesquad','BSN','BSN Bank Berhad','BSN-1233','979, Bayor Bukit Lorong 4','Tabuan Jaya',93350,'Kuching','SARAWAK','Malaysia',NULL,'+60821238882','+60821238882','082-1238887','bsn@gmail.com','0.00','0.00',NULL,NULL,'2022-02-02',4005,880,401);

/*!40000 ALTER TABLE `bankAcct` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryID` int(11) DEFAULT NULL,
  `categoryName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `catDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` int(11) DEFAULT NULL,
  `date_created` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO `category` (`id`, `companyID`, `categoryID`, `categoryName`, `catDescription`, `image`, `date_created`)
VALUES
	(1,'codesquad',10001,'Hardware - Household ','Hardware for Household and other',NULL,'2021-12-01'),
	(2,'codesquad',10002,'Hardware - Furniture','Hardware for Furniture manufacture',NULL,'2021-12-01'),
	(3,'codesquad',30001,'Canned Foodstuff','Canned Fish, meat and vegetable',NULL,'2021-12-01'),
	(4,'codesquad',30002,'Preserved Foods','Preserved vegetable and Meat',NULL,'2021-12-01'),
	(5,'codesquad',40001,'Office Furniture ','Office Furniture ',NULL,'2021-12-01'),
	(6,'codesquad',60001,'Building Material','Building and Construction material',NULL,'2021-12-01'),
	(7,'codesquad',70001,'Medical Products','Medical Products and accessories',NULL,'2021-12-28');

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table company
# ------------------------------------------------------------

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registerNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postCode` int(11) DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `incomeTaxNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `epfNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `socsoNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `finYearStart` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `finYearEnd` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telNo1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telNo2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telNo3` int(11) DEFAULT NULL,
  `faxNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;

INSERT INTO `company` (`id`, `companyID`, `companyName`, `registerNo`, `address1`, `address2`, `postCode`, `city`, `state`, `country`, `incomeTaxNo`, `epfNo`, `socsoNo`, `finYearStart`, `finYearEnd`, `telNo1`, `telNo2`, `telNo3`, `faxNo`, `email`, `website`, `date_created`)
VALUES
	(1,'centralsoft','Centralsoft Technology Sdn Bhd','ART12344DFGF','111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia','TAX899','EPF777','SOS15552SSDDXXX','2022-01-01','2022-12-31','+60821238882','098777',NULL,'082-12388835','percylim@gmail.com','www.centralsoft.com.my','2021-10-12'),
	(2,'codesquad','Code Squad Technology','REG12899DDDD','111, Lorong 123 ','Jalan Tun Juga balle',43345,'Kuching','Sarawak','Malaysia','TAX899ZVVA','EPF8998FFGG','SOS15552AUIIS','2022-01-01','2022-12-31','+60821238882','+60821238882',NULL,'082-1238883','percylim@gmail.com','www.centralsoft.com.my','2021-10-12');

/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table department
# ------------------------------------------------------------

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department` int(11) DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateCreated` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;

INSERT INTO `department` (`id`, `companyID`, `department`, `Description`, `dateCreated`)
VALUES
	(1,'codesquad',100,'Sales Department','2021-11-01'),
	(2,'codesquad',200,'Purchase Department (next try)','2021-11-01'),
	(3,'codesquad',300,'Hardware Department (test)','2021-11-01'),
	(4,'codesquad',400,'Fresh Foods Department (modify)','2021-11-01'),
	(5,'codesquad',500,'Furniture Department (modify)','2021-11-01'),
	(7,'codesquad',600,'Administration Department','2022-01-30'),
	(8,'codesquad',700,'Financial Department','2022-02-02'),
	(9,'codesquad',800,'IT Department','2022-02-16'),
	(10,'codesquad',810,'Electrical Department','2022-02-16');

/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table employee
# ------------------------------------------------------------

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeNo` int(11) DEFAULT NULL,
  `employeeName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nric` int(11) DEFAULT NULL,
  `sex` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateBirth` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postCode` int(11) DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `position` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otRate` int(11) DEFAULT NULL,
  `payMethod` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `incomeTaxNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `epfNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `socsoNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `drivingLicenseNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `childs` int(11) DEFAULT NULL,
  `employDate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hpNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maritalStatus` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `race` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` int(11) DEFAULT NULL,
  `companyName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;

INSERT INTO `employee` (`id`, `companyID`, `employeeNo`, `employeeName`, `nric`, `sex`, `dateBirth`, `address1`, `address2`, `postCode`, `city`, `state`, `country`, `level`, `position`, `salary`, `otRate`, `payMethod`, `incomeTaxNo`, `epfNo`, `socsoNo`, `drivingLicenseNo`, `childs`, `employDate`, `telNo`, `hpNo`, `email`, `password`, `maritalStatus`, `race`, `image`, `companyName`)
VALUES
	(43,'codesquad',2222,'Nancy',19909992,'M','1988-11-01','111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia',4,'Clerk','1230.00',NULL,'M','TAX899','EPF777','SOS15552','dvi1999',0,'2022-01-01','+60821238882','+60821238882','percylim@gmail.com','143cb9a6392975cdd98666ac19d863f6','M','Malay',NULL,'Code Squad Technology'),
	(44,'codesquad',111111,'Nancy chua',1289922,'M','1900-11-01','111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia',4,'43345','1200.00',NULL,'M','TAX899','EPF8998FFGG','','cdds888282',0,'2921-01-01','+60821238882','+60821238882','percylim@gmail.com','5323e4db8324db7f3793e28710a31834','M','Malay',NULL,'Code Squad Technology');

/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table epf
# ------------------------------------------------------------

DROP TABLE IF EXISTS `epf`;

CREATE TABLE `epf` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `startSalary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `endSalary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyRate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeRate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortSalary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `epf` WRITE;
/*!40000 ALTER TABLE `epf` DISABLE KEYS */;

INSERT INTO `epf` (`id`, `companyID`, `startSalary`, `endSalary`, `companyRate`, `employeeRate`, `remark`, `sortSalary`)
VALUES
	(1,'codesquad','10.01','20.09','1.10','0.90','Fist EPF','10.01'),
	(2,'codesquad','20.01','30.01','2.20','1.80','Test edit','20.01'),
	(3,'codesquad','30.01','40.01','3.30','2.70','test edit','30.01'),
	(4,'codesquad','50.00','60.01','5.50','4.50','Testing ','50.00'),
	(5,'codesquad','100.00','200.01','11.00','9.00','','100.00'),
	(6,'codesquad','300.00','400.00','33.00','27.00','',NULL),
	(7,'codesquad','500.00','600.00','55.00','45.00','',NULL),
	(8,'codesquad','700.00','800.00','77.00','63.00','',NULL),
	(9,'codesquad','900.01','1000.00','99.00','81.00','test','900.01'),
	(11,'codesquad','1200.00','1300.00','144.00','108.00','',NULL),
	(12,'codesquad','1100.00','1200.00','121.00','99.00','Testing Edit',NULL),
	(13,'codesquad','1300.00','1400.00','162.00','112.00','',NULL),
	(14,'codesquad','1400.00','1500.00','154.00','126.00','','1400.00'),
	(15,'codesquad','1000.01','2000.00','11.00','9.00','','1000.01'),
	(16,'codesquad','200.01','399.10','6.35','2.15','testing','200.01'),
	(17,'codesquad','1000.00','1100.00','12.00','11.00','Remark','1000.00');

/*!40000 ALTER TABLE `epf` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table glAccount
# ------------------------------------------------------------

DROP TABLE IF EXISTS `glAccount`;

CREATE TABLE `glAccount` (
  `id` int(11) DEFAULT NULL,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glNo` int(11) DEFAULT NULL,
  `glSub` int(11) DEFAULT NULL,
  `glType` int(11) DEFAULT NULL,
  `department` int(11) DEFAULT NULL,
  `glName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glAmount` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastTxnDate` int(11) DEFAULT NULL,
  `opBalance` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currentBalance` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `glAccount` WRITE;
/*!40000 ALTER TABLE `glAccount` DISABLE KEYS */;

INSERT INTO `glAccount` (`id`, `companyID`, `glNo`, `glSub`, `glType`, `department`, `glName`, `glDescription`, `glAmount`, `lastTxnDate`, `opBalance`, `currentBalance`)
VALUES
	(0,'codesquad',4002,600,401,600,'RHB Bank Account','RHB Bank Sdn Bhd Padugan Branch','100.00',NULL,'0.00','0.00'),
	(1,'codesquad',1000,100,201,300,'Credit Sales','Credit Sales (retail only)','123460.00',NULL,NULL,NULL),
	(2,'codesquad',1001,100,201,100,'Credit Sales','Credit Sales (retail)','0.00',NULL,NULL,NULL),
	(3,'codesquad',2001,100,201,100,'Credit Sales','Credit Sales (Wholesales)','0.00',NULL,NULL,NULL),
	(4,'codesquad',2001,200,201,100,'Credit Sales','Credit Sales (retail)','20.00',NULL,NULL,NULL),
	(5,'codesquad',2003,100,201,100,'Credit Sales','Credit Sales (retail)','-123450.00',NULL,NULL,NULL),
	(6,'codesquad',1000,102,201,100,'Cash Sales','Cash Sales (online retail)','-10.00',NULL,NULL,NULL),
	(7,'codesquad',1000,103,101,100,'Credit Sales','Credit Sales (online sales)','0.00',NULL,NULL,NULL),
	(8,'codesquad',2002,101,201,100,'Credit Sales (try)','Credit Sales (retail)','0.00',NULL,NULL,NULL),
	(9,'codesquad',1020,100,102,100,'Closing Stock','Closing Stock - Year End','110.00',NULL,NULL,NULL),
	(14,'codesquad',4001,101,401,100,'Cash in hand on Sales','Cash in hand ','-200.00',NULL,NULL,NULL),
	(15,'codesquad',2002,101,202,200,'Cash Purchase','Cash Purchase','0.00',NULL,'0.00','0.00'),
	(16,'codesquad',2002,102,202,200,'Credit Purchase','Credit Purchase (Retail)','0.00',NULL,'0.00','0.00'),
	(18,'codesquad',4005,120,401,600,'Cash On Hand','Cash On Hand','-20.00',NULL,'0.00','0.00'),
	(19,'codesquad',4005,201,401,600,'SCB Bank Account ','Standard Charter Bank ','-10.00',NULL,'0.00','0.00'),
	(20,'codesquad',4005,220,401,700,'AMB Bank','AMB Bank Account ','0.00',NULL,'0.00','0.00'),
	(21,'codesquad',4005,330,401,700,'PBB Bank','PBB Bank Account','0.00',NULL,'0.00','0.00'),
	(22,'codesquad',4005,440,401,700,'PBB Bank','Public Bank Account','0.00',NULL,'0.00','0.00'),
	(23,'codesquad',4005,550,401,700,'HSBC Bank','Hongkong And Shanghai Bank Account','0.00',NULL,'0.00','0.00'),
	(24,'codesquad',4005,660,401,700,'CIMB Bank','CIMB Bank Account','0.00',NULL,'0.00','0.00'),
	(25,'codesquad',4005,880,401,700,'BSC Bank','HSBC Bank Account','0.00',NULL,'0.00','0.00'),
	(26,'codesquad',4300,100,401,100,'Code Squard Technology','Wholesales Customer','0.00',NULL,'0.00','0.00'),
	(27,'codesquad',5001,101,501,800,'CentralSoft Technology','IT Supplier','0.00',NULL,'0.00','0.00'),
	(28,'codesquad',5001,110,501,400,'Zhunion Marketing','Retail Pack Supplier','0.00',NULL,'0.00','0.00');

/*!40000 ALTER TABLE `glAccount` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table glTxn
# ------------------------------------------------------------

DROP TABLE IF EXISTS `glTxn`;

CREATE TABLE `glTxn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voucherNo` int(11) DEFAULT NULL,
  `glNo` int(11) DEFAULT NULL,
  `glSub` int(11) DEFAULT NULL,
  `department` int(11) DEFAULT NULL,
  `glName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glType` int(11) DEFAULT NULL,
  `txnYear` int(11) DEFAULT NULL,
  `txnDate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnAmount` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `glTxn` WRITE;
/*!40000 ALTER TABLE `glTxn` DISABLE KEYS */;

INSERT INTO `glTxn` (`id`, `companyID`, `voucherNo`, `glNo`, `glSub`, `department`, `glName`, `glType`, `txnYear`, `txnDate`, `txnAmount`)
VALUES
	(216,'codesquad',NULL,1000,100,300,'Credit Sales',NULL,NULL,'2022-02-08','0.00'),
	(217,'codesquad',NULL,1000,102,100,'G/L Name-Cash Sales',NULL,NULL,'2022-02-08','0.00'),
	(218,'codesquad',NULL,1000,100,300,'Credit Sales',NULL,NULL,'2022-02-09','10.00'),
	(219,'codesquad',NULL,1000,102,100,'G/L Name-Cash Sales',NULL,NULL,'2022-02-09','-10.00'),
	(220,'codesquad',NULL,1020,100,100,'G/L Name-Closing Stock',NULL,NULL,'2022-02-08','0.00'),
	(221,'codesquad',NULL,4005,220,700,'G/L Name-AMB Bank',NULL,NULL,'2022-02-08','0.00'),
	(222,'codesquad',NULL,2001,200,100,'G/L Name-Credit Sales',NULL,NULL,'2022-02-08','20.00'),
	(223,'codesquad',NULL,4005,220,700,'G/L Name-AMB Bank',NULL,NULL,'2022-02-09','0.00'),
	(224,'codesquad',NULL,2001,200,100,'G/L Name-Credit Sales',NULL,NULL,'2022-02-09','0.00'),
	(226,'codesquad',NULL,4005,120,600,'G/L Name-Cash On Hand',NULL,NULL,'2022-02-09','-20.00'),
	(227,'codesquad',NULL,5001,100,100,'G/L Name-Cash in hand on Sales',NULL,NULL,'2022-02-09','10.00'),
	(228,'codesquad',NULL,4005,330,700,'G/L Name-PBB Bank',NULL,NULL,'2022-02-09','0.00'),
	(229,'codesquad',NULL,4005,201,600,'G/L Name-SCB Bank Account ',NULL,NULL,'2022-02-09','-10.00'),
	(230,'codesquad',NULL,1000,100,300,'Credit Sales',NULL,NULL,'2022-02-13','123450.00'),
	(231,'codesquad',NULL,2003,100,100,'G/L Name-Credit Sales',NULL,NULL,'2022-02-13','-123450.00'),
	(232,'codesquad',NULL,4002,600,600,'G/L Name-RHB Bank Account',NULL,NULL,'2022-02-13','100.00'),
	(233,'codesquad',NULL,5001,100,100,'G/L Name-Cash in hand on Sales',NULL,NULL,'2022-02-13','-100.00'),
	(234,'codesquad',NULL,1020,100,100,'G/L Name-Closing Stock',NULL,NULL,'2022-02-12','110.00'),
	(235,'codesquad',NULL,5001,100,100,'G/L Name-Cash in hand on Sales',NULL,NULL,'2022-02-12','-110.00');

/*!40000 ALTER TABLE `glTxn` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table image
# ------------------------------------------------------------

DROP TABLE IF EXISTS `image`;

CREATE TABLE `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imageID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imagePath` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_uploaded` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;

INSERT INTO `image` (`id`, `companyID`, `imageID`, `imagePath`, `date_uploaded`)
VALUES
	(1,'codesquad','codesquad-pilose.png','/public/uploads',NULL),
	(3,'codesquad','codesquad-bakuteh.png','/public/uploads','2021-12-03'),
	(4,'codesquad','codesquad-barbury.png','/public/uploads','2021-12-03'),
	(5,'codesquad','codesquad-sengkee.png','/public/uploads','2021-12-03'),
	(6,'codesquad','codesquad-bioplastfab.png','/public/uploads','2021-12-03'),
	(7,'codesquad','codesquad-chicken_soup.png','/public/uploads','2021-12-03'),
	(8,'codesquad','codesquad-GLUCOSD.png','/public/uploads','2021-12-03'),
	(9,'codesquad','codesquad-kuching_laska.png','/public/uploads','2021-12-03'),
	(10,'codesquad','codesquad-chrysannthermum.png','/public/uploads','2021-12-16'),
	(11,'codesquad','codesquad-biopadhs1105.png','/public/uploads','2021-12-28'),
	(12,'codesquad','codesquad-biopadplaster.png','/public/uploads','2021-12-28'),
	(14,'codesquad','codesquad-wahkee.png','/public/uploads','2021-12-30'),
	(15,'codesquad','codesquad-white_pepper.png','/public/uploads','2021-12-30'),
	(16,'codesquad','codesquad-lotus_seed.png','/public/uploads','2021-12-30');

/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table invoiceTxn
# ------------------------------------------------------------

DROP TABLE IF EXISTS `invoiceTxn`;

CREATE TABLE `invoiceTxn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custSuppID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custSuppName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnType` int(11) DEFAULT NULL,
  `documentNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voucherNo` int(11) DEFAULT NULL,
  `invoiceNo` int(11) DEFAULT NULL,
  `txnDate` int(11) DEFAULT NULL,
  `txnParticular` int(11) DEFAULT NULL,
  `txnTotal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxID` int(11) DEFAULT NULL,
  `taxRate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxTotal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `netTaxTotal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table jeTmp
# ------------------------------------------------------------

DROP TABLE IF EXISTS `jeTmp`;

CREATE TABLE `jeTmp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glNo` int(11) DEFAULT NULL,
  `glSub` int(11) DEFAULT NULL,
  `department` int(11) DEFAULT NULL,
  `glName` int(11) DEFAULT NULL,
  `glDescription` int(11) DEFAULT NULL,
  `jeParticular` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vouchNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `drAmt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnDate` int(11) DEFAULT NULL,
  `crAmt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table journal
# ------------------------------------------------------------

DROP TABLE IF EXISTS `journal`;

CREATE TABLE `journal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glNo` int(11) DEFAULT NULL,
  `glSub` int(11) DEFAULT NULL,
  `department` int(11) DEFAULT NULL,
  `glName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glDescription` int(11) DEFAULT NULL,
  `jeParticular` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voucherNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `drAmt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `crAmt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnDate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voucherType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `totalDrAmt` int(11) DEFAULT NULL,
  `totalCrAmt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `journal` WRITE;
/*!40000 ALTER TABLE `journal` DISABLE KEYS */;

INSERT INTO `journal` (`id`, `companyID`, `glNo`, `glSub`, `department`, `glName`, `glDescription`, `jeParticular`, `voucherNo`, `drAmt`, `crAmt`, `userName`, `txnDate`, `voucherType`, `date_created`, `totalDrAmt`, `totalCrAmt`)
VALUES
	(315,'codesquad',1000,100,300,'Credit Sales',NULL,'www','JV111','10.00','0.00','Percy Lim','2022-02-09','JV','2022-02-10',NULL,NULL),
	(316,'codesquad',1000,102,100,'G/L Name-Cash Sales',NULL,'www','JV111','0.00','10.00','Percy Lim','2022-02-09','JV','2022-02-10',NULL,NULL),
	(317,'codesquad',2001,200,100,'G/L Name-Credit Sales',NULL,'aassa','JV111','20.00','0.00','Percy Lim','2022-02-09','JV','2022-02-10',NULL,NULL),
	(318,'codesquad',4005,120,600,'G/L Name-Cash On Hand',NULL,'aassa','JV111','0.00','20.00','Percy Lim','2022-02-09','JV','2022-02-10',NULL,NULL),
	(319,'codesquad',5001,100,100,'G/L Name-Cash in hand on Sales',NULL,'asasasd','JV111','30.00','0.00','Percy Lim','2022-02-09','JV','2022-02-10',NULL,NULL),
	(320,'codesquad',5001,100,100,'G/L Name-Cash in hand on Sales',NULL,'eeew','JV111','0.00','20.00','Percy Lim','2022-02-09','JV','2022-02-10',NULL,NULL),
	(321,'codesquad',4005,201,600,'G/L Name-SCB Bank Account ',NULL,'eeew','JV111','0.00','10.00','Percy Lim','2022-02-09','JV','2022-02-10',NULL,NULL),
	(324,'codesquad',1000,100,300,'Credit Sales',NULL,'Testing ','JV222','123450.00','0.00','Percy Lim','2022-02-13','JV','2022-02-13',NULL,NULL),
	(325,'codesquad',2003,100,100,'G/L Name-Credit Sales',NULL,'test edit','JV222','0.00','123450.00','Percy Lim','2022-02-13','JV','2022-02-13',NULL,NULL),
	(326,'codesquad',4002,600,600,'G/L Name-RHB Bank Account',NULL,'test edit','JV222','100.00','0.00','Percy Lim','2022-02-13','JV','2022-02-13',NULL,NULL),
	(327,'codesquad',5001,100,100,'G/L Name-Cash in hand on Sales',NULL,'test edit','JV222','0.00','100.00','Percy Lim','2022-02-13','JV','2022-02-13',NULL,NULL),
	(328,'codesquad',1020,100,100,'G/L Name-Closing Stock',NULL,'test new RV','RV333','110.00','0.00','Percy Lim','2022-02-12','JV','2022-02-13',NULL,NULL),
	(329,'codesquad',5001,100,100,'G/L Name-Cash in hand on Sales',NULL,'test new RV','RV333','0.00','110.00','Percy Lim','2022-02-12','JV','2022-02-13',NULL,NULL);

/*!40000 ALTER TABLE `journal` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table journalChange
# ------------------------------------------------------------

DROP TABLE IF EXISTS `journalChange`;

CREATE TABLE `journalChange` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glNo` int(11) DEFAULT NULL,
  `glSub` int(11) DEFAULT NULL,
  `department` int(11) DEFAULT NULL,
  `glName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jeParticular` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voucherNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glDescription` int(11) DEFAULT NULL,
  `drAmt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `crAmt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnDate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voucherType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userChange` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateChange` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reasons` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `journalChange` WRITE;
/*!40000 ALTER TABLE `journalChange` DISABLE KEYS */;

INSERT INTO `journalChange` (`id`, `companyID`, `glNo`, `glSub`, `department`, `glName`, `jeParticular`, `voucherNo`, `glDescription`, `drAmt`, `crAmt`, `userName`, `txnDate`, `voucherType`, `userChange`, `dateChange`, `status`, `reasons`)
VALUES
	(33,'codesquad',1000,100,300,'Credit Sales','test','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Deleted'),
	(34,'codesquad',1000,102,100,'G/L Name-Cash Sales','test','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Deleted'),
	(35,'codesquad',1000,100,300,'Credit Sales','sdsdsad','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Deleted'),
	(36,'codesquad',1000,102,100,'G/L Name-Cash Sales','sdsdsad','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Deleted'),
	(37,'codesquad',1000,100,300,'Credit Sales','assa','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Deleted'),
	(38,'codesquad',1000,103,100,'G/L Name-Credit Sales','assa','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Deleted'),
	(39,'codesquad',1000,100,300,'Credit Sales','aaa','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Deleted'),
	(40,'codesquad',1000,102,100,'G/L Name-Cash Sales','aaa','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Deleted'),
	(41,'codesquad',1000,100,300,'Credit Sales','asas','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Deleted'),
	(42,'codesquad',1000,102,100,'G/L Name-Cash Sales','asas','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Deleted'),
	(43,'codesquad',1000,102,100,'G/L Name-Cash Sales','aaaa','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(44,'codesquad',1000,102,100,'G/L Name-Cash Sales','aaaa','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(45,'codesquad',1000,100,300,'G/L Name-Credit Sales','aaaa','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(46,'codesquad',1000,100,300,'Credit Sales','dssdds','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(47,'codesquad',1000,102,100,'G/L Name-Cash Sales','dssdds','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(48,'codesquad',1000,100,300,'Credit Sales','addasd','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(49,'codesquad',1000,102,100,'G/L Name-Cash Sales','addasd','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(50,'codesquad',1000,100,300,'Credit Sales','asaasas','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(51,'codesquad',1000,100,300,'Credit Sales','adsas','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(52,'codesquad',1000,100,300,'Credit Sales','adsas','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(53,'codesquad',1000,102,100,'G/L Name-Cash Sales','adsas','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(54,'codesquad',1000,100,300,'Credit Sales','adsas','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(55,'codesquad',1000,102,100,'G/L Name-Cash Sales','adsas','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(56,'codesquad',2001,100,100,'G/L Name-Credit Sales','sssdada','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(57,'codesquad',5001,100,100,'G/L Name-Cash in hand on Sales','sssdada','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(58,'codesquad',1000,100,300,'Credit Sales','sassas','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(59,'codesquad',1000,100,300,'Credit Sales','aaas','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(60,'codesquad',1000,102,100,'G/L Name-Cash Sales','aaas','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(61,'codesquad',1000,100,300,'Credit Sales','dwaaw','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(62,'codesquad',1000,102,100,'G/L Name-Cash Sales','dwaaw','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-10','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(63,'codesquad',1000,100,300,'Credit Sales','dwaaw','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(64,'codesquad',1000,100,300,'Credit Sales','dwaaw','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(65,'codesquad',1000,102,100,'G/L Name-Cash Sales','dwaaw','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(66,'codesquad',2001,100,100,'G/L Name-Credit Sales','asasas','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(67,'codesquad',5001,100,100,'G/L Name-Cash in hand on Sales','asasas','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(68,'codesquad',1000,100,300,'Credit Sales','dwaaw','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(69,'codesquad',1000,102,100,'G/L Name-Cash Sales','dwaaw','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(70,'codesquad',2001,100,100,'G/L Name-Credit Sales','asasas','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(71,'codesquad',5001,100,100,'G/L Name-Cash in hand on Sales','asasas','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(72,'codesquad',1000,100,300,'Credit Sales','dwaaw','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(73,'codesquad',1000,102,100,'G/L Name-Cash Sales','dwaaw','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(74,'codesquad',2001,100,100,'G/L Name-Credit Sales','asasas','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(75,'codesquad',5001,100,100,'G/L Name-Cash in hand on Sales','asasas','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(76,'codesquad',2001,200,100,'G/L Name-Credit Sales','wqqwqw','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(77,'codesquad',2003,100,100,'G/L Name-Credit Sales','wqqwqw','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(78,'codesquad',1000,100,300,'Credit Sales','sa','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(79,'codesquad',1000,102,100,'G/L Name-Cash Sales','sa','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(80,'codesquad',1000,100,300,'Credit Sales','eqweqe','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-04','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(81,'codesquad',1000,102,100,'G/L Name-Cash Sales','eqweqe','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-04','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(82,'codesquad',1000,100,300,'Credit Sales','aa','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(83,'codesquad',1000,102,100,'G/L Name-Cash Sales','aa','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(84,'codesquad',1000,100,300,'Credit Sales','aa','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(85,'codesquad',1000,102,100,'G/L Name-Cash Sales','aa','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(86,'codesquad',2001,100,100,'G/L Name-Credit Sales','ASASASA','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(87,'codesquad',5001,100,100,'G/L Name-Cash in hand on Sales','ASASASA','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(88,'codesquad',1000,100,300,'Credit Sales','aa','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(89,'codesquad',1000,102,100,'G/L Name-Cash Sales','aa','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(90,'codesquad',2001,100,100,'G/L Name-Credit Sales','ASASASA','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(91,'codesquad',5001,100,100,'G/L Name-Cash in hand on Sales','ASASASA','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(92,'codesquad',1000,100,300,'Credit Sales','aa','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(93,'codesquad',1000,102,100,'G/L Name-Cash Sales','aa','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(94,'codesquad',2001,100,100,'G/L Name-Credit Sales','ASASASA','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(95,'codesquad',5001,100,100,'G/L Name-Cash in hand on Sales','ASASASA','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(96,'codesquad',1000,100,300,'Credit Sales','aa','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(97,'codesquad',1000,102,100,'G/L Name-Cash Sales','aa','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(98,'codesquad',2001,100,100,'G/L Name-Credit Sales','ASASASA','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(99,'codesquad',5001,100,100,'G/L Name-Cash in hand on Sales','ASASASA','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-07','JV','Percy Lim','2022-02-07','JV','Voucher Edit Change'),
	(100,'codesquad',1000,100,300,'Credit Sales','Testing new Voucher','JV111',NULL,'123456780.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Deleted'),
	(101,'codesquad',1000,102,100,'G/L Name-Cash Sales','Testing new Voucher','JV111',NULL,'0.00','123456780.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Deleted'),
	(102,'codesquad',1000,100,300,'Credit Sales','testing new voucher','JV111',NULL,'123456780.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Deleted'),
	(103,'codesquad',1000,103,100,'G/L Name-Credit Sales','testing new voucher','JV111',NULL,'0.00','123456780.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Deleted'),
	(104,'codesquad',1000,100,300,'Credit Sales','sssas','JV111',NULL,'123456780.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Deleted'),
	(105,'codesquad',1000,102,100,'G/L Name-Cash Sales','sssas','JV111',NULL,'0.00','123456780.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Deleted'),
	(106,'codesquad',1000,100,300,'Credit Sales','test','JV111',NULL,'123456780.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Deleted'),
	(107,'codesquad',1000,102,100,'G/L Name-Cash Sales','test','JV111',NULL,'0.00','123456780.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Deleted'),
	(108,'codesquad',1000,100,300,'Credit Sales','test','JV112',NULL,'1000.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(109,'codesquad',1001,100,100,'G/L Name-Credit Sales','test','JV112',NULL,'0.00','1000.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(110,'codesquad',1000,100,300,'Credit Sales','ererer','JV111',NULL,'123456780.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(111,'codesquad',1000,102,100,'G/L Name-Cash Sales','ererer','JV111',NULL,'0.00','123456780.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(112,'codesquad',1000,100,300,'Credit Sales','Testing first JV','JV111',NULL,'1000.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(113,'codesquad',1000,102,100,'G/L Name-Cash Sales','Testing first JV','JV111',NULL,'0.00','1000.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(114,'codesquad',1000,102,100,'G/L Name-Cash Sales','testing first JV','JV111',NULL,'0.00','1000.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(115,'codesquad',1000,100,300,'G/L Name-Credit Sales','testing first JV','JV111',NULL,'1000.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(116,'codesquad',1000,100,300,'Credit Sales','test','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(117,'codesquad',1000,102,100,'G/L Name-Cash Sales','test','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(118,'codesquad',1000,100,300,'Credit Sales','Tetsing 2','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(119,'codesquad',1000,102,100,'G/L Name-Cash Sales','Tetsing 2','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(120,'codesquad',1000,100,300,'Credit Sales','test','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(121,'codesquad',1000,102,100,'G/L Name-Cash Sales','test','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(122,'codesquad',1000,100,300,'Credit Sales','test','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(123,'codesquad',1000,102,100,'G/L Name-Cash Sales','test','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(124,'codesquad',1000,100,300,'Credit Sales','testoing','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(125,'codesquad',1000,102,100,'G/L Name-Cash Sales','testoing','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(126,'codesquad',1000,100,300,'Credit Sales','testing','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(127,'codesquad',1000,100,300,'Credit Sales','testing','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(128,'codesquad',1000,102,100,'G/L Name-Cash Sales','testing','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(129,'codesquad',1000,100,300,'Credit Sales','testing','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(130,'codesquad',1000,102,100,'G/L Name-Cash Sales','testing','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(131,'codesquad',2001,100,100,'G/L Name-Credit Sales','test edit','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(132,'codesquad',4002,600,600,'G/L Name-RHB Bank Account','test edit','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(133,'codesquad',1000,100,300,'Credit Sales','testing','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(134,'codesquad',1000,102,100,'G/L Name-Cash Sales','testing','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(135,'codesquad',2001,100,100,'G/L Name-Credit Sales','test edit','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(136,'codesquad',4002,600,600,'G/L Name-RHB Bank Account','test edit','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(137,'codesquad',2001,200,100,'G/L Name-Credit Sales','tes','JV111',NULL,'30.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(138,'codesquad',4005,550,700,'G/L Name-HSBC Bank','tes','JV111',NULL,'0.00','30.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(139,'codesquad',1000,100,300,'Credit Sales','testing','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(140,'codesquad',1000,102,100,'G/L Name-Cash Sales','testing','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(141,'codesquad',2001,100,100,'G/L Name-Credit Sales','test edit','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(142,'codesquad',4002,600,600,'G/L Name-RHB Bank Account','test edit','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(143,'codesquad',2001,200,100,'G/L Name-Credit Sales','tes','JV111',NULL,'30.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(144,'codesquad',4005,550,700,'G/L Name-HSBC Bank','tes','JV111',NULL,'0.00','30.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(145,'codesquad',2002,101,200,'G/L Name-Cash Purchase','wqewewq','JV111',NULL,'40.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(146,'codesquad',4005,660,700,'G/L Name-CIMB Bank','wqewewq','JV111',NULL,'0.00','30.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(147,'codesquad',5001,100,100,'G/L Name-Cash in hand on Sales','wqewewq','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(148,'codesquad',1000,100,300,'Credit Sales','testing','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(149,'codesquad',1000,102,100,'G/L Name-Cash Sales','testing','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(150,'codesquad',2001,100,100,'G/L Name-Credit Sales','test edit','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(151,'codesquad',4002,600,600,'G/L Name-RHB Bank Account','test edit','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(152,'codesquad',2001,200,100,'G/L Name-Credit Sales','tes','JV111',NULL,'30.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(153,'codesquad',4005,550,700,'G/L Name-HSBC Bank','tes','JV111',NULL,'0.00','30.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(154,'codesquad',2002,101,200,'G/L Name-Cash Purchase','wqewewq','JV111',NULL,'40.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(155,'codesquad',4005,660,700,'G/L Name-CIMB Bank','wqewewq','JV111',NULL,'0.00','30.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(156,'codesquad',5001,100,100,'G/L Name-Cash in hand on Sales','wqewewq','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(157,'codesquad',2001,100,100,'G/L Name-Credit Sales','wweew','JV111',NULL,'50.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(158,'codesquad',4005,440,700,'G/L Name-PBB Bank','wweew','JV111',NULL,'0.00','50.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(159,'codesquad',1000,102,100,'G/L Name-Cash Sales','aaaa','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(160,'codesquad',1000,100,300,'G/L Name-Credit Sales','aaaa','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(161,'codesquad',1000,100,300,'Credit Sales','eqqq','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(162,'codesquad',1000,102,100,'G/L Name-Cash Sales','eqqq','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(163,'codesquad',1000,100,300,'Credit Sales','wqqwqw','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(164,'codesquad',1000,102,100,'G/L Name-Cash Sales','wqqwqw','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(165,'codesquad',1000,100,300,'Credit Sales','asaasas','JV111',NULL,'30.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(166,'codesquad',1000,102,100,'G/L Name-Cash Sales','asaasas','JV111',NULL,'0.00','30.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(167,'codesquad',1000,100,300,'Credit Sales','asasas','JV111',NULL,'40.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(168,'codesquad',1000,102,100,'G/L Name-Cash Sales','asasas','JV111',NULL,'0.00','40.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(169,'codesquad',1000,100,300,'Credit Sales','sssaas','JV111',NULL,'50.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Deleted'),
	(170,'codesquad',1000,102,100,'G/L Name-Cash Sales','sssaas','JV111',NULL,'0.00','50.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Deleted'),
	(171,'codesquad',1000,100,300,'Credit Sales','asaasas','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(172,'codesquad',1000,102,100,'G/L Name-Cash Sales','asaasas','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(173,'codesquad',1000,100,300,'Credit Sales','daasa','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(174,'codesquad',1000,102,100,'G/L Name-Cash Sales','daasa','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(175,'codesquad',1000,100,300,'Credit Sales','assas','JV111',NULL,'30.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(176,'codesquad',1000,102,100,'G/L Name-Cash Sales','assas','JV111',NULL,'0.00','30.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(177,'codesquad',1000,100,300,'G/L Name-Credit Sales','qqwqw','JV111',NULL,'40.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(178,'codesquad',1000,102,100,'G/L Name-Cash Sales','qqwqw','JV111',NULL,'0.00','40.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(179,'codesquad',1000,100,300,'Credit Sales','sasasa','JV111',NULL,'50.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(180,'codesquad',1000,102,100,'G/L Name-Cash Sales','sasasa','JV111',NULL,'0.00','50.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(181,'codesquad',1000,100,300,'Credit Sales','saasas','JV111',NULL,'60.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(182,'codesquad',1000,102,100,'G/L Name-Cash Sales','saasas','JV111',NULL,'0.00','60.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(183,'codesquad',1000,100,300,'Credit Sales','aasa','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(184,'codesquad',1000,102,100,'G/L Name-Cash Sales','aasa','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(185,'codesquad',1000,102,100,'G/L Name-Cash Sales','sasdasas','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(186,'codesquad',1000,100,300,'G/L Name-Credit Sales','sasdasas','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(187,'codesquad',1000,100,300,'G/L Name-Credit Sales','sasdasas','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(188,'codesquad',1020,100,100,'G/L Name-Closing Stock','asaaas','JV111',NULL,'30.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(189,'codesquad',4005,220,700,'G/L Name-AMB Bank','asaaas','JV111',NULL,'0.00','30.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(190,'codesquad',1020,100,100,'G/L Name-Closing Stock','asaaas','JV111',NULL,'30.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(191,'codesquad',4005,220,700,'G/L Name-AMB Bank','asaaas','JV111',NULL,'0.00','30.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(192,'codesquad',2001,200,100,'G/L Name-Credit Sales','qwqwqw','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(193,'codesquad',1000,100,300,'Credit Sales','www','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(194,'codesquad',1000,102,100,'G/L Name-Cash Sales','www','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-09','JV','Voucher Edit Change'),
	(195,'codesquad',1000,100,300,'Credit Sales','www','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-10','JV','Voucher Edit Change'),
	(196,'codesquad',1000,102,100,'G/L Name-Cash Sales','www','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-10','JV','Voucher Edit Change'),
	(197,'codesquad',2001,200,100,'G/L Name-Credit Sales','aassa','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-10','JV','Voucher Edit Change'),
	(198,'codesquad',4005,120,600,'G/L Name-Cash On Hand','aassa','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-08','JV','Percy Lim','2022-02-10','JV','Voucher Edit Change'),
	(199,'codesquad',1000,100,300,'Credit Sales','www','JV111',NULL,'10.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-10','JV','Voucher Edit Change'),
	(200,'codesquad',1000,102,100,'G/L Name-Cash Sales','www','JV111',NULL,'0.00','10.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-10','JV','Voucher Edit Change'),
	(201,'codesquad',2001,200,100,'G/L Name-Credit Sales','aassa','JV111',NULL,'20.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-10','JV','Voucher Edit Change'),
	(202,'codesquad',4005,120,600,'G/L Name-Cash On Hand','aassa','JV111',NULL,'0.00','20.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-10','JV','Voucher Edit Change'),
	(203,'codesquad',5001,100,100,'G/L Name-Cash in hand on Sales','asasasd','JV111',NULL,'30.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-10','JV','Voucher Edit Change'),
	(204,'codesquad',4005,330,700,'G/L Name-PBB Bank','asasasd','JV111',NULL,'0.00','30.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-10','JV','Voucher Edit Change'),
	(205,'codesquad',1000,100,300,'Credit Sales','Testing ','JV222',NULL,'123450.00','0.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-13','JV','Voucher Edit Change'),
	(206,'codesquad',1000,102,100,'G/L Name-Cash Sales','Testing ','JV222',NULL,'0.00','123450.00','Percy Lim','2022-02-09','JV','Percy Lim','2022-02-13','JV','Voucher Edit Change');

/*!40000 ALTER TABLE `journalChange` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku` int(11) DEFAULT NULL,
  `barcode` bigint(11) DEFAULT NULL,
  `productName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unitPrice` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL,
  `stockLocation` int(11) DEFAULT NULL,
  `productImage` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

INSERT INTO `product` (`id`, `companyID`, `productID`, `sku`, `barcode`, `productName`, `description`, `unit`, `unitPrice`, `date_created`, `categoryID`, `cost`, `balance`, `stockLocation`, `productImage`)
VALUES
	(2,'codesquad','BARBURY',898772,1234567890123,'Magager','Accountant','pack','12.00','2021-12-27','30002',NULL,NULL,NULL,'codesquad-barbury.png'),
	(3,'codesquad','BIOPLUS',17171005,17172233569024,'Bioplus plaster','60 pcs / box','box','12.54','2021-12-28','30002',NULL,NULL,NULL,'codesquad-biopadplaster.png'),
	(4,'codesquad','GLUCOSED',987773,123456789012333,'Glucose-D Glucosa','10x20gm pack','pack','36.00','2021-12-28','30002',NULL,NULL,NULL,'codesquad-GLUCOSD.png'),
	(5,'codesquad','SENGKEE',172883,1234567890123,'Jin Lu Brand Seng Kee Tang','30gm / pack','pack','12.00','2021-12-28','30002',NULL,NULL,NULL,'codesquad-sengkee.png'),
	(6,'codesquad','LAKSA',367882,1234567890123,'Golden Deer Kuching Laksa','50gm','pack','6.34','2021-12-28','30002',NULL,NULL,NULL,'codesquad-kuching_laska.png'),
	(7,'codesquad','BUBARY',123456,1234567890123,'Golden Deer Buabury health product','120gm','pack','12.59','2021-12-28','10001',NULL,NULL,NULL,'codesquad-barbury.png'),
	(8,'codesquad','BIOPLASTWOUND',8988844,1234567890123,'Bioplast Wound Dressing','100pcs','box','11.00','2021-12-28','70001',NULL,NULL,NULL,'codesquad-biopadhs1105.png'),
	(9,'codesquad','BIOPLAST1105',123456,123456789012333,'Bioplast 1105 plaster','100pcs','box','12.00','2021-12-28','10001',NULL,NULL,NULL,'codesquad-bakuteh.png'),
	(10,'codesquad','LOTUS_SEED',17171005,17172233569024,'Jin Lu Brand Lotus Seed','100gm','pack','3.00','2021-12-30','30002',NULL,NULL,NULL,'codesquad-lotus_seed.png'),
	(11,'codesquad','WHITEPEPPER',1290001,18992888822,'Golden Deer Sarawak White Pepper','50gm','pack','32.56','2021-12-31','30002',NULL,NULL,NULL,'codesquad-white_pepper.png'),
	(12,'codesquad','BAKUTEH',1273888,23893899799,'Golden Deer Bakuteh','50gm','pack','6.75','2021-12-31','30002 Preserved Foods',NULL,NULL,NULL,'codesquad-bakuteh.png'),
	(13,'codesquad','TEST',1717010,17172233569003,'Testing','Jin Lu Brand Seng Kee Tang','pack','120.00','2022-01-15','30001 Canned Foodstuff',NULL,NULL,NULL,'codesquad-bakuteh.png'),
	(14,'codesquad','TESTING',12312222,9288773,'Tesing Product','Try product','pkg','9.00','2022-04-02','30002 Preserved Foods',NULL,NULL,NULL,'codesquad-lotus_seed.png');

/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table productTxn
# ------------------------------------------------------------

DROP TABLE IF EXISTS `productTxn`;

CREATE TABLE `productTxn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode` int(11) DEFAULT NULL,
  `productName` int(11) DEFAULT NULL,
  `unit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cost` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unitPrice` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stockLocation` int(11) DEFAULT NULL,
  `txnQty` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnTotal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `txnDate` int(11) DEFAULT NULL,
  `txnParticular` int(11) DEFAULT NULL,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table purchaseInvoice
# ------------------------------------------------------------

DROP TABLE IF EXISTS `purchaseInvoice`;

CREATE TABLE `purchaseInvoice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierID` int(11) DEFAULT NULL,
  `supplierName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceDate` int(11) DEFAULT NULL,
  `productID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode` int(11) DEFAULT NULL,
  `productName` int(11) DEFAULT NULL,
  `productDescription` int(11) DEFAULT NULL,
  `unit` int(11) DEFAULT NULL,
  `purchaseQty` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unitPrice` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discountPercent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unitDiscount` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxID` int(11) DEFAULT NULL,
  `taxRate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemTotal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemTaxTotal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invTaxTotal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table salesInvoice
# ------------------------------------------------------------

DROP TABLE IF EXISTS `salesInvoice`;

CREATE TABLE `salesInvoice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `inv` int(11) DEFAULT NULL,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customerID` int(11) DEFAULT NULL,
  `customerName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceType` int(11) DEFAULT NULL,
  `invoiceNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceDate` int(11) DEFAULT NULL,
  `productID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode` int(11) DEFAULT NULL,
  `productName` int(11) DEFAULT NULL,
  `productDescription` int(11) DEFAULT NULL,
  `unit` int(11) DEFAULT NULL,
  `salesQty` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unitPrice` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discountPercent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unitDiscount` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxID` int(11) DEFAULT NULL,
  `taxRate` int(11) DEFAULT NULL,
  `itemTotal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxItemTotal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invTaxTotal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table sippCustAcct
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sippCustAcct`;

CREATE TABLE `sippCustAcct` (
  `id` int(11) DEFAULT NULL,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acctType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastTxnDate` int(11) DEFAULT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postCode` int(11) DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentTerm` int(11) DEFAULT NULL,
  `creditLimit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `opBalance` int(11) DEFAULT NULL,
  `currentBalance` int(11) DEFAULT NULL,
  `personContact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `handPhone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fax` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `glNo` int(11) DEFAULT NULL,
  `glSub` int(11) DEFAULT NULL,
  `glType` int(11) DEFAULT NULL,
  `companyName` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `sippCustAcct` WRITE;
/*!40000 ALTER TABLE `sippCustAcct` DISABLE KEYS */;

INSERT INTO `sippCustAcct` (`id`, `companyID`, `supplierID`, `supplierName`, `acctType`, `lastTxnDate`, `address1`, `address2`, `postCode`, `city`, `state`, `country`, `email`, `website`, `paymentTerm`, `creditLimit`, `opBalance`, `currentBalance`, `personContact`, `date_created`, `tel1`, `tel2`, `handPhone`, `fax`, `glNo`, `glSub`, `glType`, `companyName`)
VALUES
	(45,'codesquad','CENTRALSOFT','CentralSoft Technolog','CUST',NULL,'111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia','percylim@gmail.com','www.centralsoft.com.my',120,'10000.00',NULL,NULL,'Percy','2022-02-17','+60821238882','','','',5001,101,501,NULL),
	(46,'codesquad','ZHUNION','Zhunion Company','CUST',NULL,'111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia','percylim@gmail.com','www.aaa.com',120,'9998.00',NULL,NULL,'Lim','2022-02-17','+608212388821','+608212388822','+608212388823','082-12388872',5001,110,501,NULL),
	(47,'codesquad','CODESQUAD','Code Squard Technology','SUPP',NULL,'111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia','percylim@gmail.com','www.codesquad.com.my',150,'1234558.00',NULL,NULL,'Warrence','2022-02-20','+60821238882','+60821238882','+60821238882','0823373789883',4300,100,401,NULL),
	(48,'codesquad','TEST','Testing #1','',NULL,'111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia','percylim@gmail.com','',120,'1234558.00',NULL,NULL,'','2022-02-20','+60821238882','+60821238882','+60821238882','08233789890',4005,660,401,NULL),
	(49,'codesquad','TESTING2','Testing2','CUST',NULL,'111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia','percylim@gmail.com','',120,'1234558.00',NULL,NULL,'','2022-02-20','+60821238882','+60821238882','+60821238882','08233789890',4005,550,401,NULL),
	(50,'codesquad','TEST3','Testing #3','CUST',NULL,'111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia','percylim@gmail.com','',120,'1234560.00',NULL,NULL,'','2022-02-20','+60821238882','+60821238882','+60821238882','0823373789883',4005,330,401,NULL),
	(51,'codesquad','TEST4','Testing #4','CUST',NULL,'111, Lorong 123','Jalan Tun Juga',43345,'Kuching','Sarawak','Malaysia','percylim@gmail.com','',120,'10000000.00',NULL,NULL,'','2022-02-20','+60821238882','','','',4005,201,401,NULL);

/*!40000 ALTER TABLE `sippCustAcct` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table socso
# ------------------------------------------------------------

DROP TABLE IF EXISTS `socso`;

CREATE TABLE `socso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `startSalary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `endSalary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyRate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeRate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortSalary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `socso` WRITE;
/*!40000 ALTER TABLE `socso` DISABLE KEYS */;

INSERT INTO `socso` (`id`, `companyID`, `startSalary`, `endSalary`, `companyRate`, `employeeRate`, `remark`, `sortSalary`)
VALUES
	(2,'codesquad','200.01','299.99','4.55','1.25','second','200.01'),
	(3,'codesquad','100.01','199.99','3.75','1.45','First Record','100.01'),
	(4,'codesquad','300.01','400.00','3.60','3.30','testing','300.01');

/*!40000 ALTER TABLE `socso` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table stockLocation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stockLocation`;

CREATE TABLE `stockLocation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `locationID` int(11) DEFAULT NULL,
  `locationName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `locationAddress` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `stockLocation` WRITE;
/*!40000 ALTER TABLE `stockLocation` DISABLE KEYS */;

INSERT INTO `stockLocation` (`id`, `companyID`, `locationID`, `locationName`, `locationAddress`, `date_created`, `remark`)
VALUES
	(1,'codesquad',1111,'Main Store','3478 Jalan Tabuan','2021-12-01','Testing first location'),
	(2,'codesquad',1112,'Sekama Store','123, Jalan Sekama','2021-12-01','Testing'),
	(3,'codesquad',1113,'Stutong Store','2345, jalan Stutong','2021-12-01',''),
	(4,'codesquad',1214,'Padugan Store','3748, jalan Padugan','2021-12-01',''),
	(5,'codesquad',1213,'Grenn Store','2387, Green Road','2021-12-01',''),
	(6,'codesquad',1215,'Tabuan Store','2345, jalan Stutong Tabuan','2021-12-31','');

/*!40000 ALTER TABLE `stockLocation` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table supp
# ------------------------------------------------------------

DROP TABLE IF EXISTS `supp`;

CREATE TABLE `supp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierID` int(11) DEFAULT NULL,
  `supplierName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nric` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateBirth` int(11) DEFAULT NULL,
  `address1` int(11) DEFAULT NULL,
  `address2` int(11) DEFAULT NULL,
  `postCode` int(11) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `country` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `otRate` int(11) DEFAULT NULL,
  `payMethod` int(11) DEFAULT NULL,
  `incomeTaxNo` int(11) DEFAULT NULL,
  `epfNo` int(11) DEFAULT NULL,
  `socsoNo` int(11) DEFAULT NULL,
  `drivingLicenseNo` int(11) DEFAULT NULL,
  `childs` int(11) DEFAULT NULL,
  `employDate` int(11) DEFAULT NULL,
  `telNo` int(11) DEFAULT NULL,
  `hpNo` int(11) DEFAULT NULL,
  `email` int(11) DEFAULT NULL,
  `password` int(11) DEFAULT NULL,
  `maritalStatus` int(11) DEFAULT NULL,
  `race` int(11) DEFAULT NULL,
  `image` int(11) DEFAULT NULL,
  `companyName` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table tax
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tax`;

CREATE TABLE `tax` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxRate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `tax` WRITE;
/*!40000 ALTER TABLE `tax` DISABLE KEYS */;

INSERT INTO `tax` (`id`, `companyID`, `taxID`, `taxDescription`, `taxRate`, `remark`, `date_created`)
VALUES
	(1,'codesquad',' SST','SST Tax','6.00','Government Tax - SST for year 2021 to 2023','2021-11-24'),
	(2,'codesquad','GST','GST Tax','6.00','Government Sales Tax ','2021-11-24');

/*!40000 ALTER TABLE `tax` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
