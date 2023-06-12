create database lightTech;
use lightTech;

create table endereco (
idEndereco int primary key auto_increment,
cep char(14),
rua varchar(45),
num varchar(45)
);

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
cpf varchar(45),
dtNascimento date,
telCel varchar(45),
genero varchar(45), 
email varchar(70), constraint chkEmail check (email like '%@%'),
senha varchar(30),
dtCadastro datetime default current_timestamp,
fkEmpresa int, constraint fkEmpresaUsuario foreign key (fkEmpresa) references empresa (idEmpresa),
fkAdmin int, constraint fkAdminUsuario foreign key (fkAdmin) references usuario (idUsuario)
);

create table parametro (
idParametro int primary key auto_increment,
minimo decimal(10,2),
maximo decimal(10,2)
);

create table localEmpresa (
idLocalEmpresa int primary key auto_increment,
localEmpresa varchar(50),
andar varchar(45),
numero varchar(45),
fkEmpresa int, constraint fkEmpresaLocal foreign key (fkEmpresa) references empresa (idEmpresa),
fkEndereco int, constraint fkEnderecoLocal foreign key (fkEndereco) references endereco (idEndereco),
fkParametro int, constraint fkParametroLocal foreign key (fkParametro) references parametro (idParametro)
);

create table sensor (
idSensor int primary key auto_increment,
tipoSensor varchar(50),
statusSensor varchar(50), constraint chkStatus check (statusSensor in ('Ativo', 'Inativo')),
fkLocalEmpresa int, constraint fkLocalEmpresaSensor foreign key (fkLocalEmpresa) references localEmpresa(idLocalEmpresa)
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
(null, 'Leonardo', 'Barreto', 52267781879, '2003-10-04', '11 93849-4834', 'M', 'leonardo.barreto@brcontabil.com', 'leo3040', null, 1, null),
(null, 'Diego', 'Hessel Mota', '45590987689', '2002-01-09', '11 68457-7367', 'M', 'diego.hessel@hesselstore.com', 'di3040', null, 2, null),
(null, 'Sthefany', 'Bertolon', '45590987687', '2002-08-02', '11 94358-8457', 'F', 'sthe.bertolon@brcontabil.com', 'sthe9090', null, 3, 1),
(null, 'João', 'Brandão', '45590987655', '2003-01-16', '11 93576-8435', 'M', 'joao.brandao@brcontabil.com', 'joao3030', null, 4, 1),
(null, 'Jordana', 'Santos', '45590987094', '2000-01-27', '11 93682-2357', 'F', 'jordana.santos@hesselstore.com', 'jordana3040', null, 5, 2),
(null, 'Thais', 'Moitinho', '45590987090', '2003-06-20', '11 92457-2357', 'F', 'thais.moitinho@hesselstore.com', 'tha3030', null, 6, 2);

insert into parametro values 
(null, '500', '1000'),
(null, '200', '500'),
(null, '1000', '2000'),
(null, '5000', '10000'),
(null, '10000', '20000');

insert into endereco values 
(null, 01234567891012, 'Rua Haddock Lobo', 1192),
(null, 09243875293848, 'Rua Sergio Faro', 1233),
(null, 95987439848753, 'Rua Haddock Lobo', 5137),
(null, 33337473837577, 'Rua Haddock Lobo', 500);

insert localEmpresa values
(null, 'sala de reunião', '6', '2', 1, 1, 1),
(null, 'sala 3', '3', '3', 1, 1, 1),
(null, 'Escritorio', '3', '3', 1, 1, 1);

insert into sensor values 
(null, 'LDR 5mm', 'Ativo', 1),
(null, 'LDR 5mm', 'Ativo', 2),
(null, 'LDR 5mm', 'Ativo', 3);


insert into leitura values
(null, null, 700, 5),
(null, null, 750, 5),
(null, null, 700, 5),
(null, null, 750, 5),
(null, null, 900, 6),
(null, null, 1000, 6),
(null, null, 900, 6),
(null, null, 1000, 6),
(null, null, 500, 6),
(null, null, 550, 6),
(null, null, 550, 11),
(null, null, 550, 11),
(null, null, 550, 11),
(null, null, 550, 11),
(null, null, 550, 11),
(null, null, 550, 12),
(null, null, 550, 12),
(null, null, 550, 12),
(null, null, 550, 12),
(null, null, 550, 13),
(null, null, 550, 13),
(null, null, 550, 13),
(null, null, 550, 13);

select * from usuario;
select * from empresa;
select * from parametro;
select * from localEmpresa;
select * from leitura;
select * from sensor;

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
join sensor on idLocalEmpresa = fkLocalEmpresa;

select idSensor as 'ID do Sensor',
tipoSensor as 'Tipo do Sensor',
statusSensor as 'Status do Sensor',
localEmpresa.localEmpresa as 'Local do Sensor' from sensor
join localEmpresa on fkLocalEmpresa = idLocalEmpresa;

INSERT INTO sensor VALUES
	(null, 'LDR 5', 'Ativo', null),
    (null, 'LDR 5', 'Ativo', null);

INSERT INTO leitura (leitura, fkSensor) VALUES 
	(1002,5),
    (222,5),
    (777,5),
    (510,5),
    (745,5),
    (755,5),
    (456,5);
    
SELECT * FROM leitura;
SELECT leitura, dataHora FROM leitura WHERE fkSensor = 1;
SELECT leitura, fkSensor, DATE_FORMAT(dataHora,'%d/%c/%Y %H:%i:%s') FROM leitura WHERE fkSensor = 6 ORDER BY idLeitura DESC limit 1;

select * from localEmpresa where fkEmpresa = 1;

select localEmpresa, round(avg(leitura)), dataHora  from leitura join
sensor on fkSensor = idSensor join
localEmpresa on fkLocalEmpresa = idLocalEmpresa join
empresa on fkEmpresa = idEmpresa  
group by localEmpresa, dataHora;


select localEmpresa, round(avg(leitura)), hour(dataHora)  from leitura join
sensor on fkSensor = idSensor join
localEmpresa on fkLocalEmpresa = idLocalEmpresa join
empresa on fkEmpresa = idEmpresa where 
day(dataHora) = day(current_timestamp())
group by localEmpresa, dataHora;


select localEmpresa, round(avg(leitura)) from leitura join
sensor on fkSensor = idSensor join
localEmpresa on fkLocalEmpresa = idLocalEmpresa join
empresa on fkEmpresa = idEmpresa where idEmpresa = 1
-- and hour(dataHora) = hour(current_timestamp())
group by localEmpresa;


select localEmpresa, round(avg(leitura)) from leitura join
sensor on fkSensor = idSensor join
localEmpresa on fkLocalEmpresa = idLocalEmpresa join
empresa on fkEmpresa = idEmpresa where idEmpresa = 1
and day(dataHora) = day(current_timestamp())
group by localEmpresa;

select * from localEmpresa;

select * from leitura
where day(dataHora) = day(current_timestamp());



