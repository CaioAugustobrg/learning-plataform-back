/*
  Warnings:

  - You are about to drop the column `cpf` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `education` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `professionalExperience` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `professionalGoal` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `speciality` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_cpf_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cpf",
DROP COLUMN "education",
DROP COLUMN "professionalExperience",
DROP COLUMN "professionalGoal",
DROP COLUMN "speciality";
