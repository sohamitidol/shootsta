import { and, count, desc, eq, ilike, like, or, sql } from "drizzle-orm";
import { db } from "../db/index";
import { ambulances } from "../db/schema/schema";
import AppError from "../utils/appError";
import { AddAmbulance, UpdateAmbulance } from "../validators/ambulance";

export async function addAmbulance(ambulance: AddAmbulance) {
  const newAmbulance = await db
    .insert(ambulances)
    .values(ambulance)

    .returning();

  if (!newAmbulance) {
    throw new Error("Error adding ambulance details");
  }

  return {
    status: true,
    message: "Ambulance details added successfully",
    data: newAmbulance,
  };
}

export async function updateAmbulance(id: number, ambulance: UpdateAmbulance) {
  const updatedAmbulance = await db
    .update(ambulances)
    .set({
      ...ambulance,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(and(eq(ambulances.id, id), eq(ambulances.isDeleted, false)))
    .returning();

  if (!updatedAmbulance) {
    throw new AppError("Ambulance not found", 404);
  }

  return {
    status: true,
    message: "Ambulance details updated successfully",
    data: updatedAmbulance,
  };
}

export async function getAmbulances(
  page = 1,
  limit = 10,
  search?: string | number
) {
  const offset = (page - 1) * limit;

  const searchConditions = search
    ? or(
        like(ambulances.title, `%${search}%`),
        like(ambulances.location, `%${search}%`),
        like(ambulances.description, `%${search}%`),
        like(ambulances.contact, `%${search}%`)
      )
    : undefined;

  const ambulanceListPromise = db.query.ambulances.findMany({
    where: and(eq(ambulances.isDeleted, false), searchConditions),
    limit: limit,
    offset: offset,
    orderBy: desc(ambulances.updatedAt),
  });

  const countPromise = db
    .select({ count: count() })
    .from(ambulances)
    .where(and(eq(ambulances.isDeleted, false), searchConditions));

  const [total, ambulanceList] = await Promise.all([
    countPromise,
    ambulanceListPromise,
  ]);

  return {
    status: true,
    message: "Ambulance list fetched successfully",
    page: page,
    total: total[0].count,
    data: ambulanceList,
  };
}

export async function getAmbulanceById(id: number) {
  const ambulance = await db.query.ambulances.findFirst({
    where: and(eq(ambulances.id, id), eq(ambulances.isDeleted, false)),
  });

  if (!ambulance) {
    throw new AppError("Ambulance not found", 404);
  }

  return {
    status: true,
    message: "Ambulance details fetched successfully",
    data: ambulance,
  };
}

export async function softDeleteAmbulance(id: number) {
  const ambulance = await db
    .update(ambulances)
    .set({
      isDeleted: true,
      deletedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(and(eq(ambulances.id, id), eq(ambulances.isDeleted, false)))
    .returning();

  if (ambulance.length <= 0) {
    throw new AppError("Ambulance not found", 404);
  }

  return {
    status: true,
    message: "Ambulance removed successfully",
    data: ambulance,
  };
}
