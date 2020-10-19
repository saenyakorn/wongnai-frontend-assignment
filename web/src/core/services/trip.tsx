import httpClient from "../../utls/http"
import Trip from "../models/trip"

export async function getAllTrips(): Promise<Trip[]> {
  return (await httpClient.get(`/api/trips`)).data
}

export async function getTripsByTag(tag: string): Promise<Trip[]> {
  return (await httpClient.get(`/api/trips?tag=${tag}`)).data
}
