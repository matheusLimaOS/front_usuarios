GO
CREATE TABLE `password_tokens` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(200) NOT NULL DEFAULT '0',
  `user_id` int unsigned NOT NULL,
  `used` tinyint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
GO
CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) NOT NULL,
  `tamanho` double NOT NULL,
  `quantidade` int NOT NULL,
  `valor` double NOT NULL,
  `horario` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

GO
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT '0',
  `email` varchar(150) NOT NULL DEFAULT '0',
  `password` varchar(200) NOT NULL DEFAULT '0',
  `role` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
)
CREATE TABLE `aula_node`.`carrinho` (
  `ID_carrinho` INT NOT NULL AUTO_INCREMENT,
  `ID_produto` INT NOT NULL,
  `descricao` VARCHAR(45) NOT NULL,
  `valorprod` DOUBLE NOT NULL,
  `quantprod` INT NOT NULL,
  `usuario` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID_carrinho`));


