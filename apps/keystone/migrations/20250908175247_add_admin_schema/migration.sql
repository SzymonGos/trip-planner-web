-- CreateTable
CREATE TABLE "Admin" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL DEFAULT '',
  "password" TEXT NOT NULL,
  CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_name_key" ON "Admin" ("name");
