-- ============================================================
-- TRIATLÓN SUCRE SIN LÍMITES 2.0
-- Base de datos MySQL — Schema completo (Hardened)
-- Sucre, Santander, Colombia — 18 de julio de 2026
-- ============================================================

-- (Base de datos manejada por la variable DB_NAME en .env)

-- ============================================================
-- TABLA: participantes
-- ============================================================
CREATE TABLE IF NOT EXISTS participantes (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  nombre           VARCHAR(100)  NOT NULL,
  edad             INT           NOT NULL CHECK (edad >= 5 AND edad <= 100),
  ciudad           VARCHAR(100)  NOT NULL,
  telefono         VARCHAR(25)   NOT NULL,
  correo           VARCHAR(150)  NOT NULL,
  disciplina       VARCHAR(50)   NOT NULL,
  categoria        VARCHAR(50)   NOT NULL,
  participo_primera_edicion ENUM('SI', 'NO') NOT NULL DEFAULT 'NO',
  tipo_participante ENUM(
    'individual',
    'relevo_natacion',
    'relevo_ciclismo',
    'relevo_running'
  ) NOT NULL DEFAULT 'individual',
  precio_aplicado  DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  activo           TINYINT(1)    NOT NULL DEFAULT 1,
  fecha_inscripcion TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE INDEX idx_correo_activo (correo, activo),
  INDEX idx_correo (correo),
  INDEX idx_fecha (fecha_inscripcion),
  INDEX idx_disciplina (disciplina),
  INDEX idx_activo (activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: patrocinadores
-- ============================================================
CREATE TABLE IF NOT EXISTS patrocinadores (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(150) NOT NULL,
  tipo       ENUM('alcaldia', 'empresa', 'persona') NOT NULL,
  logo_url   VARCHAR(500) DEFAULT NULL,
  sitio_web  VARCHAR(300) DEFAULT NULL,
  activo     TINYINT(1)   NOT NULL DEFAULT 1,
  creado_en  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_tipo (tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: admins
-- ============================================================
CREATE TABLE IF NOT EXISTS admins (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  usuario       VARCHAR(50)  NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  nombre        VARCHAR(100) DEFAULT NULL,
  activo        TINYINT(1)   NOT NULL DEFAULT 1,
  creado_en     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DATOS INICIALES — Patrocinadores de ejemplo (VACIADO)
-- ============================================================
-- Actualmente no hay patrocinadores.

-- ============================================================
-- ADMIN POR DEFECTO
-- usuario: admin
-- password: CIELITo12909
-- (hash generado con bcrypt rounds=10)
-- IMPORTANTE: Cambiar la contraseña después del primer login
-- ============================================================
INSERT INTO admins (usuario, password_hash, nombre) VALUES
  ('admin', '$2a$10$61OT/u2IKbXni2Trbi1DO.79lxL3w1HjFiELlRmflrqWJUG9TC0WK', 'Administrador')
ON DUPLICATE KEY UPDATE password_hash = '$2a$10$61OT/u2IKbXni2Trbi1DO.79lxL3w1HjFiELlRmflrqWJUG9TC0WK';

-- ============================================================
-- TABLA: reservas_camisetas
-- ============================================================
CREATE TABLE IF NOT EXISTS reservas_camisetas (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  modelo         VARCHAR(100) NOT NULL,
  nombre         VARCHAR(150) NOT NULL,
  correo         VARCHAR(150) NOT NULL,
  celular        VARCHAR(25)  NOT NULL,
  talla          VARCHAR(10)  NOT NULL,
  cantidad       INT          NOT NULL,
  fecha_reserva  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_correo (correo),
  INDEX idx_fecha (fecha_reserva)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
