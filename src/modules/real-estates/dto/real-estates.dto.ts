export class RealEstatesDto {
  title: string;
  ownerID: number;
  priceInDollars: number;
  squareInM2: number;
  district: string;
  address: string;
  floorsCount: number;
  roomsCount: number;
  house: boolean;
}

export class RealEstatesUpdates{
  realEstateID: number;
  title?: string;
  priceInDollars?: number;
  district?: string;
  address?: string;
  floorsCount?: number;
  roomsCount?: number;
  house?: boolean;
  isCurrentlyAvailable?: boolean;
}