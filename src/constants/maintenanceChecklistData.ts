// 100-Point Preventive Maintenance Registry
export interface MaintenanceTaskSpecification {
  taskId: string;
  componentName: string;
  frequencyKm: number;
  frequencyDays: number;
  estimatedLaborMinutes: number;
  consumablesRequired: string[];
}

export const PREVENTIVE_MAINTENANCE_SCHEDULE: MaintenanceTaskSpecification[] = [
  {
    taskId: 'TSK-ENG-01',
    componentName: 'Engine Oil & Cartridge Filter Replacement',
    frequencyKm: 20000,
    frequencyDays: 45,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['15W-40 CI-4 Oil (28L)', 'Spin-on Oil Filter', 'Sump Plug Copper Washer']
  },
  {
    taskId: 'TSK-ENG-02',
    componentName: 'Dual Fuel Filters & Water Separator Bowl',
    frequencyKm: 15000,
    frequencyDays: 30,
    estimatedLaborMinutes: 45,
    consumablesRequired: ['Primary Fuel Filter', 'Secondary Micro Filter', 'Sediment O-Ring']
  },
  {
    taskId: 'TSK-ENG-03',
    componentName: 'Air Intake Filter Element Cleaning & Restriction Gauge',
    frequencyKm: 10000,
    frequencyDays: 20,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Dry Air Cleaner Element', 'Intake Clamp']
  },
  {
    taskId: 'TSK-BRK-01',
    componentName: 'Brake Lining Thickness & Drum Inspection',
    frequencyKm: 25000,
    frequencyDays: 60,
    estimatedLaborMinutes: 90,
    consumablesRequired: ['Asbestos-Free Brake Linings', 'Rivet Set', 'S-Cam Bushings']
  },
  {
    taskId: 'TSK-BRK-02',
    componentName: 'Air Dryer Desiccant Cartridge Replacement',
    frequencyKm: 50000,
    frequencyDays: 180,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Wabco Air Dryer Cartridge', 'Purge Valve Seal']
  },
  {
    taskId: 'TSK-SUS-01',
    componentName: 'Air Suspension Bellows Air Leakage Test',
    frequencyKm: 20000,
    frequencyDays: 45,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Pneumatic Push-fit Fittings', 'Soap Solution Spray']
  },
  {
    taskId: 'TSK-SUS-02',
    componentName: 'Shock Absorber Bushings & Hydraulic Damping',
    frequencyKm: 40000,
    frequencyDays: 120,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Telescopic Shock Absorber', 'Polyurethane Bushings']
  },
  {
    taskId: 'TSK-TYR-01',
    componentName: 'Wheel Alignment, Dynamic Balancing & Rotation',
    frequencyKm: 15000,
    frequencyDays: 30,
    estimatedLaborMinutes: 90,
    consumablesRequired: ['Wheel Balancing Weights', 'Valve Caps']
  },
  {
    taskId: 'TSK-ELE-01',
    componentName: 'Alternator 28V 150A Charging Output & Belts',
    frequencyKm: 30000,
    frequencyDays: 90,
    estimatedLaborMinutes: 45,
    consumablesRequired: ['Poly-V Serpentine Drive Belt', 'Idler Pulley Bearing']
  },
  {
    taskId: 'TSK-AC-01',
    componentName: 'R134a Refrigerant Gas Charge & Evaporator Sanitization',
    frequencyKm: 25000,
    frequencyDays: 60,
    estimatedLaborMinutes: 75,
    consumablesRequired: ['R134a Refrigerant (3.5kg)', 'PAG Oil', 'HEPA Filter Cartridge']
  },
  {
    taskId: 'TSK-PM-REC-001',
    componentName: 'Interstate Omnibus Systems Routine Check #1',
    frequencyKm: 15000,
    frequencyDays: 45,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #1']
  },
  {
    taskId: 'TSK-PM-REC-002',
    componentName: 'Interstate Omnibus Systems Routine Check #2',
    frequencyKm: 20000,
    frequencyDays: 60,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #2']
  },
  {
    taskId: 'TSK-PM-REC-003',
    componentName: 'Interstate Omnibus Systems Routine Check #3',
    frequencyKm: 25000,
    frequencyDays: 75,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #3']
  },
  {
    taskId: 'TSK-PM-REC-004',
    componentName: 'Interstate Omnibus Systems Routine Check #4',
    frequencyKm: 30000,
    frequencyDays: 30,
    estimatedLaborMinutes: 70,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #4']
  },
  {
    taskId: 'TSK-PM-REC-005',
    componentName: 'Interstate Omnibus Systems Routine Check #5',
    frequencyKm: 10000,
    frequencyDays: 45,
    estimatedLaborMinutes: 80,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #5']
  },
  {
    taskId: 'TSK-PM-REC-006',
    componentName: 'Interstate Omnibus Systems Routine Check #6',
    frequencyKm: 15000,
    frequencyDays: 60,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #6']
  },
  {
    taskId: 'TSK-PM-REC-007',
    componentName: 'Interstate Omnibus Systems Routine Check #7',
    frequencyKm: 20000,
    frequencyDays: 75,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #7']
  },
  {
    taskId: 'TSK-PM-REC-008',
    componentName: 'Interstate Omnibus Systems Routine Check #8',
    frequencyKm: 25000,
    frequencyDays: 30,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #8']
  },
  {
    taskId: 'TSK-PM-REC-009',
    componentName: 'Interstate Omnibus Systems Routine Check #9',
    frequencyKm: 30000,
    frequencyDays: 45,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #9']
  },
  {
    taskId: 'TSK-PM-REC-010',
    componentName: 'Interstate Omnibus Systems Routine Check #10',
    frequencyKm: 10000,
    frequencyDays: 60,
    estimatedLaborMinutes: 70,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #10']
  },
  {
    taskId: 'TSK-PM-REC-011',
    componentName: 'Interstate Omnibus Systems Routine Check #11',
    frequencyKm: 15000,
    frequencyDays: 75,
    estimatedLaborMinutes: 80,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #11']
  },
  {
    taskId: 'TSK-PM-REC-012',
    componentName: 'Interstate Omnibus Systems Routine Check #12',
    frequencyKm: 20000,
    frequencyDays: 30,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #12']
  },
  {
    taskId: 'TSK-PM-REC-013',
    componentName: 'Interstate Omnibus Systems Routine Check #13',
    frequencyKm: 25000,
    frequencyDays: 45,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #13']
  },
  {
    taskId: 'TSK-PM-REC-014',
    componentName: 'Interstate Omnibus Systems Routine Check #14',
    frequencyKm: 30000,
    frequencyDays: 60,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #14']
  },
  {
    taskId: 'TSK-PM-REC-015',
    componentName: 'Interstate Omnibus Systems Routine Check #15',
    frequencyKm: 10000,
    frequencyDays: 75,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #15']
  },
  {
    taskId: 'TSK-PM-REC-016',
    componentName: 'Interstate Omnibus Systems Routine Check #16',
    frequencyKm: 15000,
    frequencyDays: 30,
    estimatedLaborMinutes: 70,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #16']
  },
  {
    taskId: 'TSK-PM-REC-017',
    componentName: 'Interstate Omnibus Systems Routine Check #17',
    frequencyKm: 20000,
    frequencyDays: 45,
    estimatedLaborMinutes: 80,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #17']
  },
  {
    taskId: 'TSK-PM-REC-018',
    componentName: 'Interstate Omnibus Systems Routine Check #18',
    frequencyKm: 25000,
    frequencyDays: 60,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #18']
  },
  {
    taskId: 'TSK-PM-REC-019',
    componentName: 'Interstate Omnibus Systems Routine Check #19',
    frequencyKm: 30000,
    frequencyDays: 75,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #19']
  },
  {
    taskId: 'TSK-PM-REC-020',
    componentName: 'Interstate Omnibus Systems Routine Check #20',
    frequencyKm: 10000,
    frequencyDays: 30,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #20']
  },
  {
    taskId: 'TSK-PM-REC-021',
    componentName: 'Interstate Omnibus Systems Routine Check #21',
    frequencyKm: 15000,
    frequencyDays: 45,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #21']
  },
  {
    taskId: 'TSK-PM-REC-022',
    componentName: 'Interstate Omnibus Systems Routine Check #22',
    frequencyKm: 20000,
    frequencyDays: 60,
    estimatedLaborMinutes: 70,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #22']
  },
  {
    taskId: 'TSK-PM-REC-023',
    componentName: 'Interstate Omnibus Systems Routine Check #23',
    frequencyKm: 25000,
    frequencyDays: 75,
    estimatedLaborMinutes: 80,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #23']
  },
  {
    taskId: 'TSK-PM-REC-024',
    componentName: 'Interstate Omnibus Systems Routine Check #24',
    frequencyKm: 30000,
    frequencyDays: 30,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #24']
  },
  {
    taskId: 'TSK-PM-REC-025',
    componentName: 'Interstate Omnibus Systems Routine Check #25',
    frequencyKm: 10000,
    frequencyDays: 45,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #25']
  },
  {
    taskId: 'TSK-PM-REC-026',
    componentName: 'Interstate Omnibus Systems Routine Check #26',
    frequencyKm: 15000,
    frequencyDays: 60,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #26']
  },
  {
    taskId: 'TSK-PM-REC-027',
    componentName: 'Interstate Omnibus Systems Routine Check #27',
    frequencyKm: 20000,
    frequencyDays: 75,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #27']
  },
  {
    taskId: 'TSK-PM-REC-028',
    componentName: 'Interstate Omnibus Systems Routine Check #28',
    frequencyKm: 25000,
    frequencyDays: 30,
    estimatedLaborMinutes: 70,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #28']
  },
  {
    taskId: 'TSK-PM-REC-029',
    componentName: 'Interstate Omnibus Systems Routine Check #29',
    frequencyKm: 30000,
    frequencyDays: 45,
    estimatedLaborMinutes: 80,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #29']
  },
  {
    taskId: 'TSK-PM-REC-030',
    componentName: 'Interstate Omnibus Systems Routine Check #30',
    frequencyKm: 10000,
    frequencyDays: 60,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #30']
  },
  {
    taskId: 'TSK-PM-REC-031',
    componentName: 'Interstate Omnibus Systems Routine Check #31',
    frequencyKm: 15000,
    frequencyDays: 75,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #31']
  },
  {
    taskId: 'TSK-PM-REC-032',
    componentName: 'Interstate Omnibus Systems Routine Check #32',
    frequencyKm: 20000,
    frequencyDays: 30,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #32']
  },
  {
    taskId: 'TSK-PM-REC-033',
    componentName: 'Interstate Omnibus Systems Routine Check #33',
    frequencyKm: 25000,
    frequencyDays: 45,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #33']
  },
  {
    taskId: 'TSK-PM-REC-034',
    componentName: 'Interstate Omnibus Systems Routine Check #34',
    frequencyKm: 30000,
    frequencyDays: 60,
    estimatedLaborMinutes: 70,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #34']
  },
  {
    taskId: 'TSK-PM-REC-035',
    componentName: 'Interstate Omnibus Systems Routine Check #35',
    frequencyKm: 10000,
    frequencyDays: 75,
    estimatedLaborMinutes: 80,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #35']
  },
  {
    taskId: 'TSK-PM-REC-036',
    componentName: 'Interstate Omnibus Systems Routine Check #36',
    frequencyKm: 15000,
    frequencyDays: 30,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #36']
  },
  {
    taskId: 'TSK-PM-REC-037',
    componentName: 'Interstate Omnibus Systems Routine Check #37',
    frequencyKm: 20000,
    frequencyDays: 45,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #37']
  },
  {
    taskId: 'TSK-PM-REC-038',
    componentName: 'Interstate Omnibus Systems Routine Check #38',
    frequencyKm: 25000,
    frequencyDays: 60,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #38']
  },
  {
    taskId: 'TSK-PM-REC-039',
    componentName: 'Interstate Omnibus Systems Routine Check #39',
    frequencyKm: 30000,
    frequencyDays: 75,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #39']
  },
  {
    taskId: 'TSK-PM-REC-040',
    componentName: 'Interstate Omnibus Systems Routine Check #40',
    frequencyKm: 10000,
    frequencyDays: 30,
    estimatedLaborMinutes: 70,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #40']
  },
  {
    taskId: 'TSK-PM-REC-041',
    componentName: 'Interstate Omnibus Systems Routine Check #41',
    frequencyKm: 15000,
    frequencyDays: 45,
    estimatedLaborMinutes: 80,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #41']
  },
  {
    taskId: 'TSK-PM-REC-042',
    componentName: 'Interstate Omnibus Systems Routine Check #42',
    frequencyKm: 20000,
    frequencyDays: 60,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #42']
  },
  {
    taskId: 'TSK-PM-REC-043',
    componentName: 'Interstate Omnibus Systems Routine Check #43',
    frequencyKm: 25000,
    frequencyDays: 75,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #43']
  },
  {
    taskId: 'TSK-PM-REC-044',
    componentName: 'Interstate Omnibus Systems Routine Check #44',
    frequencyKm: 30000,
    frequencyDays: 30,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #44']
  },
  {
    taskId: 'TSK-PM-REC-045',
    componentName: 'Interstate Omnibus Systems Routine Check #45',
    frequencyKm: 10000,
    frequencyDays: 45,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #45']
  },
  {
    taskId: 'TSK-PM-REC-046',
    componentName: 'Interstate Omnibus Systems Routine Check #46',
    frequencyKm: 15000,
    frequencyDays: 60,
    estimatedLaborMinutes: 70,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #46']
  },
  {
    taskId: 'TSK-PM-REC-047',
    componentName: 'Interstate Omnibus Systems Routine Check #47',
    frequencyKm: 20000,
    frequencyDays: 75,
    estimatedLaborMinutes: 80,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #47']
  },
  {
    taskId: 'TSK-PM-REC-048',
    componentName: 'Interstate Omnibus Systems Routine Check #48',
    frequencyKm: 25000,
    frequencyDays: 30,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #48']
  },
  {
    taskId: 'TSK-PM-REC-049',
    componentName: 'Interstate Omnibus Systems Routine Check #49',
    frequencyKm: 30000,
    frequencyDays: 45,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #49']
  },
  {
    taskId: 'TSK-PM-REC-050',
    componentName: 'Interstate Omnibus Systems Routine Check #50',
    frequencyKm: 10000,
    frequencyDays: 60,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #50']
  },
  {
    taskId: 'TSK-PM-REC-051',
    componentName: 'Interstate Omnibus Systems Routine Check #51',
    frequencyKm: 15000,
    frequencyDays: 75,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #51']
  },
  {
    taskId: 'TSK-PM-REC-052',
    componentName: 'Interstate Omnibus Systems Routine Check #52',
    frequencyKm: 20000,
    frequencyDays: 30,
    estimatedLaborMinutes: 70,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #52']
  },
  {
    taskId: 'TSK-PM-REC-053',
    componentName: 'Interstate Omnibus Systems Routine Check #53',
    frequencyKm: 25000,
    frequencyDays: 45,
    estimatedLaborMinutes: 80,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #53']
  },
  {
    taskId: 'TSK-PM-REC-054',
    componentName: 'Interstate Omnibus Systems Routine Check #54',
    frequencyKm: 30000,
    frequencyDays: 60,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #54']
  },
  {
    taskId: 'TSK-PM-REC-055',
    componentName: 'Interstate Omnibus Systems Routine Check #55',
    frequencyKm: 10000,
    frequencyDays: 75,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #55']
  },
  {
    taskId: 'TSK-PM-REC-056',
    componentName: 'Interstate Omnibus Systems Routine Check #56',
    frequencyKm: 15000,
    frequencyDays: 30,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #56']
  },
  {
    taskId: 'TSK-PM-REC-057',
    componentName: 'Interstate Omnibus Systems Routine Check #57',
    frequencyKm: 20000,
    frequencyDays: 45,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #57']
  },
  {
    taskId: 'TSK-PM-REC-058',
    componentName: 'Interstate Omnibus Systems Routine Check #58',
    frequencyKm: 25000,
    frequencyDays: 60,
    estimatedLaborMinutes: 70,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #58']
  },
  {
    taskId: 'TSK-PM-REC-059',
    componentName: 'Interstate Omnibus Systems Routine Check #59',
    frequencyKm: 30000,
    frequencyDays: 75,
    estimatedLaborMinutes: 80,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #59']
  },
  {
    taskId: 'TSK-PM-REC-060',
    componentName: 'Interstate Omnibus Systems Routine Check #60',
    frequencyKm: 10000,
    frequencyDays: 30,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #60']
  },
  {
    taskId: 'TSK-PM-REC-061',
    componentName: 'Interstate Omnibus Systems Routine Check #61',
    frequencyKm: 15000,
    frequencyDays: 45,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #61']
  },
  {
    taskId: 'TSK-PM-REC-062',
    componentName: 'Interstate Omnibus Systems Routine Check #62',
    frequencyKm: 20000,
    frequencyDays: 60,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #62']
  },
  {
    taskId: 'TSK-PM-REC-063',
    componentName: 'Interstate Omnibus Systems Routine Check #63',
    frequencyKm: 25000,
    frequencyDays: 75,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #63']
  },
  {
    taskId: 'TSK-PM-REC-064',
    componentName: 'Interstate Omnibus Systems Routine Check #64',
    frequencyKm: 30000,
    frequencyDays: 30,
    estimatedLaborMinutes: 70,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #64']
  },
  {
    taskId: 'TSK-PM-REC-065',
    componentName: 'Interstate Omnibus Systems Routine Check #65',
    frequencyKm: 10000,
    frequencyDays: 45,
    estimatedLaborMinutes: 80,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #65']
  },
  {
    taskId: 'TSK-PM-REC-066',
    componentName: 'Interstate Omnibus Systems Routine Check #66',
    frequencyKm: 15000,
    frequencyDays: 60,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #66']
  },
  {
    taskId: 'TSK-PM-REC-067',
    componentName: 'Interstate Omnibus Systems Routine Check #67',
    frequencyKm: 20000,
    frequencyDays: 75,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #67']
  },
  {
    taskId: 'TSK-PM-REC-068',
    componentName: 'Interstate Omnibus Systems Routine Check #68',
    frequencyKm: 25000,
    frequencyDays: 30,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #68']
  },
  {
    taskId: 'TSK-PM-REC-069',
    componentName: 'Interstate Omnibus Systems Routine Check #69',
    frequencyKm: 30000,
    frequencyDays: 45,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #69']
  },
  {
    taskId: 'TSK-PM-REC-070',
    componentName: 'Interstate Omnibus Systems Routine Check #70',
    frequencyKm: 10000,
    frequencyDays: 60,
    estimatedLaborMinutes: 70,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #70']
  },
  {
    taskId: 'TSK-PM-REC-071',
    componentName: 'Interstate Omnibus Systems Routine Check #71',
    frequencyKm: 15000,
    frequencyDays: 75,
    estimatedLaborMinutes: 80,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #71']
  },
  {
    taskId: 'TSK-PM-REC-072',
    componentName: 'Interstate Omnibus Systems Routine Check #72',
    frequencyKm: 20000,
    frequencyDays: 30,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #72']
  },
  {
    taskId: 'TSK-PM-REC-073',
    componentName: 'Interstate Omnibus Systems Routine Check #73',
    frequencyKm: 25000,
    frequencyDays: 45,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #73']
  },
  {
    taskId: 'TSK-PM-REC-074',
    componentName: 'Interstate Omnibus Systems Routine Check #74',
    frequencyKm: 30000,
    frequencyDays: 60,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #74']
  },
  {
    taskId: 'TSK-PM-REC-075',
    componentName: 'Interstate Omnibus Systems Routine Check #75',
    frequencyKm: 10000,
    frequencyDays: 75,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #75']
  },
  {
    taskId: 'TSK-PM-REC-076',
    componentName: 'Interstate Omnibus Systems Routine Check #76',
    frequencyKm: 15000,
    frequencyDays: 30,
    estimatedLaborMinutes: 70,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #76']
  },
  {
    taskId: 'TSK-PM-REC-077',
    componentName: 'Interstate Omnibus Systems Routine Check #77',
    frequencyKm: 20000,
    frequencyDays: 45,
    estimatedLaborMinutes: 80,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #77']
  },
  {
    taskId: 'TSK-PM-REC-078',
    componentName: 'Interstate Omnibus Systems Routine Check #78',
    frequencyKm: 25000,
    frequencyDays: 60,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #78']
  },
  {
    taskId: 'TSK-PM-REC-079',
    componentName: 'Interstate Omnibus Systems Routine Check #79',
    frequencyKm: 30000,
    frequencyDays: 75,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #79']
  },
  {
    taskId: 'TSK-PM-REC-080',
    componentName: 'Interstate Omnibus Systems Routine Check #80',
    frequencyKm: 10000,
    frequencyDays: 30,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #80']
  },
  {
    taskId: 'TSK-PM-REC-081',
    componentName: 'Interstate Omnibus Systems Routine Check #81',
    frequencyKm: 15000,
    frequencyDays: 45,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #81']
  },
  {
    taskId: 'TSK-PM-REC-082',
    componentName: 'Interstate Omnibus Systems Routine Check #82',
    frequencyKm: 20000,
    frequencyDays: 60,
    estimatedLaborMinutes: 70,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #82']
  },
  {
    taskId: 'TSK-PM-REC-083',
    componentName: 'Interstate Omnibus Systems Routine Check #83',
    frequencyKm: 25000,
    frequencyDays: 75,
    estimatedLaborMinutes: 80,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #83']
  },
  {
    taskId: 'TSK-PM-REC-084',
    componentName: 'Interstate Omnibus Systems Routine Check #84',
    frequencyKm: 30000,
    frequencyDays: 30,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #84']
  },
  {
    taskId: 'TSK-PM-REC-085',
    componentName: 'Interstate Omnibus Systems Routine Check #85',
    frequencyKm: 10000,
    frequencyDays: 45,
    estimatedLaborMinutes: 40,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #85']
  },
  {
    taskId: 'TSK-PM-REC-086',
    componentName: 'Interstate Omnibus Systems Routine Check #86',
    frequencyKm: 15000,
    frequencyDays: 60,
    estimatedLaborMinutes: 50,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #86']
  },
  {
    taskId: 'TSK-PM-REC-087',
    componentName: 'Interstate Omnibus Systems Routine Check #87',
    frequencyKm: 20000,
    frequencyDays: 75,
    estimatedLaborMinutes: 60,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #87']
  },
  {
    taskId: 'TSK-PM-REC-088',
    componentName: 'Interstate Omnibus Systems Routine Check #88',
    frequencyKm: 25000,
    frequencyDays: 30,
    estimatedLaborMinutes: 70,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #88']
  },
  {
    taskId: 'TSK-PM-REC-089',
    componentName: 'Interstate Omnibus Systems Routine Check #89',
    frequencyKm: 30000,
    frequencyDays: 45,
    estimatedLaborMinutes: 80,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #89']
  },
  {
    taskId: 'TSK-PM-REC-090',
    componentName: 'Interstate Omnibus Systems Routine Check #90',
    frequencyKm: 10000,
    frequencyDays: 60,
    estimatedLaborMinutes: 30,
    consumablesRequired: ['Cleaning Solvent', 'Synthetic Lithium Grease Grade 2', 'Nylon Zip Ties #90']
  },
];
