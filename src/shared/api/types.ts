export type GardenVisibility = "public" | "private"

export interface Token {
  sub: string
  username: string
  iat: number
  exp: number
}

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
  plantUrl: string | null
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

export interface Product {
  id: string
  name: string
  description: string
  imageUrl?: string | null
  price: number
  status?: string
  createdAt: Date
}

export interface Feature {
  id: string
  name: string
  description?: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export interface ProductWithFeatures extends Product {
  features: Feature[]
}
