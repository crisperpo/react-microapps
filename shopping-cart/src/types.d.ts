interface RootObject {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Filter {
  category: string;
  minPrice: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
  quantity: number;
}

interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

type AddCartActionType = {
  type: 'ADD_TO_CART',
  payload: Product
}
type RemoveCartActionType = {
  type: 'REMOVE_FROM_CART',
  payload: Product
}
type ClearCartActionType = {
  type: 'CLEAR_CART'
}
export type CartActionType = AddCartActionType | RemoveCartActionType | ClearCartActionType