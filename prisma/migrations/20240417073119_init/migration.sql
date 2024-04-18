/*
  Warnings:

  - You are about to drop the `authors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "authors";

-- CreateTable
CREATE TABLE "APP_RUN_INFO" (
    "appId" TEXT NOT NULL,
    "appName" TEXT NOT NULL,
    "top" TEXT,
    "left" TEXT,
    "width" TEXT,
    "height" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "APP_RUN_INFO_pkey" PRIMARY KEY ("appId")
);
