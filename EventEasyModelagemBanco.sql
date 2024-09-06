create database eventeasy;
use eventeasy;

create table Eventos (
id_Eventos integer auto_increment not null,
data_inicial datetime not null,
data_final datetime null,
nome varchar(40) not null,
tipo varchar(40) not null,
descricao varchar(100) not null,
orcamento decimal(10,2) null,
pix varchar(40) null,
maiorDeIdade bool null
);

create table Endereço(
id_Endereço integer auto_increment not null,
cep varchar(8) not null,
rua varchar(100) not null,
cidade varchar(45) not null,
estado char(2) not null,
complemento varchar(20) not null,
numero int not null,
pais varchar(30) not null
);

create table Convidados(
id_Convidados integer auto_increment not null,
nome varchar(100) not null, 
idade int not null,
contato varchar(20),
sexo char(1),
constraint sexo_ch check ('M' 'F') 
);
create table Vaquinha(
id_Vaquinha integer auto_increment not null,
meta decimal(10,2)
);

