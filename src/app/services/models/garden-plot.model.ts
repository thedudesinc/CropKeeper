export interface GardenPlotInput {
  userId: string;
  fabricJson: string;
  plotName: string;
  hardinessZone: number;
  lastFrostDate: Date;
  zipCode: number;
  notes: string | null;
}

export interface GardenPlotOutput {
  id: string;
  userId: string;
  fabricJson: string;
  plotName: string;
  hardinessZone: number;
  lastFrostDate: Date;
  zipCode: number;
  notes: string | null;
  dateCreated: Date;
  dateModified: Date;
  dateDeleted: Date | null;
}
