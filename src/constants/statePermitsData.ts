// Motor Vehicles Act - State Tax & Interstate Permits Master
export interface StateTransportRegulation {
  stateCode: string;
  stateName: string;
  borderCheckpostEntryTaxPerSeatQuarterlyINR: number;
  interstatePermitFeeDailyINR: number;
  greenTaxApplicable: boolean;
  speedLimitNationalHighwayKmph: number;
  nightDrivingPermitMandatory: boolean;
  majorBorderCheckposts: string[];
}

export const STATE_TRANSPORT_REGULATIONS: Record<string, StateTransportRegulation> = {
  'AP': {
    stateCode: 'AP',
    stateName: 'Andhra Pradesh',
    borderCheckpostEntryTaxPerSeatQuarterlyINR: 320,
    interstatePermitFeeDailyINR: 150,
    greenTaxApplicable: false,
    speedLimitNationalHighwayKmph: 90,
    nightDrivingPermitMandatory: false,
    majorBorderCheckposts: ['Bapatla Checkpost', 'Garikapadu Checkpost', 'Tada Border Gate', 'Jeelugumilli Checkpost']
  },
  'TS': {
    stateCode: 'TS',
    stateName: 'Telangana',
    borderCheckpostEntryTaxPerSeatQuarterlyINR: 350,
    interstatePermitFeeDailyINR: 150,
    greenTaxApplicable: false,
    speedLimitNationalHighwayKmph: 90,
    nightDrivingPermitMandatory: false,
    majorBorderCheckposts: ['Wadapally Checkpost', 'Kodad Border Gate', 'Kowdipally Checkpost', 'Madnoor Gate']
  },
  'KA': {
    stateCode: 'KA',
    stateName: 'Karnataka',
    borderCheckpostEntryTaxPerSeatQuarterlyINR: 420,
    interstatePermitFeeDailyINR: 200,
    greenTaxApplicable: true,
    speedLimitNationalHighwayKmph: 80,
    nightDrivingPermitMandatory: true,
    majorBorderCheckposts: ['Attibele Border Gate', 'Nangli Checkpost', 'Nippani Checkpost', 'Bagepalli Checkpost']
  },
  'TN': {
    stateCode: 'TN',
    stateName: 'Tamil Nadu',
    borderCheckpostEntryTaxPerSeatQuarterlyINR: 450,
    interstatePermitFeeDailyINR: 250,
    greenTaxApplicable: true,
    speedLimitNationalHighwayKmph: 80,
    nightDrivingPermitMandatory: false,
    majorBorderCheckposts: ['Hosur Toll Plaza Gate', 'Kaniyur Checkpost', 'Gummidipoondi Border', 'Walayar Checkpost']
  },
  'MH': {
    stateCode: 'MH',
    stateName: 'Maharashtra',
    borderCheckpostEntryTaxPerSeatQuarterlyINR: 380,
    interstatePermitFeeDailyINR: 180,
    greenTaxApplicable: false,
    speedLimitNationalHighwayKmph: 90,
    nightDrivingPermitMandatory: false,
    majorBorderCheckposts: ['Vapi-Talasari Gate', 'Kagal Border Kolhapur', 'Navapur Checkpost', 'Deori Border']
  },
  'GJ': {
    stateCode: 'GJ',
    stateName: 'Gujarat',
    borderCheckpostEntryTaxPerSeatQuarterlyINR: 360,
    interstatePermitFeeDailyINR: 160,
    greenTaxApplicable: false,
    speedLimitNationalHighwayKmph: 95,
    nightDrivingPermitMandatory: false,
    majorBorderCheckposts: ['Bhilad Checkpost', 'Shamlaji Border', 'Dahod Checkpost', 'Zalod Checkpost']
  },
  'RJ': {
    stateCode: 'RJ',
    stateName: 'Rajasthan',
    borderCheckpostEntryTaxPerSeatQuarterlyINR: 340,
    interstatePermitFeeDailyINR: 150,
    greenTaxApplicable: false,
    speedLimitNationalHighwayKmph: 90,
    nightDrivingPermitMandatory: false,
    majorBorderCheckposts: ['Shahjahanpur Border', 'Ratanpur Checkpost', 'Abu Road Checkpost', 'Bharatpur Gate']
  },
  'DL': {
    stateCode: 'DL',
    stateName: 'Delhi NCR',
    borderCheckpostEntryTaxPerSeatQuarterlyINR: 500,
    interstatePermitFeeDailyINR: 300,
    greenTaxApplicable: true,
    speedLimitNationalHighwayKmph: 70,
    nightDrivingPermitMandatory: true,
    majorBorderCheckposts: ['Singhu Border', 'Tikri Border', 'Badarpur Border', 'Ghazipur Border']
  },
  'KL': {
    stateCode: 'KL',
    stateName: 'Kerala',
    borderCheckpostEntryTaxPerSeatQuarterlyINR: 480,
    interstatePermitFeeDailyINR: 250,
    greenTaxApplicable: false,
    speedLimitNationalHighwayKmph: 75,
    nightDrivingPermitMandatory: true,
    majorBorderCheckposts: ['Walayar Commercial Tax Post', 'Manjeswaram Checkpost', 'Muthanga Gate', 'Aryankavu Post']
  },
  'MP': {
    stateCode: 'MP',
    stateName: 'Madhya Pradesh',
    borderCheckpostEntryTaxPerSeatQuarterlyINR: 330,
    interstatePermitFeeDailyINR: 140,
    greenTaxApplicable: false,
    speedLimitNationalHighwayKmph: 90,
    nightDrivingPermitMandatory: false,
    majorBorderCheckposts: ['Sendhwa Border', 'Morena Checkpost', 'Chhindwara Border', 'Rewa Checkpost']
  },
  'UP': {
    stateCode: 'UP',
    stateName: 'Uttar Pradesh',
    borderCheckpostEntryTaxPerSeatQuarterlyINR: 370,
    interstatePermitFeeDailyINR: 160,
    greenTaxApplicable: false,
    speedLimitNationalHighwayKmph: 90,
    nightDrivingPermitMandatory: false,
    majorBorderCheckposts: ['Agra Kuber Toll Gate', 'Noida DND Border', 'Jhansi Border', 'Varanasi Mohania Gate']
  },
  'WB': {
    stateCode: 'WB',
    stateName: 'West Bengal',
    borderCheckpostEntryTaxPerSeatQuarterlyINR: 390,
    interstatePermitFeeDailyINR: 180,
    greenTaxApplicable: false,
    speedLimitNationalHighwayKmph: 80,
    nightDrivingPermitMandatory: false,
    majorBorderCheckposts: ['Barhi-Chichira Border', 'Dalkhola Checkpost', 'Rampurhat Gate', 'Kharagpur Hub']
  },
  'GA': {
    stateCode: 'GA',
    stateName: 'Goa',
    borderCheckpostEntryTaxPerSeatQuarterlyINR: 400,
    interstatePermitFeeDailyINR: 200,
    greenTaxApplicable: true,
    speedLimitNationalHighwayKmph: 70,
    nightDrivingPermitMandatory: true,
    majorBorderCheckposts: ['Patradevi Checkpost', 'PolemMargao Checkpost', 'Dodamarg Gate', 'Keri Checkpost']
  },
};

export function getInterstatePermitTax(originState: string, destState: string, seatsCount: number): number {
  if (originState === destState) return 0;
  const destReg = STATE_TRANSPORT_REGULATIONS[destState];
  if (!destReg) return 250;
  return destReg.interstatePermitFeeDailyINR + (destReg.greenTaxApplicable ? 50 : 0);
}
