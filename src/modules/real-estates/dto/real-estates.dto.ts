export class RealEstatesDto {
  title: string;
  ownerID: number;
  priceInDollars: number;
  squareInM2: number;
  district: string;
  address: string;
  floorsCount: number;
  roomsCount: number;
  house: string;
}

export class RealEstatesUpdates{
  priceInDollars?: number;
  selled?: boolean;
}