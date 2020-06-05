export interface Pet {
  owner?: string;
  name?: string;
  image?: string;
  body: {
    gender: string;
    breed: string;
    birth: string;
    pathologies: string;
    needs?: string;
    recommendedKcal?: number;
  };
}
