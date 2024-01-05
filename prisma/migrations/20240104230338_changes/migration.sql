/*
  Warnings:

  - You are about to drop the column `userProfessorId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `yampiProductId` on the `Course` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `UserProfessorCourse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userProfessorId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "userProfessorId",
DROP COLUMN "yampiProductId";

-- AlterTable
ALTER TABLE "UserProfessorCourse" ADD COLUMN     "courseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserProfessorCourse" ADD CONSTRAINT "UserProfessorCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
