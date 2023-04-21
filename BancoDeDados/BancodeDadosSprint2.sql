create database lightTech;
use lightTech;

create table empresa (
idEmpresa int primary key auto_increment,
razaoSocial varchar(100),
dataCadastro date,
cnpj char(14),
fkSede int, constraint fkSedeEmpresa foreign key (fkSede) references empresa (idEmpresa)
);

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(70),
sobrenome varchar(70),
cpf char(11),
dtNascimento date,
genero char(2), constraint chkGenero check (genero in ('M', 'F', 'ND')), 
email varchar(70), constraint chkEmail check (email like '%@%'),
senha varchar(30),
dtCadastro datetime default current_timestamp,
fkEmpresa int, constraint fkEmpresaUsuario foreign key (fkEmpresa) references empresa (idEmpresa));

create table metrica (
idMetrica int primary key auto_increment,
nome varchar(45));

create table parametro (
idParametro int primary key auto_increment,
minimo decimal(10,2),
maximo decimal(10,2),
fkMetrica int, constraint fkMetricaParametro foreign key (fkMetrica) references metrica (idMetrica));

create table localEmpresa (
idLocal int primary key auto_increment,
localEmpresa varchar(50),
andar varchar(45),
numero varchar(45),
fkEmpresa int, constraint fkEmpresaLocal foreign key (fkEmpresa) references empresa (idEmpresa),
fkParametro int, constraint fkParametroLocal foreign key (fkParametro) references parametro (idParametro)
);

create table sensor (
idSensor int auto_increment,
tipoSensor varchar(50),
statusSensor varchar(50), constraint chkStatus check (statusSensor in ('Ativo', 'Inativo')),
fkLocal int, constraint fkLocalSensor foreign key (fkLocal) references localEmpresa (idLocal),
fkMetrica int, constraint fkMetricaSensor foreign key (fkMetrica) references metrica (idMetrica),
constraint pkSensor primary key (idSensor, fkMetrica)
);

create table leitura (
idLeitura int primary key auto_increment,
dataHora datetime default current_timestamp,
leitura decimal(10,2),
fkSensor int, constraint fkSensorLeitura foreign key (fkSensor) references sensor (idSensor)
);

select * from usuario;
select * from empresa;
select * from metrica;
select * from parametro;
select * from localEmpresa;
select * from empresa;

insert empresa values 
(null,'Brandão Contabilidade LTDA', null, 71563224000150, null),
(null,'Hessel Store LTDA', null, 93120918000155, null);

insert empresa values
(null,'Brandão Contabilidade - Tatuapé', null, 71563224000150, 1),
(null,'Brandão Contabilidade - Santana', null, 71563224000150, 1),
(null,'Hessel Store - Paulista', null, 93120918000155, 2),
(null,'Hessel Store - Sé', null, 93120918000155, 2);

insert usuario values
(null, 'Leonardo', 'Barreto', 52267781879, '2003-10-04', 'M', 'leonardo.barreto@brcontabil.com', 'leo3040', null, 1),
(null, 'Diego', 'Hessel Mota', '45590987689', '2002-01-09', 'M', 'diego.hessel@hesselstore.com', 'di3040', null, 2),
(null, 'Sthefany', 'Bertolon', '45590987687', '2002-08-02', 'F', 'sthe.bertolon@brcontabil.com', 'sthe9090', null, 3),
(null, 'João', 'Brandão', '45590987655', '2003-01-16', 'M', 'joao.brandao@brcontabil.com', 'joao3030', null, 4),
(null, 'Jordana', 'Santos', '45590987094', '2000-01-27', 'F', 'jordana.santos@hesselstore.com', 'jordana3040', null, 5),
(null, 'Thais', 'Moitinho', '45590987090', '2003-06-20', 'f', 'thais.moitinho@hesselstore.com', 'tha3030', null, 6);

insert localEmpresa values
(null, 'sala de reunião', 6, 'sala 2', 1, null),
(null, 'escritorio', 'terreo', 'sala 1', 2, null),
(null, 'sala de desenvolvimento', 7, 'sala 8', 3, null),
(null, 'sala de reunião', 2, 'sala 3', 4, null),
(null, 'estoque', 2, 'sala 1', 5, null),
(null, 'estoque', 3, 'sala 1', 6, null);

insert into metrica values 
(null, 'Lux'),
(null, 'Lumen'),
(null, 'Watts');

insert into parametro values 
(null, '500', '1000', 1),
(null, '200', '500', 1),
(null, '1000', '2000', 1),
(null, '5000', '10000', 1),
(null, '10000', '20000', 1),
(null, '16', '31', 2),
(null, '31', '63', 2),
(null, '1.6', '3.1', 3),
(null, '3.1', '6.2', 3);

insert into sensor values 
(null, 'LDR 5mm', 'Ativo', 3, 1),
(null, 'LDR', 'Ativo', 3, 1),
(null, 'LDR', 'Ativo', 2, 1),
(null, 'LDR', 'Ativo', 2, 1),
(null, 'BH1750FVI Lux', 'Ativo', 1, 1),
(null, 'X134 Watts', 'Inativo', 1, 3);

insert into leitura values
(null, null, 700, 1),
(null, null, 750, 1),
(null, null, 700, 2),
(null, null, 750, 2),
(null, null, 900, 3),
(null, null, 1000, 3),
(null, null, 900, 4),
(null, null, 1000, 4),
(null, null, 500, 5),
(null, null, 550, 5),
(null, null, 1.6, 6);

select * from empresa as filial 
join empresa as sede on filial.fkSede = sede.idEmpresa;

select * from empresa as filial 
join empresa as sede on filial.fkSede = sede.idEmpresa
join localEmpresa on filial.idEmpresa = fkEmpresa
join sensor on idLocal = fkLocal;

select razaoSocial as 'Nome da Empresa',
localEmpresa as 'Locais da Sede',
tipoSensor as 'Sensores',
statusSensor as 'Status do Sensor' 
from empresa join localEmpresa on idEmpresa = fkEmpresa
join sensor on idLocal = fkLocal;

select idSensor as 'ID do Sensor',
tipoSensor as 'Tipo do Sensor',
statusSensor as 'Status do Sensor',
metrica.nome as 'Métrica do Sensor',
localEmpresa.localEmpresa as 'Local do Sensor' from sensor
join metrica on fkMetrica = idMetrica
join localEmpresa on fkLocal = idLocal;

