/*
  Warnings:

  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "MeetingStatus" AS ENUM ('NOT_STARTED', 'STARTED', 'ENDED');

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey",
ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "meetingStatus" "MeetingStatus" NOT NULL DEFAULT 'NOT_STARTED',
ADD COLUMN     "roomPassword" TEXT,
ADD COLUMN     "startedAt" TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Room_id_seq";
