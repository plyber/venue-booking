export interface Venue {
  _id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  capacity: number;
  type: string;
  amenities?: string[];
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
