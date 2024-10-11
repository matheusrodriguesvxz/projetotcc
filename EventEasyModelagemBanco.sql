-- SQLBook: Code
create database EventEasy;

use EventEasy;
create table Endereco (
    id integer auto_increment,
    cep varchar(8) ,
    rua varchar(100),
    cidade varchar(45),
    estado char(2),
    complemento varchar(20),
    bairro char(15),
    pais varchar(30),
    primary key (id)
);


create table Eventos (
    id integer auto_increment,
    id_endereco integer,
    data_inicial datetime,
    data_final datetime,
    nome varchar(40),
    tipo varchar(40),
    descricao varchar(100),
    orcamento decimal(10, 2),
    pix varchar(100),
    maiorDeIdade bool default true,
    constraint fk_endereco foreign key (id_endereco) references Endereco (id),
    primary key (id)
);

create table Convidados (
    id integer auto_increment,
    nome varchar(100),
    idade int,
    contato varchar(20),
    sexo char(1),
    constraint sexo_ch check (sexo in ('M', 'F')),
    primary key (id)
);

create table Vaquinha (
    id integer auto_increment,
    meta decimal(10, 2),
    primary key (id)
);


INSERT INTO Endereco (cep, rua, cidade, estado, complemento, bairro, pais)
VALUES
('12345678', 'Rua A', 'Cidade X', 'SP', 'Apartamento 101', 'Bairro 1', 'Brasil'),
('23456789', 'Rua B', 'Cidade Y', 'RJ', 'Casa 5', 'Bairro 2', 'Brasil'),
('34567890', 'Rua C', 'Cidade Z', 'MG', 'Bloco 3', 'Bairro 3', 'Brasil'),
('45678901', 'Rua D', 'Cidade W', 'BA', 'Sala 10', 'Bairro 4', 'Brasil'),
('56789012', 'Rua E', 'Cidade V', 'RS', 'Quadra 2', 'Bairro 5', 'Brasil');

