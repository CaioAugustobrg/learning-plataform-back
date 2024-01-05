-- CreateEnum
CREATE TYPE "CourseMode" AS ENUM ('ONLINE', 'INPERSON');

-- CreateEnum
CREATE TYPE "ClassFormat" AS ENUM ('TEXT', 'VIDEO');

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userProfessorId" TEXT NOT NULL,
    "type" "CourseMode",
    "summary" TEXT,
    "time" INTEGER,
    "price" DOUBLE PRECISION,
    "currentlyYear" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courseCategorie" TEXT,
    "yampiProductId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseClass" (
    "id" TEXT NOT NULL,
    "numberClass" SERIAL NOT NULL,
    "courseId" TEXT NOT NULL,
    "free" BOOLEAN NOT NULL,
    "format" "ClassFormat",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfessorCourse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProfessorCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStudentCourse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserStudentCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassFormatText" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bodyText" TEXT NOT NULL,
    "free" BOOLEAN NOT NULL,
    "numberClass" INTEGER NOT NULL,
    "courseClassId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassFormatText_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userProfessorId_fkey" FOREIGN KEY ("userProfessorId") REFERENCES "UserProfessorCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseClass" ADD CONSTRAINT "CourseClass_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfessorCourse" ADD CONSTRAINT "UserProfessorCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStudentCourse" ADD CONSTRAINT "UserStudentCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStudentCourse" ADD CONSTRAINT "UserStudentCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassFormatText" ADD CONSTRAINT "ClassFormatText_courseClassId_fkey" FOREIGN KEY ("courseClassId") REFERENCES "CourseClass"("id") ON DELETE SET NULL ON UPDATE CASCADE;
