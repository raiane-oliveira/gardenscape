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

export interface Plant {
  plantId: string | number
  gardenId: string
  plantedAt: Date
}

export interface GardenDetails extends Garden {
  gardener: {
    id: string
    name: string
    username: string
  }
  plants: Plant[]
}

export interface Gardener {
  id: string
  name: string
  email: string
  username: string
  avatar: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export interface GardenerDetails extends Gardener {
  gardens: GardenDetails[]
}
