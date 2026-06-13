export type HandbagResponse = {
  id: string;
  handbagName: string;
  brand: string;
  cost: number;
  category: string;
  gender: true;
  percentOff: number;
  description: string;
  variants: {
    color: string;
    images: string[];
  };
  feedbacks: {
    user: string;
    rating: number;
    comment: string;
  }[];
  coordinates: {
    latitude: number;
    longitude: number;
    address: number;
  };
};
