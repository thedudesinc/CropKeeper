export interface GardenPlotPartialInput {
  id?: string;
  userId: string;
  plotName: string;
  fabricJson: string;
  zipCode: string;
  notes: string | null;
}

export interface GardenPlotInput {
  userId: string;
  plotName: string;
  fabricJson: string;
  zipCode: string;
  notes: string | null;
  hardinessZone: number;
  lastFrostDate: Date;
}

export interface GardenPlotOutput {
  id: string;
  userId: string;
  plotName: string;
  fabricJson: string;
  zipCode: string;
  notes: string | null;
  hardinessZone: number;
  lastFrostDate: Date;
  dateCreated: Date;
  dateModified: Date;
  dateDeleted: Date | null;
}
