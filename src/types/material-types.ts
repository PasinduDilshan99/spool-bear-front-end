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

export interface FilterState {
  search: string;
  strengths: string[];
  flexibilities: string[];
  materialTypes: string[];
  isAvailable: boolean | null;
  isPopular: boolean | null;
}

export type SortByType = "name" | "price_asc" | "price_desc" | "popularity";

export type ViewModeType = "grid" | "list";

export interface MaterialSearchBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortBy: SortByType;
  onSortChange: (value: SortByType) => void;
  viewMode: ViewModeType;
  onViewModeChange: (mode: ViewModeType) => void;
}

export interface materialsType {
  id: number;
  name: string;
  description: string;
}

export interface MaterialFiltersProps {
  filterOptions: {
    strengths: string[];
    flexibilities: string[];
    materialTypes: string[];
  };
  filters: FilterState;
  materials: Material[];
  onFilterChange: (
    type: keyof Pick<
      FilterState,
      "strengths" | "flexibilities" | "materialTypes"
    >,
    value: string,
  ) => void;
  onClearFilters: () => void;
}

export interface MaterialsStatsProps {
  filteredCount: number;
  totalCount: number;
}

export interface MaterialGridProps {
  materials: Material[];
  onQuickView: (material: Material) => void;
}

export interface MaterialListViewProps {
  materials: Material[];
  onQuickView: (material: Material) => void;
}

export interface MaterialQuickViewModalProps {
  material: Material | null;
  onClose: () => void;
}

export interface MaterialCardProps {
  material: Material;
  onQuickView: (material: Material) => void;
}

export interface MaterialDetailsImageGalleryProps {
  images: string[];
  materialName: string;
  isPopular: boolean;
  isAvailable: boolean;
  selectedImage: string | null;
  onImageSelect: (image: string) => void;
}

export interface MaterialDetailsInfoProps {
  name: string;
  type?: string;
  price: number;
  description: string;
}

export interface MaterialDetailsSpecificationsProps {
  density: number;
  temperatureResistance: string;
  minLayerHeight: number;
  maxLayerHeight: number;
  finish: string;
}

export interface MaterialDetailsTagsProps {
  strength: string;
  flexibility: string;
}

export interface MaterialDetailsPropertiesProps {
  properties: MaterialProperty[];
}

export interface MaterialDetailsColorsProps {
  colors: MaterialColor[];
  selectedColor: string | null;
  onColorSelect: (colorName: string) => void;
}

export interface MaterialDetailsProsConsProps {
  pros: string[];
  cons: string[];
}

export interface MaterialDetailsLightboxModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

export interface MaterialDetailsBackButtonProps {
  onClick: () => void;
}

export interface MaterialDetailsErrorProps {
  error: string;
}

export interface MaterialDetailsActionsProps {
  isAvailable: boolean;
  onAddToCart: () => void;
  onAddToFavorites: () => void;
}
