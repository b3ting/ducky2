-- CreateTable
CREATE TABLE "duckies" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "object_created" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "duckies_pkey" PRIMARY KEY ("id")
);
