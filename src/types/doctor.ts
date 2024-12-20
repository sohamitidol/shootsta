export type Doctor = {
  id: number;
  name: string;
  age: number;
  specialty?: string;
  contact?: string;
  description?: string;
  location?: string;
  imageFileKey: string;
  isDeleted: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};
