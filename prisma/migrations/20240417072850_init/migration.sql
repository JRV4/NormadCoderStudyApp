-- CreateTable
CREATE TABLE "authors" (
    "appId" TEXT NOT NULL,
    "appName" TEXT NOT NULL,
    "top" TEXT,
    "left" TEXT,
    "width" TEXT,
    "height" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("appId")
);
