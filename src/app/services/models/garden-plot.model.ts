export interface GardenPlotPartialInput {
  id?: string;
  plotName: string;
  zipCode: string;
  notes: string | null;
  fabricJson: string;
}

export interface GardenPlotInput {
  userId: string;
  fabricJson: string;
  plotName: string;
  hardinessZone: number;
  lastFrostDate: Date;
  zipCode: string;
  notes: string | null;
}

export interface GardenPlotOutput {
  id: string;
  userId: string;
  fabricJson: string;
  plotName: string;
  hardinessZone: number;
  lastFrostDate: Date;
  zipCode: string;
  notes: string | null;
  dateCreated: Date;
  dateModified: Date;
  dateDeleted: Date | null;
}
