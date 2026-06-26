export interface MenuItem {
  id: string;
  name: string;
  category: 'Espresso' | 'Matcha' | 'Cold Brew' | 'Pastries';
  price: string;
  description: string;
  image: string;
  badge?: string;
}

export interface HostingOption {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedMilk?: string;
  selectedSize?: string;
}
