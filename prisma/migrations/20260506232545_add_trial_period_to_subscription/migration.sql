-- AlterTable: agrega trialEndsAt con default temporal para filas existentes
ALTER TABLE `subscription`
  ADD COLUMN `trialEndsAt` DATETIME(3) NOT NULL DEFAULT (NOW() + INTERVAL 30 DAY),
  MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'TRIAL';

-- Actualiza filas existentes: trial = createdAt + 30 días y status = TRIAL
UPDATE `subscription` SET
  `trialEndsAt` = DATE_ADD(`createdAt`, INTERVAL 30 DAY),
  `status` = 'TRIAL'
WHERE `status` != 'ACTIVE';

-- Elimina el DEFAULT del campo para que sea obligatorio en inserts futuros
ALTER TABLE `subscription` ALTER COLUMN `trialEndsAt` DROP DEFAULT;
