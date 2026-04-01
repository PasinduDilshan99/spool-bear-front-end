// types/material-types.ts

export interface MaterialType {
  materialTypeId: number;
  name: string;
  description: string;
  iconUrl: string;
  typicalUseCases: string;
  displayOrder: number;
}

export interface MaterialColor {
  colorName: string;
  hexCode: string;
  previewImage: string;
}

export interface MaterialProperty {
  propertyName: string;
  propertyValue: string;
}

export interface Material {
  materialId: number;
  materialName: string;
  materialDescription: string;
  pricePerGram: number;
  density: number;
  strength: string;
  flexibility: string;
  temperatureResistance: string;
  finish: string;
  isPopular: boolean;
  isAvailable: boolean;
  minLayerHeight: number;
  maxLayerHeight: number;
  materialType: MaterialType;
  images: string[];
  pros: string[];
  cons: string[];
  colors: MaterialColor[];
  properties: MaterialProperty[];
}

export interface GetAllMaterialsResponse {
  code: number;
  status: string;
  message: string;
  data: Material[];
  timestamp: string;
}

export interface GetMaterialByIdRequest {
  materialId: number;
}

export interface GetMaterialByIdResponse {
  code: number;
  status: string;
  message: string;
  data: Material;
  timestamp: string;
}