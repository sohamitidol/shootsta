import { Request, Response } from "express";
import { z } from "zod";
import * as ambulanceService from "../services/ambulance";
import { addAmbulanceValidator } from "../validators/ambulance";
import { queryValidator } from "../validators/common";

export async function addAmbulance(req: Request, res: Response) {
  const body = addAmbulanceValidator.parse(req.body);
  const response = await ambulanceService.addAmbulance(body);

  res.status(201).json(response);
}

export async function updateAmbulance(req: Request, res: Response) {
  const id = z.coerce.number().parse(req.params.id);
  const body = addAmbulanceValidator.parse(req.body);

  const response = await ambulanceService.updateAmbulance(id, body);

  res.status(200).json(response);
}

export async function getAmbulances(req: Request, res: Response) {
  const { page, limit, search } = queryValidator.parse(req.query);
  const response = await ambulanceService.getAmbulances(page, limit, search);

  res.status(200).json(response);
}

export async function getAmbulanceById(req: Request, res: Response) {
  const id = z.coerce.number().parse(req.params.id);
  const response = await ambulanceService.getAmbulanceById(id);

  res.status(200).json(response);
}

export async function removeAmbulance(req: Request, res: Response) {
  const id = z.coerce.number().parse(req.params.id);
  const response = await ambulanceService.softDeleteAmbulance(id);

  res.status(200).json(response);
}
