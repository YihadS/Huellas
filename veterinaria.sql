-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 30-08-2023 a las 15:54:09
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veterinaria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora`
--

CREATE TABLE `bitacora` (
  `idBitacora` int NOT NULL,
  `fecha` datetime NOT NULL,
  `usuario` varchar(150) NOT NULL,
  `accion` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `bitacora`
--

INSERT INTO `bitacora` (`idBitacora`, `fecha`, `usuario`, `accion`) VALUES
(1, '2023-08-28 11:17:10', 'sss', 'Se registró una cita al usuario al ciente10'),
(2, '2023-08-28 12:00:38', 'yihad', 'Se registró una cita al usuario al cliente 10'),
(3, '2023-08-28 14:56:42', 'yihad', 'Se registró al cliente Juan Marquez'),
(4, '2023-08-28 15:04:43', 'yihad', 'Se registró al doctor Jobito Dorado'),
(5, '2023-08-28 15:18:31', 'yihad', 'Se registró la mascota Angelica de raza Pequines'),
(6, '2023-08-28 15:39:10', 'yihad', 'Se eliminó la cita 9'),
(7, '2023-08-28 15:39:18', 'yihad', 'Se eliminó la cita 8'),
(8, '2023-08-28 15:42:16', 'yihad', 'Se registró al cliente Prueba Prueba2'),
(9, '2023-08-28 15:43:31', 'yihad', 'Se registró al cliente rr3 ggett'),
(10, '2023-08-28 15:43:38', 'yihad', 'Se eliminó al ciente rr3 ggett'),
(11, '2023-08-28 15:57:11', 'yihad', 'Se registró al doctor wqewqe wqewqe'),
(12, '2023-08-28 15:57:18', 'yihad', 'Se eliminó al doctor con ID wqewqe wqewqe'),
(13, '2023-08-28 16:12:27', 'yihad', 'Se la habitación: ewqewqe'),
(14, '2023-08-28 16:12:37', 'yihad', 'Se eliminó la habitación: ewqewqe'),
(15, '2023-08-28 16:30:45', 'yihad', 'Se eliminó la mascota Angelica'),
(16, '2023-08-29 00:46:03', 'yihad', 'Se registró una cita al usuario al cliente 10'),
(17, '2023-08-29 00:49:22', 'yihad', 'Se eliminó la cita 10'),
(18, '2023-08-29 20:07:16', 'yihad', 'Se registró una cita al usuario al cliente 1'),
(19, '2023-08-29 21:54:17', 'mario', 'Se registró el Usuario: milka'),
(20, '2023-08-29 22:13:26', 'yihad', 'Se eliminó al usuario: milka'),
(21, '2023-08-29 22:48:55', 'yihad', 'Se registró el Usuario: martha');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `idCita` int NOT NULL,
  `fecha` datetime NOT NULL,
  `idCliente` int NOT NULL,
  `idMascota` int NOT NULL,
  `idDoctor` int NOT NULL,
  `idHabitacion` int NOT NULL,
  `motivo` varchar(250) NOT NULL,
  `costo` int NOT NULL,
  `estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`idCita`, `fecha`, `idCliente`, `idMascota`, `idDoctor`, `idHabitacion`, `motivo`, `costo`, `estado`) VALUES
(2, '2023-08-27 10:31:00', 10, 5, 2, 2, 'El conejo tiene una infección en la gargantaas.', 280, 'Finalizada'),
(3, '2023-08-28 09:13:00', 11, 4, 3, 2, 'Se le está cayendo el pelo y necesita atención estética.', 300, 'En proceso'),
(4, '2023-08-10 10:19:00', 10, 6, 2, 3, 'Necesita que le quiten una garrapata.', 100, 'En proceso'),
(5, '2023-08-24 11:25:00', 11, 4, 3, 2, 'Necesita que le rebajen su pelaje.', 250, 'En proceso'),
(6, '2023-07-31 12:36:00', 12, 5, 2, 2, 'Necesita que le saquen las orejas.', 350, 'En proceso'),
(7, '2023-08-20 10:00:00', 10, 6, 3, 2, 'Necesita que le saquen las orejas.', 300, 'En proceso'),
(11, '2023-08-12 19:10:00', 1, 4, 2, 3, 'fsaqwer', 522, 'En proceso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idCliente` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(150) NOT NULL,
  `telefono` int NOT NULL,
  `carnet` int NOT NULL,
  `nacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCliente`, `nombre`, `apellidos`, `telefono`, `carnet`, `nacimiento`) VALUES
(1, 'Yihad', 'Salek', 62005195, 14132420, '2002-07-09'),
(10, 'Edward', 'Viruez', 78930229, 92749303, '1997-10-24'),
(11, 'Antonio de Jesus', 'Peredo', 78942212, 54356621, '1998-12-25'),
(12, 'Dabbya', 'Jaimes', 67490393, 94213464, '1999-06-16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctor`
--

CREATE TABLE `doctor` (
  `idDoctor` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(150) NOT NULL,
  `carnet` int NOT NULL,
  `especialidad` varchar(150) NOT NULL,
  `telefono` int NOT NULL,
  `nacimiento` date NOT NULL,
  `sueldo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `doctor`
--

INSERT INTO `doctor` (`idDoctor`, `nombre`, `apellidos`, `carnet`, `especialidad`, `telefono`, `nacimiento`, `sueldo`) VALUES
(2, 'Marcos', 'Lopez', 83316803, 'Cirujano', 74534244, '1996-08-07', 3200),
(3, 'Martin', 'Suarez Docker', 20502232, 'Peluquero', 60429221, '1986-01-29', 2690),
(4, 'Jobito', 'Dorado', 64143213, 'Traumatólogo', 734211357, '2023-08-16', 5000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

CREATE TABLE `habitacion` (
  `idHabitacion` int NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `costo` int NOT NULL,
  `capacidad` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `habitacion`
--

INSERT INTO `habitacion` (`idHabitacion`, `nombre`, `costo`, `capacidad`) VALUES
(2, 'Sala de Peluqueria', 100, 5),
(3, 'Sala de Cirugía General', 500, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascota`
--

CREATE TABLE `mascota` (
  `idMascota` int NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `raza` varchar(255) NOT NULL,
  `edad` int NOT NULL,
  `sexo` varchar(100) NOT NULL,
  `conducta` varchar(100) NOT NULL,
  `cliente` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mascota`
--

INSERT INTO `mascota` (`idMascota`, `tipo`, `nombre`, `raza`, `edad`, `sexo`, `conducta`, `cliente`) VALUES
(4, 'Gato', 'Menfis', 'Angora', 13, 'Macho', 'Pasiva', 'Yihad Salek'),
(5, 'Conejo', 'Bugs', 'Enano', 3, 'Macho', 'Agresiva', 'Edward Viruez'),
(6, 'Perro', 'Capitan', 'Pastor Alemán', 2, 'Macho', 'Agresiva', 'Antonio de Jesus Peredo'),
(7, 'Hamster', 'Stuart', '2', 1, 'Macho', 'Sumisa', 'Dabbya Jaimes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL,
  `username` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `rol` varchar(100) NOT NULL,
  `ultimo_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `username`, `contrasena`, `rol`, `ultimo_login`) VALUES
(2, 'yihad', '123', 'Administrador', '2023-08-19 19:40:00'),
(3, 'mario', '123', 'Administrador', '2023-08-29 21:15:12'),
(5, 'martha', '123', 'Empleado', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  ADD PRIMARY KEY (`idBitacora`);

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`idCita`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCliente`);

--
-- Indices de la tabla `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`idDoctor`);

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`idHabitacion`);

--
-- Indices de la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD PRIMARY KEY (`idMascota`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  MODIFY `idBitacora` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `idCita` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCliente` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `doctor`
--
ALTER TABLE `doctor`
  MODIFY `idDoctor` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  MODIFY `idHabitacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `mascota`
--
ALTER TABLE `mascota`
  MODIFY `idMascota` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
