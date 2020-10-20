import httpClient from "../../utls/http"
import Trip from "../models/trip.model"

export async function getAllTrips(): Promise<Trip[]> {
  return (await httpClient.get(`/api/trips`)).data
}

export async function getTripsByKeyword(keyword: string): Promise<Trip[]> {
  return (await httpClient.get(`/api/trips?keyword=${keyword}`)).data
}
