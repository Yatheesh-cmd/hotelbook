export class Hotel {
  _id: string = '';
  name: string = '';
  location: string = '';
  description: string = '';
  price: number = 0;
  images: string[] = []; // Changed from single image to array
  rating?: string;
  nights?: number;
  isAvailable: boolean = true;
}