-- CreateTable
CREATE TABLE `local` (
    `local_id` BIGINT NOT NULL AUTO_INCREMENT,
    `local_name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`local_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `store_id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `category` VARCHAR(10) NOT NULL,
    `start_time` VARCHAR(25) NOT NULL,
    `end_time` VARCHAR(25) NOT NULL,
    `rating` DOUBLE NOT NULL DEFAULT 0.0,
    `local_id` BIGINT NOT NULL,

    INDEX `idx_store_name`(`name`),
    PRIMARY KEY (`store_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `review_id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(225) NOT NULL,
    `img` VARCHAR(100) NULL,
    `count_star` VARCHAR(1) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL,
    `store_id` BIGINT NOT NULL,

    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `mission_id` BIGINT NOT NULL AUTO_INCREMENT,
    `detail` VARCHAR(225) NOT NULL,
    `point` BIGINT NOT NULL,
    `store_id` BIGINT NOT NULL,

    PRIMARY KEY (`mission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission_state` (
    `state_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `mission_id` BIGINT NOT NULL,
    `state` VARCHAR(10) NOT NULL DEFAULT '도전중',

    PRIMARY KEY (`state_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_local_id_fkey` FOREIGN KEY (`local_id`) REFERENCES `local`(`local_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission_state` ADD CONSTRAINT `mission_state_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission_state` ADD CONSTRAINT `mission_state_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`mission_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
