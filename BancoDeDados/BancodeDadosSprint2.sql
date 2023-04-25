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

create table parametro (
idParametro int primary key auto_increment,
minimo decimal(10,2),
maximo decimal(10,2)
);

create table localEmpresa (
idLocal int primary key auto_increment,
localEmpresa varchar(50),
andar varchar(45),
numero varchar(45),
fkEmpresa int, constraint fkEmpresaLocal foreign key (fkEmpresa) references empresa (idEmpresa),
fkParametro int, constraint fkParametroLocal foreign key (fkParametro) references parametro (idParametro)
);

create table sensor (
idSensor int primary key auto_increment,
tipoSensor varchar(50),
statusSensor varchar(50), constraint chkStatus check (statusSensor in ('Ativo', 'Inativo')),
fkLocal int, constraint fkLocalSensor foreign key (fkLocal) references localEmpresa(idLocal)
);

create table leitura (
idLeitura int primary key auto_increment,
dataHora datetime default current_timestamp,
leitura decimal(10,2),
fkSensor int, constraint fkSensorLeitura foreign key (fkSensor) references sensor (idSensor)
);

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

insert into parametro values 
(null, '500', '1000'),
(null, '200', '500'),
(null, '1000', '2000'),
(null, '5000', '10000'),
(null, '10000', '20000');

insert localEmpresa values
(null, 'sala de reunião', '6', '2', 1, 1),
(null, 'escritorio', 'terreo', 'sala 1', 2, 1),
(null, 'sala de desenvolvimento', 7, 'sala 8', 3, 2),
(null, 'sala de reunião', 2, 'sala 3', 4, 2),
(null, 'estoque', 2, 'sala 1', 5, 3),
(null, 'estoque', 3, 'sala 1', 6, 4);

insert into sensor values 
(null, 'LDR 5mm', 'Ativo', 3),
(null, 'LDR', 'Ativo', 3),
(null, 'LDR', 'Ativo', 2),
(null, 'LDR', 'Ativo', 2),
(null, 'BH1750FVI Lux', 'Ativo', 1);

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
(null, null, 550, 1);

select * from usuario;
select * from empresa;
select * from parametro;
select * from localEmpresa;
select * from leitura;

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
localEmpresa.localEmpresa as 'Local do Sensor' from sensor
join localEmpresa on fkLocal = idLocal;

truncate table leitura;