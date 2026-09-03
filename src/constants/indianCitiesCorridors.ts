// Enterprise Master Geography & Corridor Configuration
// Comprehensive registry of major Indian transit hubs, terminals, coordinates and highway corridors

export interface CityTransitHub {
  cityId: string;
  cityName: string;
  state: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  majorTerminals: string[];
  boardingPoints: string[];
  elevationMeters: number;
  tierCategory: 'METRO' | 'TIER_1' | 'TIER_2' | 'TIER_3';
  isNightPermitMandatory: boolean;
  regionalRTOOffice: string;
}

export interface HighwayCorridorDefinition {
  corridorId: string;
  corridorName: string;
  sourceCityId: string;
  destinationCityId: string;
  officialHighwayNumber: string;
  totalDistanceKm: number;
  typicalDrivingMinutes: number;
  fastagTollPlazaCount: number;
  averageTollChargeINR: number;
  terrainClassification: 'FLAT_EXPRESSWAY' | 'ROLLING_PLAINS' | 'GHAT_MOUNTAINOUS' | 'COASTAL_HIGHWAY';
  hasSpeedGovernorZone: boolean;
  speedLimitKmph: number;
  fuelConsumptionIndex: number;
  approvedRestStops: { name: string; highwayKm: number; amenities: string[]; latitude: number; longitude: number }[];
  mandatoryDriverSwapPoint?: string;
}

export const INDIAN_CITIES_REGISTRY: Record<string, CityTransitHub> = {
  'HYD': {
    cityId: 'HYD',
    cityName: 'Hyderabad',
    state: 'Telangana',
    postalCode: '500001',
    latitude: 17.385,
    longitude: 78.4867,
    majorTerminals: ['MGBS Terminal', 'JBS Secunderabad', 'Ameerpet Hub', 'Dilsukhnagar Stand'],
    boardingPoints: ['Kukatpally', 'Miyapur', 'Gachibowli', 'Lakdikapul', 'SR Nagar', 'Uppal', 'LB Nagar', 'Shamshabad ORR'],
    elevationMeters: 505,
    tierCategory: 'METRO',
    isNightPermitMandatory: true,
    regionalRTOOffice: 'TE-01-HYD'
  },
  'BLR': {
    cityId: 'BLR',
    cityName: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560001',
    latitude: 12.9716,
    longitude: 77.5946,
    majorTerminals: ['Majestic Kempegowda', 'Shantinagar TTMC', 'Satellite Bus Stand', 'Yeshwantpur TTMC'],
    boardingPoints: ['Silk Board', 'Electronic City', 'Madiwala', 'Indiranagar', 'Hebbal', 'Marathahalli', 'Tin Factory', 'Kallada Terminal'],
    elevationMeters: 920,
    tierCategory: 'METRO',
    isNightPermitMandatory: true,
    regionalRTOOffice: 'KA-01-BLR'
  },
  'MAA': {
    cityId: 'MAA',
    cityName: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600001',
    latitude: 13.0827,
    longitude: 80.2707,
    majorTerminals: ['CMBT Koyambedu', 'Madhavaram Terminal', 'Kilambakkam KCBT', 'Tambaram Stand'],
    boardingPoints: ['Guindy', 'Ashok Pillar', 'Perungalathur', 'Sholinganallur', 'Thiruvanmiyur', 'Central Station', 'Vadapalani', 'Porur'],
    elevationMeters: 10,
    tierCategory: 'METRO',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'TA-01-MAA'
  },
  'BOM': {
    cityId: 'BOM',
    cityName: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400001',
    latitude: 19.076,
    longitude: 72.8777,
    majorTerminals: ['Borivali West Terminal', 'Dadar Asiad Stand', 'Vashi Plaza', 'Kurla Nehru Nagar'],
    boardingPoints: ['Andheri East', 'Bandra Kalanagar', 'Chembur', 'Sion Circle', 'Thane Teen Hath Naka', 'Goregaon', 'Kandivali', 'Airoli'],
    elevationMeters: 10,
    tierCategory: 'METRO',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'MA-01-BOM'
  },
  'PNQ': {
    cityId: 'PNQ',
    cityName: 'Pune',
    state: 'Maharashtra',
    postalCode: '411001',
    latitude: 18.5204,
    longitude: 73.8567,
    majorTerminals: ['Shivajinagar Swargate', 'Wakad Bypass', 'Hinjawadi Flyover', 'Pune Station Stand'],
    boardingPoints: ['Katraj', 'Chandani Chowk', 'Nigdi', 'Viman Nagar', 'Kharadi Bypass', 'Aundh', 'Hadapsar', 'Bhosari'],
    elevationMeters: 560,
    tierCategory: 'TIER_1',
    isNightPermitMandatory: true,
    regionalRTOOffice: 'MA-01-PNQ'
  },
  'DEL': {
    cityId: 'DEL',
    cityName: 'New Delhi',
    state: 'Delhi NCR',
    postalCode: '110001',
    latitude: 28.6139,
    longitude: 77.209,
    majorTerminals: ['Kashmere Gate ISBT', 'Anand Vihar ISBT', 'Sarai Kale Khan ISBT', 'Dhaula Kuan Hub'],
    boardingPoints: ['Karol Bagh', 'Connaught Place', 'Akshardham', 'Mahipalpur', 'IFFCO Chowk Gurgaon', 'Noida Sector 37', 'Badarpur Border', 'Rohini'],
    elevationMeters: 216,
    tierCategory: 'METRO',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'DE-01-DEL'
  },
  'JAI': {
    cityId: 'JAI',
    cityName: 'Jaipur',
    state: 'Rajasthan',
    postalCode: '302001',
    latitude: 26.9124,
    longitude: 75.7873,
    majorTerminals: ['Sindhi Camp Central', 'Narayan Singh Circle', 'Transport Nagar', 'Durgapura Stand'],
    boardingPoints: ['Polo Victory', '200 Feet Bypass', 'Ajmer Pulia', 'Gopalpura', 'Mansarovar', 'Chomu Pulia', 'Sanganer', 'VKI Area'],
    elevationMeters: 216,
    tierCategory: 'TIER_1',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'RA-01-JAI'
  },
  'AMD': {
    cityId: 'AMD',
    cityName: 'Ahmedabad',
    state: 'Gujarat',
    postalCode: '380001',
    latitude: 23.0225,
    longitude: 72.5714,
    majorTerminals: ['Geeta Mandir Central', 'Paldi Cross Road', 'C.G. Road Hub', 'Nehrunagar Stand'],
    boardingPoints: ['Satellite', 'Bopal Cross', 'Naroda Patiya', 'Iscon Cross Road', 'Chandkheda', 'Sarkhej', 'Maninagar', 'Soni Ni Chali'],
    elevationMeters: 216,
    tierCategory: 'TIER_1',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'GU-01-AMD'
  },
  'ST': {
    cityId: 'ST',
    cityName: 'Surat',
    state: 'Gujarat',
    postalCode: '395001',
    latitude: 21.1702,
    longitude: 72.8311,
    majorTerminals: ['Central Bus Station', 'Kamrej Char Rasta', 'Hirabaug Varachha', 'Kadodara Circle'],
    boardingPoints: ['Parvat Patiya', 'Adajan Patiya', 'Athwa Gate', 'Udhna Darwaja', 'Katargam', 'Pandesara', 'Rander', 'Ring Road'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'GU-01-ST'
  },
  'VGA': {
    cityId: 'VGA',
    cityName: 'Vijayawada',
    state: 'Andhra Pradesh',
    postalCode: '520001',
    latitude: 16.5062,
    longitude: 80.648,
    majorTerminals: ['Pandit Nehru Bus Station', 'Benz Circle Hub', 'Ramavarappadu Ring', 'Gollapudi Bypass'],
    boardingPoints: ['Autonagar Gate', 'Poranki', 'Kankipadu', 'Enikepadu', 'Bhavanipuram', 'Governorpet', 'One Town', 'Gunadala'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'AN-01-VGA'
  },
  'VTZ': {
    cityId: 'VTZ',
    cityName: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    postalCode: '530001',
    latitude: 17.6868,
    longitude: 83.2185,
    majorTerminals: ['Dwaraka Bus Station RTC Complex', 'Maddilapalem Hub', 'Gajuwaka Junction', 'Kurmannapalem'],
    boardingPoints: ['NAD Kotha Road', 'Car Shed Junction', 'Pendurthi', 'Gurudwara Junction', 'MVP Colony', 'Old Post Office', 'Simhachalam', 'Steel Plant Gate'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'AN-01-VTZ'
  },
  'COK': {
    cityId: 'COK',
    cityName: 'Kochi',
    state: 'Kerala',
    postalCode: '682001',
    latitude: 9.9312,
    longitude: 76.2673,
    majorTerminals: ['Vyttila Mobility Hub', 'Kaloor Bus Stand', 'Ernakulam KSRTC Stand', 'Aluva Bypass'],
    boardingPoints: ['Edapally Toll', 'Palarivattom', 'Kadavanthra', 'Angamaly', 'Kundannoor', 'Kakkanad InfoPark', 'Thoppumpady', 'Cherthala Bypass'],
    elevationMeters: 216,
    tierCategory: 'TIER_1',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'KE-01-COK'
  },
  'TRV': {
    cityId: 'TRV',
    cityName: 'Thiruvananthapuram',
    state: 'Kerala',
    postalCode: '695001',
    latitude: 8.5241,
    longitude: 76.9366,
    majorTerminals: ['Central Thampanoor', 'Enchakkal Bypass', 'Kazhakoottam TechnoPark', 'Pattom Stand'],
    boardingPoints: ['East Fort', 'Ulloor', 'Sreekaryam', 'Attingal', 'Neyyattinkara', 'Balaramapuram', 'Pravachambalam', 'Karamana'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'KE-01-TRV'
  },
  'GOI': {
    cityId: 'GOI',
    cityName: 'Panaji Goa',
    state: 'Goa',
    postalCode: '403001',
    latitude: 15.4909,
    longitude: 73.8278,
    majorTerminals: ['KTC Panaji Central', 'Margao KTC Stand', 'Mapusa Bus Stand', 'Vasco KTC Terminal'],
    boardingPoints: ['Porvorim', 'Cortalim Circle', 'Canacona', 'Ponda Bypass', 'Old Goa', 'Bambolim', 'Tivim', 'Calangute Circle'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'GO-01-GOI'
  },
  'IDR': {
    cityId: 'IDR',
    cityName: 'Indore',
    state: 'Madhya Pradesh',
    postalCode: '452001',
    latitude: 22.7196,
    longitude: 75.8577,
    majorTerminals: ['Sarwate Bus Stand', 'Navlakha Stand', 'Vijay Nagar Square', 'AICTSL Terminal'],
    boardingPoints: ['Bhawarkua', 'Palasia Square', 'Radisson Square', 'Pipliyahana', 'Bicholi Mardana', 'Rajwada', 'Gangwal Stand', 'Rau Bypass'],
    elevationMeters: 216,
    tierCategory: 'TIER_1',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'MA-01-IDR'
  },
  'BHO': {
    cityId: 'BHO',
    cityName: 'Bhopal',
    state: 'Madhya Pradesh',
    postalCode: '462001',
    latitude: 23.2599,
    longitude: 77.4126,
    majorTerminals: ['Nadra Bus Stand', 'ISBT Habibganj', 'Kushabhau Thakre ISBT', 'Halalpura Stand'],
    boardingPoints: ['MP Nagar Zone 1', 'Lalghati', 'Board Office Square', 'New Market', 'Hoshangabad Road', 'Ayodhya Bypass', 'Bairagarh', 'Kolar Road'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'MA-01-BHO'
  },
  'LKO': {
    cityId: 'LKO',
    cityName: 'Lucknow',
    state: 'Uttar Pradesh',
    postalCode: '226001',
    latitude: 26.8467,
    longitude: 80.9462,
    majorTerminals: ['Alambagh ISBT', 'Charbagh Central Stand', 'Kaiserbagh Stand', 'Kamta Awadh Bus Station'],
    boardingPoints: ['Polytechnic Crossing', 'Transport Nagar', 'Hazratganj', 'Matiyari', 'Dubagga', 'Munshi Pulia', 'Gomti Nagar', 'Singar Nagar'],
    elevationMeters: 216,
    tierCategory: 'TIER_1',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'UT-01-LKO'
  },
  'VNS': {
    cityId: 'VNS',
    cityName: 'Varanasi',
    state: 'Uttar Pradesh',
    postalCode: '221001',
    latitude: 25.3176,
    longitude: 82.9739,
    majorTerminals: ['Cantt Bus Station', 'Chaudhary Charan Singh ISBT', 'Lehertara Stand', 'Shivpur Bypass'],
    boardingPoints: ['Lanka BHU', 'Godowlia', 'Pandeypur', 'Babatpur Airport Road', 'Ashapur', 'Sarnath', 'Ramnagar', 'Manduadih'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'UT-01-VNS'
  },
  'CCU': {
    cityId: 'CCU',
    cityName: 'Kolkata',
    state: 'West Bengal',
    postalCode: '700001',
    latitude: 22.5726,
    longitude: 88.3639,
    majorTerminals: ['Esplanade Bus Terminus', 'Karunamoyee Salt Lake', 'Babughat Stand', 'Santragachi Hub'],
    boardingPoints: ['Airport Gate 1', 'Ultadanga', 'Barasat', 'Garia', 'Dunlop', 'Howrah Station', 'Ruby Hospital', 'Science City'],
    elevationMeters: 216,
    tierCategory: 'METRO',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'WE-01-CCU'
  },
  'BBI': {
    cityId: 'BBI',
    cityName: 'Bhubaneswar',
    state: 'Odisha',
    postalCode: '751001',
    latitude: 20.2961,
    longitude: 85.8245,
    majorTerminals: ['Baramunda ISBT', 'Master Canteen Stand', 'Palasuni Square', 'Khandagiri Hub'],
    boardingPoints: ['Jaydev Vihar', 'Patia Square', 'Rasulgarh', 'Vani Vihar', 'Fire Station Square', 'Acharya Vihar', 'KIIT Square', 'Nayapalli'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'OD-01-BBI'
  },
  'CJB': {
    cityId: 'CJB',
    cityName: 'Coimbatore',
    state: 'Tamil Nadu',
    postalCode: '641001',
    latitude: 11.0168,
    longitude: 76.9558,
    majorTerminals: ['Gandhipuram Central', 'Singanallur Bus Stand', 'Ukkadam Stand', 'Omni Bus Stand Sathy Road'],
    boardingPoints: ['Hope College', 'KMCH', 'Avinashi Road Flyover', 'Hopes', 'Eachanari', 'Thudiyalur', 'Sulur', 'Sundarapuram'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'TA-01-CJB'
  },
  'MDU': {
    cityId: 'MDU',
    cityName: 'Madurai',
    state: 'Tamil Nadu',
    postalCode: '625001',
    latitude: 9.9252,
    longitude: 78.1198,
    majorTerminals: ['Mattuthavani Integrated', 'Arapalayam Stand', 'Periyar Bus Stand', 'Palanganatham'],
    boardingPoints: ['Fathima College', 'Viraganoor Ring Road', 'Koodal Nagar', 'Therkuvasal', 'Simmakkal', 'Goripalayam', 'Kappalur Toll', 'Othakadai'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'TA-01-MDU'
  },
  'TRZ': {
    cityId: 'TRZ',
    cityName: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    postalCode: '620001',
    latitude: 10.7905,
    longitude: 78.7047,
    majorTerminals: ['Central Bus Stand', 'Chatram Bus Stand', 'Tollgate Samayapuram', 'Palpannai Hub'],
    boardingPoints: ['Thillai Nagar', 'KK Nagar', 'Ponmalai', 'Srirangam', 'Mannarpuram', 'Viralimalai', 'Airport Road', 'Kattur'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'TA-01-TRZ'
  },
  'NAG': {
    cityId: 'NAG',
    cityName: 'Nagpur',
    state: 'Maharashtra',
    postalCode: '440001',
    latitude: 21.1458,
    longitude: 79.0882,
    majorTerminals: ['Ganeshpeth Bus Stand', 'Mor Bhavan', 'Chhatrapati Square', 'Automotive Square'],
    boardingPoints: ['Sitabuldi', 'Dharampeth', 'Wardha Road', 'Wadi', 'Kamptee Road', 'Manewada', 'Medical Square', 'Pardi Naka'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'MA-01-NAG'
  },
  'PAT': {
    cityId: 'PAT',
    cityName: 'Patna',
    state: 'Bihar',
    postalCode: '800001',
    latitude: 25.5941,
    longitude: 85.1376,
    majorTerminals: ['Bairiya ISBT', 'Mithapur Bus Stand', 'Gandhi Maidan Stand', 'Zero Mile Hub'],
    boardingPoints: ['Danapur Station', 'Kankarbagh', 'Saguna More', 'Boring Road', 'Rajendra Nagar', 'Patliputra', 'Anisabad', 'Didarganj'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'BI-01-PAT'
  },
  'IXC': {
    cityId: 'IXC',
    cityName: 'Chandigarh',
    state: 'Punjab / Haryana',
    postalCode: '160017',
    latitude: 30.7333,
    longitude: 76.7794,
    majorTerminals: ['ISBT Sector 43', 'ISBT Sector 17', 'Zirakpur Flyover', 'Kalka Shimla Bypass'],
    boardingPoints: ['Tribune Chowk', 'Housing Board Chowk', 'Mohali Phase 7', 'Kharar Flyover', 'Panchkula Sector 5', 'Dera Bassi', 'Landran', 'Airport Chowk'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'PU-01-IXC'
  },
  'ATQ': {
    cityId: 'ATQ',
    cityName: 'Amritsar',
    state: 'Punjab',
    postalCode: '143001',
    latitude: 31.634,
    longitude: 74.8723,
    majorTerminals: ['Shahid Madan Lal Dhingra ISBT', 'Railway Station Stand', 'Alpha One Mall GT Road', 'Chheharta'],
    boardingPoints: ['Golden Temple Gate', 'Hall Gate', 'Putligarh', 'Majitha Road', 'Batala Road', 'Tarn Taran Road', 'Verka Bypass', 'Kitchlew Chowk'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'PU-01-ATQ'
  },
  'UDR': {
    cityId: 'UDR',
    cityName: 'Udaipur',
    state: 'Rajasthan',
    postalCode: '313001',
    latitude: 24.5854,
    longitude: 73.7125,
    majorTerminals: ['Udaipur Central Nagar Nigam', 'Udiapole Stand', 'Paras Circle Stand', 'Rethi Stand'],
    boardingPoints: ['Sukher', 'Bhuwana Bypass', 'Goverdhan Vilas', 'Pratap Nagar', 'Celebration Mall', 'Fatehpura', 'Chetak Circle', 'Savina'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'RA-01-UDR'
  },
  'BDQ': {
    cityId: 'BDQ',
    cityName: 'Vadodara',
    state: 'Gujarat',
    postalCode: '390001',
    latitude: 22.3072,
    longitude: 73.1812,
    majorTerminals: ['Central ST Depot', 'Amit Nagar Circle', 'Golden Chokdi Highway', 'Pandya Bridge'],
    boardingPoints: ['Kapurai Chokdi', 'Sama-Savli Road', 'Fatehgunj', 'Akota', 'Gorwa', 'Makarpura GIDC', 'Sayajigunj', 'Waghodia Cross Road'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'GU-01-BDQ'
  },
  'RPR': {
    cityId: 'RPR',
    cityName: 'Raipur',
    state: 'Chhattisgarh',
    postalCode: '492001',
    latitude: 21.2514,
    longitude: 81.6296,
    majorTerminals: ['Sri Balaji Bus Stand Pandri', 'Bhatagaon New Bus Terminal', 'Tatibandh Chowk', 'Telibandha'],
    boardingPoints: ['Ghadi Chowk', 'Pachpedi Naka', 'Mowa', 'Shankar Nagar', 'VIP Road Chowk', 'Devendra Nagar', 'Gudhiyari', 'Naya Raipur'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'CH-01-RPR'
  },
  'TIR': {
    cityId: 'TIR',
    cityName: 'Tirupati',
    state: 'Andhra Pradesh',
    postalCode: '517501',
    latitude: 13.6288,
    longitude: 79.4192,
    majorTerminals: ['Tirupati Central Bus Station', 'Balaji Link Bus Stand', 'Alipiri Foot Hills', 'Leela Mahal Circle'],
    boardingPoints: ['Ramanuja Circle', 'RTC Workshop', 'Renigunta Junction', 'Chandragiri Bypass', 'Tiruchanur Toll', 'Bhavani Nagar', 'SV University Gate', 'Kapila Theertham'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'AN-01-TIR'
  },
  'WAR': {
    cityId: 'WAR',
    cityName: 'Warangal',
    state: 'Telangana',
    postalCode: '506002',
    latitude: 17.9689,
    longitude: 79.5941,
    majorTerminals: ['Hanamkonda Bus Station', 'Warangal Central Stand', 'Kazipet Junction', 'Nayeem Nagar Hub'],
    boardingPoints: ['Subedari', 'Adalat Circle', 'Mulugu Road Cross', 'Hunter Road', 'Maddikunta', 'Bhadrakali Temple Gate', 'Enumamula Market', 'Peddammagadda'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'TE-01-WAR'
  },
  'MYS': {
    cityId: 'MYS',
    cityName: 'Mysuru',
    state: 'Karnataka',
    postalCode: '570001',
    latitude: 12.2958,
    longitude: 76.6394,
    majorTerminals: ['KSRTC Central Suburb Stand', 'City Bus Stand', 'KRS Road Stand', 'Bannimantap Depot'],
    boardingPoints: ['Columbia Asia Hospital Circle', 'Ramaswamy Circle', 'Infosys Gate 1', 'Hebbal Industrial Area', 'Vijayanagar Water Tank', 'Kuvempunagar', 'Siddhartha Layout', 'Jayalakshmipuram'],
    elevationMeters: 216,
    tierCategory: 'TIER_2',
    isNightPermitMandatory: false,
    regionalRTOOffice: 'KA-01-MYS'
  },
};

export const ALL_HIGHWAY_CORRIDORS: HighwayCorridorDefinition[] = [
  {
    corridorId: 'CORR-HYD-BLR',
    corridorName: 'HYD to BLR Express Corridor',
    sourceCityId: 'HYD',
    destinationCityId: 'BLR',
    officialHighwayNumber: 'NH44',
    totalDistanceKm: 570,
    typicalDrivingMinutes: 480,
    fastagTollPlazaCount: 7,
    averageTollChargeINR: 780,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 90,
    fuelConsumptionIndex: 1.05,
    approvedRestStops: [
      { name: 'Kurnool Bypass Highway Oasis', highwayKm: 285, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Kurnool Bypass Highway Oasis'
  },
  {
    corridorId: 'CORR-BLR-HYD',
    corridorName: 'BLR to HYD Express Corridor',
    sourceCityId: 'BLR',
    destinationCityId: 'HYD',
    officialHighwayNumber: 'NH44',
    totalDistanceKm: 570,
    typicalDrivingMinutes: 480,
    fastagTollPlazaCount: 7,
    averageTollChargeINR: 780,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 90,
    fuelConsumptionIndex: 1.05,
    approvedRestStops: [
      { name: 'Anantapur Food Plaza', highwayKm: 285, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Anantapur Food Plaza'
  },
  {
    corridorId: 'CORR-HYD-VGA',
    corridorName: 'HYD to VGA Express Corridor',
    sourceCityId: 'HYD',
    destinationCityId: 'VGA',
    officialHighwayNumber: 'NH65',
    totalDistanceKm: 275,
    typicalDrivingMinutes: 270,
    fastagTollPlazaCount: 4,
    averageTollChargeINR: 380,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 100,
    fuelConsumptionIndex: 1.0,
    approvedRestStops: [
      { name: 'Suryapet 7 Food Court', highwayKm: 137, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-VGA-HYD',
    corridorName: 'VGA to HYD Express Corridor',
    sourceCityId: 'VGA',
    destinationCityId: 'HYD',
    officialHighwayNumber: 'NH65',
    totalDistanceKm: 275,
    typicalDrivingMinutes: 270,
    fastagTollPlazaCount: 4,
    averageTollChargeINR: 380,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 100,
    fuelConsumptionIndex: 1.0,
    approvedRestStops: [
      { name: 'Narketpally Highway Nest', highwayKm: 137, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-HYD-VTZ',
    corridorName: 'HYD to VTZ Express Corridor',
    sourceCityId: 'HYD',
    destinationCityId: 'VTZ',
    officialHighwayNumber: 'NH16/NH65',
    totalDistanceKm: 620,
    typicalDrivingMinutes: 600,
    fastagTollPlazaCount: 8,
    averageTollChargeINR: 850,
    terrainClassification: 'COASTAL_HIGHWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.12,
    approvedRestStops: [
      { name: 'Rajahmundry River View', highwayKm: 310, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Rajahmundry River View'
  },
  {
    corridorId: 'CORR-VTZ-HYD',
    corridorName: 'VTZ to HYD Express Corridor',
    sourceCityId: 'VTZ',
    destinationCityId: 'HYD',
    officialHighwayNumber: 'NH16/NH65',
    totalDistanceKm: 620,
    typicalDrivingMinutes: 600,
    fastagTollPlazaCount: 8,
    averageTollChargeINR: 850,
    terrainClassification: 'COASTAL_HIGHWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.12,
    approvedRestStops: [
      { name: 'Eluru Bypass Food Hub', highwayKm: 310, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Eluru Bypass Food Hub'
  },
  {
    corridorId: 'CORR-BLR-MAA',
    corridorName: 'BLR to MAA Express Corridor',
    sourceCityId: 'BLR',
    destinationCityId: 'MAA',
    officialHighwayNumber: 'NH48',
    totalDistanceKm: 345,
    typicalDrivingMinutes: 330,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 460,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 100,
    fuelConsumptionIndex: 0.98,
    approvedRestStops: [
      { name: 'Vellore Golden Palms', highwayKm: 172, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-MAA-BLR',
    corridorName: 'MAA to BLR Express Corridor',
    sourceCityId: 'MAA',
    destinationCityId: 'BLR',
    officialHighwayNumber: 'NH48',
    totalDistanceKm: 345,
    typicalDrivingMinutes: 330,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 460,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 100,
    fuelConsumptionIndex: 0.98,
    approvedRestStops: [
      { name: 'Ranipet Saravana Bhavan', highwayKm: 172, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-BOM-PNQ',
    corridorName: 'BOM to PNQ Express Corridor',
    sourceCityId: 'BOM',
    destinationCityId: 'PNQ',
    officialHighwayNumber: 'Mumbai-Pune Expwy',
    totalDistanceKm: 150,
    typicalDrivingMinutes: 150,
    fastagTollPlazaCount: 2,
    averageTollChargeINR: 320,
    terrainClassification: 'GHAT_MOUNTAINOUS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 80,
    fuelConsumptionIndex: 1.25,
    approvedRestStops: [
      { name: 'Lonavala Food Mall', highwayKm: 75, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-PNQ-BOM',
    corridorName: 'PNQ to BOM Express Corridor',
    sourceCityId: 'PNQ',
    destinationCityId: 'BOM',
    officialHighwayNumber: 'Mumbai-Pune Expwy',
    totalDistanceKm: 150,
    typicalDrivingMinutes: 150,
    fastagTollPlazaCount: 2,
    averageTollChargeINR: 320,
    terrainClassification: 'GHAT_MOUNTAINOUS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 80,
    fuelConsumptionIndex: 1.25,
    approvedRestStops: [
      { name: 'Urse Toll Plaza Lounge', highwayKm: 75, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-BOM-GOI',
    corridorName: 'BOM to GOI Express Corridor',
    sourceCityId: 'BOM',
    destinationCityId: 'GOI',
    officialHighwayNumber: 'NH66',
    totalDistanceKm: 590,
    typicalDrivingMinutes: 660,
    fastagTollPlazaCount: 6,
    averageTollChargeINR: 680,
    terrainClassification: 'COASTAL_HIGHWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 75,
    fuelConsumptionIndex: 1.3,
    approvedRestStops: [
      { name: 'Chiplun Valley Rest', highwayKm: 295, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Chiplun Valley Rest'
  },
  {
    corridorId: 'CORR-GOI-BOM',
    corridorName: 'GOI to BOM Express Corridor',
    sourceCityId: 'GOI',
    destinationCityId: 'BOM',
    officialHighwayNumber: 'NH66',
    totalDistanceKm: 590,
    typicalDrivingMinutes: 660,
    fastagTollPlazaCount: 6,
    averageTollChargeINR: 680,
    terrainClassification: 'COASTAL_HIGHWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 75,
    fuelConsumptionIndex: 1.3,
    approvedRestStops: [
      { name: 'Khed Highway Hub', highwayKm: 295, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Khed Highway Hub'
  },
  {
    corridorId: 'CORR-PNQ-GOI',
    corridorName: 'PNQ to GOI Express Corridor',
    sourceCityId: 'PNQ',
    destinationCityId: 'GOI',
    officialHighwayNumber: 'NH48/NH748',
    totalDistanceKm: 450,
    typicalDrivingMinutes: 510,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 540,
    terrainClassification: 'GHAT_MOUNTAINOUS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 75,
    fuelConsumptionIndex: 1.28,
    approvedRestStops: [
      { name: 'Kolhapur Mahalaxmi Express Food', highwayKm: 225, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Kolhapur Mahalaxmi Express Food'
  },
  {
    corridorId: 'CORR-GOI-PNQ',
    corridorName: 'GOI to PNQ Express Corridor',
    sourceCityId: 'GOI',
    destinationCityId: 'PNQ',
    officialHighwayNumber: 'NH48/NH748',
    totalDistanceKm: 450,
    typicalDrivingMinutes: 510,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 540,
    terrainClassification: 'GHAT_MOUNTAINOUS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 75,
    fuelConsumptionIndex: 1.28,
    approvedRestStops: [
      { name: 'Belagavi Bypass Highway Haven', highwayKm: 225, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Belagavi Bypass Highway Haven'
  },
  {
    corridorId: 'CORR-BLR-COK',
    corridorName: 'BLR to COK Express Corridor',
    sourceCityId: 'BLR',
    destinationCityId: 'COK',
    officialHighwayNumber: 'NH544',
    totalDistanceKm: 540,
    typicalDrivingMinutes: 540,
    fastagTollPlazaCount: 6,
    averageTollChargeINR: 690,
    terrainClassification: 'GHAT_MOUNTAINOUS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 80,
    fuelConsumptionIndex: 1.22,
    approvedRestStops: [
      { name: 'Salem Highway King', highwayKm: 270, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Salem Highway King'
  },
  {
    corridorId: 'CORR-COK-BLR',
    corridorName: 'COK to BLR Express Corridor',
    sourceCityId: 'COK',
    destinationCityId: 'BLR',
    officialHighwayNumber: 'NH544',
    totalDistanceKm: 540,
    typicalDrivingMinutes: 540,
    fastagTollPlazaCount: 6,
    averageTollChargeINR: 690,
    terrainClassification: 'GHAT_MOUNTAINOUS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 80,
    fuelConsumptionIndex: 1.22,
    approvedRestStops: [
      { name: 'Palakkad Gateway Plaza', highwayKm: 270, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Palakkad Gateway Plaza'
  },
  {
    corridorId: 'CORR-BLR-CJB',
    corridorName: 'BLR to CJB Express Corridor',
    sourceCityId: 'BLR',
    destinationCityId: 'CJB',
    officialHighwayNumber: 'NH544',
    totalDistanceKm: 365,
    typicalDrivingMinutes: 360,
    fastagTollPlazaCount: 4,
    averageTollChargeINR: 490,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 90,
    fuelConsumptionIndex: 1.05,
    approvedRestStops: [
      { name: 'Thoppur Toll Plaza Rest', highwayKm: 182, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-CJB-BLR',
    corridorName: 'CJB to BLR Express Corridor',
    sourceCityId: 'CJB',
    destinationCityId: 'BLR',
    officialHighwayNumber: 'NH544',
    totalDistanceKm: 365,
    typicalDrivingMinutes: 360,
    fastagTollPlazaCount: 4,
    averageTollChargeINR: 490,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 90,
    fuelConsumptionIndex: 1.05,
    approvedRestStops: [
      { name: 'Dharmapuri Aasife Biryani Hub', highwayKm: 182, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-BLR-GOI',
    corridorName: 'BLR to GOI Express Corridor',
    sourceCityId: 'BLR',
    destinationCityId: 'GOI',
    officialHighwayNumber: 'NH48/NH67',
    totalDistanceKm: 560,
    typicalDrivingMinutes: 570,
    fastagTollPlazaCount: 6,
    averageTollChargeINR: 620,
    terrainClassification: 'GHAT_MOUNTAINOUS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 80,
    fuelConsumptionIndex: 1.25,
    approvedRestStops: [
      { name: 'Hubballi Bypass Grand', highwayKm: 280, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Hubballi Bypass Grand'
  },
  {
    corridorId: 'CORR-GOI-BLR',
    corridorName: 'GOI to BLR Express Corridor',
    sourceCityId: 'GOI',
    destinationCityId: 'BLR',
    officialHighwayNumber: 'NH48/NH67',
    totalDistanceKm: 560,
    typicalDrivingMinutes: 570,
    fastagTollPlazaCount: 6,
    averageTollChargeINR: 620,
    terrainClassification: 'GHAT_MOUNTAINOUS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 80,
    fuelConsumptionIndex: 1.25,
    approvedRestStops: [
      { name: 'Davangere Benne Dosa Hub', highwayKm: 280, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Davangere Benne Dosa Hub'
  },
  {
    corridorId: 'CORR-DEL-JAI',
    corridorName: 'DEL to JAI Express Corridor',
    sourceCityId: 'DEL',
    destinationCityId: 'JAI',
    officialHighwayNumber: 'NH48/NE4',
    totalDistanceKm: 280,
    typicalDrivingMinutes: 240,
    fastagTollPlazaCount: 4,
    averageTollChargeINR: 420,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 110,
    fuelConsumptionIndex: 0.95,
    approvedRestStops: [
      { name: 'Behror Highway King', highwayKm: 140, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-JAI-DEL',
    corridorName: 'JAI to DEL Express Corridor',
    sourceCityId: 'JAI',
    destinationCityId: 'DEL',
    officialHighwayNumber: 'NH48/NE4',
    totalDistanceKm: 280,
    typicalDrivingMinutes: 240,
    fastagTollPlazaCount: 4,
    averageTollChargeINR: 420,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 110,
    fuelConsumptionIndex: 0.95,
    approvedRestStops: [
      { name: 'Kotputli Mannat Dhaba', highwayKm: 140, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-AMD-BOM',
    corridorName: 'AMD to BOM Express Corridor',
    sourceCityId: 'AMD',
    destinationCityId: 'BOM',
    officialHighwayNumber: 'NH48',
    totalDistanceKm: 530,
    typicalDrivingMinutes: 510,
    fastagTollPlazaCount: 7,
    averageTollChargeINR: 720,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 95,
    fuelConsumptionIndex: 1.02,
    approvedRestStops: [
      { name: 'Valsad Express Food Court', highwayKm: 265, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Valsad Express Food Court'
  },
  {
    corridorId: 'CORR-BOM-AMD',
    corridorName: 'BOM to AMD Express Corridor',
    sourceCityId: 'BOM',
    destinationCityId: 'AMD',
    officialHighwayNumber: 'NH48',
    totalDistanceKm: 530,
    typicalDrivingMinutes: 510,
    fastagTollPlazaCount: 7,
    averageTollChargeINR: 720,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 95,
    fuelConsumptionIndex: 1.02,
    approvedRestStops: [
      { name: 'Ankleshwar Highway Park', highwayKm: 265, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Ankleshwar Highway Park'
  },
  {
    corridorId: 'CORR-DEL-LKO',
    corridorName: 'DEL to LKO Express Corridor',
    sourceCityId: 'DEL',
    destinationCityId: 'LKO',
    officialHighwayNumber: 'Agra-Lucknow Expwy',
    totalDistanceKm: 535,
    typicalDrivingMinutes: 450,
    fastagTollPlazaCount: 3,
    averageTollChargeINR: 650,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 100,
    fuelConsumptionIndex: 0.92,
    approvedRestStops: [
      { name: 'Firozabad Express Milestone', highwayKm: 267, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Firozabad Express Milestone'
  },
  {
    corridorId: 'CORR-LKO-DEL',
    corridorName: 'LKO to DEL Express Corridor',
    sourceCityId: 'LKO',
    destinationCityId: 'DEL',
    officialHighwayNumber: 'Agra-Lucknow Expwy',
    totalDistanceKm: 535,
    typicalDrivingMinutes: 450,
    fastagTollPlazaCount: 3,
    averageTollChargeINR: 650,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 100,
    fuelConsumptionIndex: 0.92,
    approvedRestStops: [
      { name: 'Kannauj Fragrance Food Center', highwayKm: 267, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Kannauj Fragrance Food Center'
  },
  {
    corridorId: 'CORR-MAA-MDU',
    corridorName: 'MAA to MDU Express Corridor',
    sourceCityId: 'MAA',
    destinationCityId: 'MDU',
    officialHighwayNumber: 'NH38',
    totalDistanceKm: 460,
    typicalDrivingMinutes: 450,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 580,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 90,
    fuelConsumptionIndex: 1.04,
    approvedRestStops: [
      { name: 'Tindivanam Highway Delight', highwayKm: 230, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Tindivanam Highway Delight'
  },
  {
    corridorId: 'CORR-MDU-MAA',
    corridorName: 'MDU to MAA Express Corridor',
    sourceCityId: 'MDU',
    destinationCityId: 'MAA',
    officialHighwayNumber: 'NH38',
    totalDistanceKm: 460,
    typicalDrivingMinutes: 450,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 580,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 90,
    fuelConsumptionIndex: 1.04,
    approvedRestStops: [
      { name: 'Villupuram Arya Bhavan', highwayKm: 230, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Villupuram Arya Bhavan'
  },
  {
    corridorId: 'CORR-HYD-TIR',
    corridorName: 'HYD to TIR Express Corridor',
    sourceCityId: 'HYD',
    destinationCityId: 'TIR',
    officialHighwayNumber: 'NH44/NH40',
    totalDistanceKm: 560,
    typicalDrivingMinutes: 570,
    fastagTollPlazaCount: 6,
    averageTollChargeINR: 690,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.08,
    approvedRestStops: [
      { name: 'Kadapa Bypass Highway Rest', highwayKm: 280, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Kadapa Bypass Highway Rest'
  },
  {
    corridorId: 'CORR-TIR-HYD',
    corridorName: 'TIR to HYD Express Corridor',
    sourceCityId: 'TIR',
    destinationCityId: 'HYD',
    officialHighwayNumber: 'NH44/NH40',
    totalDistanceKm: 560,
    typicalDrivingMinutes: 570,
    fastagTollPlazaCount: 6,
    averageTollChargeINR: 690,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.08,
    approvedRestStops: [
      { name: 'Nandyal Highway Grand', highwayKm: 280, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
    mandatoryDriverSwapPoint: 'Nandyal Highway Grand'
  },
  {
    corridorId: 'CORR-BLR-MYS',
    corridorName: 'BLR to MYS Express Corridor',
    sourceCityId: 'BLR',
    destinationCityId: 'MYS',
    officialHighwayNumber: 'Bengaluru-Mysuru Expwy',
    totalDistanceKm: 145,
    typicalDrivingMinutes: 110,
    fastagTollPlazaCount: 2,
    averageTollChargeINR: 330,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 100,
    fuelConsumptionIndex: 0.92,
    approvedRestStops: [
      { name: 'Maddur Tiffany Center', highwayKm: 72, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-MYS-BLR',
    corridorName: 'MYS to BLR Express Corridor',
    sourceCityId: 'MYS',
    destinationCityId: 'BLR',
    officialHighwayNumber: 'Bengaluru-Mysuru Expwy',
    totalDistanceKm: 145,
    typicalDrivingMinutes: 110,
    fastagTollPlazaCount: 2,
    averageTollChargeINR: 330,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 100,
    fuelConsumptionIndex: 0.92,
    approvedRestStops: [
      { name: 'Ramanagara Silk City Rest', highwayKm: 72, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-DEL-IXC',
    corridorName: 'DEL to IXC Express Corridor',
    sourceCityId: 'DEL',
    destinationCityId: 'IXC',
    officialHighwayNumber: 'NH44',
    totalDistanceKm: 245,
    typicalDrivingMinutes: 230,
    fastagTollPlazaCount: 3,
    averageTollChargeINR: 390,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 90,
    fuelConsumptionIndex: 0.95,
    approvedRestStops: [
      { name: 'Murthal Sukhdev Dhaba', highwayKm: 122, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-IXC-DEL',
    corridorName: 'IXC to DEL Express Corridor',
    sourceCityId: 'IXC',
    destinationCityId: 'DEL',
    officialHighwayNumber: 'NH44',
    totalDistanceKm: 245,
    typicalDrivingMinutes: 230,
    fastagTollPlazaCount: 3,
    averageTollChargeINR: 390,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 90,
    fuelConsumptionIndex: 0.95,
    approvedRestStops: [
      { name: 'Karnal Haveli Heritage', highwayKm: 122, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-HYD-WAR',
    corridorName: 'HYD to WAR Express Corridor',
    sourceCityId: 'HYD',
    destinationCityId: 'WAR',
    officialHighwayNumber: 'NH163',
    totalDistanceKm: 145,
    typicalDrivingMinutes: 150,
    fastagTollPlazaCount: 2,
    averageTollChargeINR: 190,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 90,
    fuelConsumptionIndex: 1.0,
    approvedRestStops: [
      { name: 'Aler Highway Food Stop', highwayKm: 72, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-WAR-HYD',
    corridorName: 'WAR to HYD Express Corridor',
    sourceCityId: 'WAR',
    destinationCityId: 'HYD',
    officialHighwayNumber: 'NH163',
    totalDistanceKm: 145,
    typicalDrivingMinutes: 150,
    fastagTollPlazaCount: 2,
    averageTollChargeINR: 190,
    terrainClassification: 'FLAT_EXPRESSWAY',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 90,
    fuelConsumptionIndex: 1.0,
    approvedRestStops: [
      { name: 'Bhongir Fort View Lounge', highwayKm: 72, amenities: ['Clean Washrooms', 'Hygienic Food Court', '24x7 Fuel Station', 'EV Fast Charging', 'First Aid Center'], latitude: 15.82, longitude: 78.03 }
    ],
  },
  {
    corridorId: 'CORR-HYD-NAG',
    corridorName: 'HYD to NAG Express Corridor',
    sourceCityId: 'HYD',
    destinationCityId: 'NAG',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'HYD-NAG Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'HYD-NAG Midway Oasis'
  },
  {
    corridorId: 'CORR-NAG-HYD',
    corridorName: 'NAG to HYD Express Corridor',
    sourceCityId: 'NAG',
    destinationCityId: 'HYD',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'NAG-HYD Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'NAG-HYD Midway Oasis'
  },
  {
    corridorId: 'CORR-HYD-PNQ',
    corridorName: 'HYD to PNQ Express Corridor',
    sourceCityId: 'HYD',
    destinationCityId: 'PNQ',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'HYD-PNQ Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'HYD-PNQ Midway Oasis'
  },
  {
    corridorId: 'CORR-PNQ-HYD',
    corridorName: 'PNQ to HYD Express Corridor',
    sourceCityId: 'PNQ',
    destinationCityId: 'HYD',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'PNQ-HYD Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'PNQ-HYD Midway Oasis'
  },
  {
    corridorId: 'CORR-BLR-TIR',
    corridorName: 'BLR to TIR Express Corridor',
    sourceCityId: 'BLR',
    destinationCityId: 'TIR',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'BLR-TIR Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'BLR-TIR Midway Oasis'
  },
  {
    corridorId: 'CORR-TIR-BLR',
    corridorName: 'TIR to BLR Express Corridor',
    sourceCityId: 'TIR',
    destinationCityId: 'BLR',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'TIR-BLR Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'TIR-BLR Midway Oasis'
  },
  {
    corridorId: 'CORR-MAA-TRZ',
    corridorName: 'MAA to TRZ Express Corridor',
    sourceCityId: 'MAA',
    destinationCityId: 'TRZ',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'MAA-TRZ Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'MAA-TRZ Midway Oasis'
  },
  {
    corridorId: 'CORR-TRZ-MAA',
    corridorName: 'TRZ to MAA Express Corridor',
    sourceCityId: 'TRZ',
    destinationCityId: 'MAA',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'TRZ-MAA Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'TRZ-MAA Midway Oasis'
  },
  {
    corridorId: 'CORR-AMD-ST',
    corridorName: 'AMD to ST Express Corridor',
    sourceCityId: 'AMD',
    destinationCityId: 'ST',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'AMD-ST Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'AMD-ST Midway Oasis'
  },
  {
    corridorId: 'CORR-ST-AMD',
    corridorName: 'ST to AMD Express Corridor',
    sourceCityId: 'ST',
    destinationCityId: 'AMD',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'ST-AMD Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'ST-AMD Midway Oasis'
  },
  {
    corridorId: 'CORR-DEL-ATQ',
    corridorName: 'DEL to ATQ Express Corridor',
    sourceCityId: 'DEL',
    destinationCityId: 'ATQ',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'DEL-ATQ Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'DEL-ATQ Midway Oasis'
  },
  {
    corridorId: 'CORR-ATQ-DEL',
    corridorName: 'ATQ to DEL Express Corridor',
    sourceCityId: 'ATQ',
    destinationCityId: 'DEL',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'ATQ-DEL Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'ATQ-DEL Midway Oasis'
  },
  {
    corridorId: 'CORR-DEL-VNS',
    corridorName: 'DEL to VNS Express Corridor',
    sourceCityId: 'DEL',
    destinationCityId: 'VNS',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'DEL-VNS Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'DEL-VNS Midway Oasis'
  },
  {
    corridorId: 'CORR-VNS-DEL',
    corridorName: 'VNS to DEL Express Corridor',
    sourceCityId: 'VNS',
    destinationCityId: 'DEL',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'VNS-DEL Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'VNS-DEL Midway Oasis'
  },
  {
    corridorId: 'CORR-JAI-UDR',
    corridorName: 'JAI to UDR Express Corridor',
    sourceCityId: 'JAI',
    destinationCityId: 'UDR',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'JAI-UDR Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'JAI-UDR Midway Oasis'
  },
  {
    corridorId: 'CORR-UDR-JAI',
    corridorName: 'UDR to JAI Express Corridor',
    sourceCityId: 'UDR',
    destinationCityId: 'JAI',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'UDR-JAI Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'UDR-JAI Midway Oasis'
  },
  {
    corridorId: 'CORR-BHO-IDR',
    corridorName: 'BHO to IDR Express Corridor',
    sourceCityId: 'BHO',
    destinationCityId: 'IDR',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'BHO-IDR Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'BHO-IDR Midway Oasis'
  },
  {
    corridorId: 'CORR-IDR-BHO',
    corridorName: 'IDR to BHO Express Corridor',
    sourceCityId: 'IDR',
    destinationCityId: 'BHO',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'IDR-BHO Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'IDR-BHO Midway Oasis'
  },
  {
    corridorId: 'CORR-CCU-BBI',
    corridorName: 'CCU to BBI Express Corridor',
    sourceCityId: 'CCU',
    destinationCityId: 'BBI',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'CCU-BBI Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'CCU-BBI Midway Oasis'
  },
  {
    corridorId: 'CORR-BBI-CCU',
    corridorName: 'BBI to CCU Express Corridor',
    sourceCityId: 'BBI',
    destinationCityId: 'CCU',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'BBI-CCU Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'BBI-CCU Midway Oasis'
  },
  {
    corridorId: 'CORR-PAT-VNS',
    corridorName: 'PAT to VNS Express Corridor',
    sourceCityId: 'PAT',
    destinationCityId: 'VNS',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'PAT-VNS Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'PAT-VNS Midway Oasis'
  },
  {
    corridorId: 'CORR-VNS-PAT',
    corridorName: 'VNS to PAT Express Corridor',
    sourceCityId: 'VNS',
    destinationCityId: 'PAT',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'VNS-PAT Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'VNS-PAT Midway Oasis'
  },
  {
    corridorId: 'CORR-RPR-NAG',
    corridorName: 'RPR to NAG Express Corridor',
    sourceCityId: 'RPR',
    destinationCityId: 'NAG',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'RPR-NAG Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'RPR-NAG Midway Oasis'
  },
  {
    corridorId: 'CORR-NAG-RPR',
    corridorName: 'NAG to RPR Express Corridor',
    sourceCityId: 'NAG',
    destinationCityId: 'RPR',
    officialHighwayNumber: 'NH-Express',
    totalDistanceKm: 420,
    typicalDrivingMinutes: 390,
    fastagTollPlazaCount: 5,
    averageTollChargeINR: 520,
    terrainClassification: 'ROLLING_PLAINS',
    hasSpeedGovernorZone: true,
    speedLimitKmph: 85,
    fuelConsumptionIndex: 1.06,
    approvedRestStops: [
      { name: 'NAG-RPR Midway Oasis', highwayKm: 210, amenities: ['24x7 Cafe', 'Resting Pods', 'Medical Clinic', 'Vehicle Inspection Bay'], latitude: 16.5, longitude: 79.5 }
    ],
    mandatoryDriverSwapPoint: 'NAG-RPR Midway Oasis'
  },
];

export function getCityTransitHub(cityId: string): CityTransitHub | undefined {
  return INDIAN_CITIES_REGISTRY[cityId.toUpperCase()];
}

export function getHighwayCorridor(sourceId: string, destId: string): HighwayCorridorDefinition | undefined {
  return ALL_HIGHWAY_CORRIDORS.find(c => c.sourceCityId === sourceId && c.destinationCityId === destId);
}

export function searchTransitStops(query: string): string[] {
  const q = query.toLowerCase();
  const results: string[] = [];
  Object.values(INDIAN_CITIES_REGISTRY).forEach(c => {
    if (c.cityName.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)) {
      results.push(`${c.cityName} (${c.state})`);
    }
    c.boardingPoints.forEach(bp => {
      if (bp.toLowerCase().includes(q)) results.push(`${bp}, ${c.cityName}`);
    });
  });
  return Array.from(new Set(results));
}
