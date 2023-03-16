-- CreateTable
CREATE TABLE "Text" (
    "id" SERIAL NOT NULL,
    "sharing_code" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "expiry_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("id")
);
