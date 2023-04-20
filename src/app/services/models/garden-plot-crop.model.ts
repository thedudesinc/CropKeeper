export interface GardenPlotCropInput {
  gardenPlotId: string;
  cropId: string;
  fabricId: string;
  quantity: number;
}

export interface GardenPlotCropOutput {
  id: string;
  dateCreated: string;
  dateModified: string;
  dateDeleted: string | null;
}
