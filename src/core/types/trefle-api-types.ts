export interface Specie {
  id: number
  common_name: string
  slug: string
  scientific_name: string
  year: number
  bibliography: string
  author: string
  status: string
  rank: string
  family_common_name: string
  genus_id: number
  image_url: string
  synonyms: Synonym[]
  genus: string
  family: string
  links: Links
}

export interface FullSpecieData extends Specie {
  observations: string
  vegetable: boolean
  duration: number | null
  edible_part: number | null
  edible: boolean
  images: Image
  common_names: {
    en: string[]
    pt: string[]
    [key: string]: string[]
  }
  distribution: {
    native: string[]
    introduced: string[]
  }
  distributions: {
    native: Distribution[]
    introduced: Distribution[]
  }
  flower: Flower
  foliage: Foliage
  fruit_or_seed: FruitOrSeed
  specifications: Specifications
  growth: Growth
}

export interface BaseInfo {
  id: number
  image_url: string
  copyright: string
}

export interface Image {
  flower: BaseInfo[]
  leaf: BaseInfo[]
  habit: BaseInfo[]
  fruit: BaseInfo[]
  bark: BaseInfo[]
  other: BaseInfo[]
}

export interface Flower {
  color: string[] | null
  conspicuous: boolean
}

export interface Foliage {
  color: string[] | null
  texture: string
  leaf_retention: boolean
}

export interface FruitOrSeed {
  conspicuous: boolean
  color: string[] | null
  shape: string | null
  seed_persistance: boolean
}

export interface Specifications {
  ligneous_type: string
  growth_form: string
  growth_habit: string
  growth_rate: string
  average_height: Centimenter
  maximum_height: Centimenter
  nitrogen_fixation: string
  shape_and_orientation: string
  toxicity: string
}

export interface Growth {
  description: string | null
  sowing: string | null
  days_to_harvest: number | null
  row_spacing: Centimenter
  spread: Centimenter
  ph_maximum: number
  ph_minimum: number
  light: number
  atmospheric_humidity: number
  growth_months: string[] | null
  bloom_months: string[] | null
  fruit_months: string[] | null
  minimum_precipitation: {
    mm: number | null
  }
  maximum_precipitation: {
    mm: number | null
  }
  minimum_root_depth: Centimenter
  minimum_temperature: {
    deg_f: number | null
    deg_c: number | null
  }
  maximum_temperature: {
    deg_f: number | null
    deg_c: number | null
  }
  soil_nutriments: number | null
  soil_salinity: number | null
  soil_texture: number | null
  soil_humidity: number | null
}

export interface Centimenter {
  cm: number | null
}

export interface Synonym {
  id: number
  name: string
  author: string
}

export interface Distribution {
  id: number
  name: string
  slug: string
  tdwg_code: string
  tdwg_level: number
  species_count: number
  links: Links
}

export interface Links {
  self: string
  plant: string
  genus: string
}
