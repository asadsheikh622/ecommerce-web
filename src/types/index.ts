export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  colors: string[];
  sizes: string[];
  sku: string;
  tags: string[];
  dimensions: {
    width: string;
    height: string;
    depth: string;
    weight: string;
    seatHeight: string;
    legHeight: string;
  };
  material: string;
  origin: string;
  salesPackage: string;
  modelNumber: string;
  secondaryMaterial: string;
  configuration: string;
  upholsteryMaterial: string;
  upholsteryColor: string;
  fillingMaterial: string;
  finishType: string;
  adjustableHeadrest: string;
  maximumLoadCapacity: string;
  warrantySummary: string;
  warrantyServiceType: string;
  coveredInWarranty: string;
  notCoveredInWarranty: string;
  domesticWarranty: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}
