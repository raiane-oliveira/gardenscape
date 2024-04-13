export type GardenVisibility = "public" | "private"

export interface Garden {
  id: string
  name: string
  slug: string
  visibility: GardenVisibility
  gardenerId: string
  createdAt: Date
  updatedAt?: Date | null
}

export interface Gardener {
  id: string
  name: string
  email: string
  username: string
  createdAt: Date
  updatedAt?: Date | null
}

export interface GardenerDetails extends Gardener {
  gardens: Garden[]
}
