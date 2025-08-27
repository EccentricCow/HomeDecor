export type ProductType = {
  id: string,
  name: string,
  price: number,
  url: string,
  image: string,
  lightning?: string,
  humidity?: string,
  temperature?: string,
  height?: number,
  diameter?: number,
  type: {
    id: string,
    name: string,
    url: string
  },
  countInCart?: number,
  isInFavorite?: boolean,
}
