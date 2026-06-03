-- CreateEnum
CREATE TYPE "TripStatusType" AS ENUM ('planning', 'completed');

-- CreateTable
CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "clerkId" TEXT NOT NULL DEFAULT '',
  "username" TEXT NOT NULL DEFAULT '',
  "email" TEXT NOT NULL DEFAULT '',
  "profileImage" JSONB,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL DEFAULT '',
  "description" TEXT NOT NULL DEFAULT '',
  "origin" TEXT NOT NULL DEFAULT '',
  "destination" TEXT NOT NULL DEFAULT '',
  "creator" TEXT,
  "status" "TripStatusType" NOT NULL DEFAULT 'planning',
  "distance" TEXT NOT NULL DEFAULT '',
  "estimatedDuration" TEXT NOT NULL DEFAULT '',
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripImage" (
  "id" TEXT NOT NULL,
  "image" JSONB,
  "trip" TEXT,
  CONSTRAINT "TripImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User" ("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User" ("username");

-- CreateIndex
CREATE INDEX "Trip_creator_idx" ON "Trip" ("creator");

-- CreateIndex
CREATE INDEX "TripImage_trip_idx" ON "TripImage" ("trip");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_creator_fkey" FOREIGN KEY ("creator") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripImage" ADD CONSTRAINT "TripImage_trip_fkey" FOREIGN KEY ("trip") REFERENCES "Trip" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
