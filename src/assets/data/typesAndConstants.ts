export type AvailableArea =
  | "gb"
  | "greenwich"
  | "lewisham"
  | "southwark"
  | "towerHamlets";

export type AvailableYear =
  | "2000"
  | "2001"
  | "2002"
  | "2003"
  | "2004"
  | "2005"
  | "2006"
  | "2007"
  | "2008"
  | "2009"
  | "2010"
  | "2011"
  | "2012"
  | "2013"
  | "2014"
  | "2015"
  | "2016"
  | "2017"
  | "2018"
  | "2019"
  | "2020"
  | "2021"
  | "2022";

export type AvailableVehicle =
  | "Pedal_cycles"
  | "Two_wheeled_motor_vehicles"
  | "Cars_and_taxis"
  | "Buses_and_coaches"
  | "LGVs"
  | "All_HGVs"
  | "All_motor_vehicles";

export type SelectorOptionValue =
  | AvailableArea
  | AvailableVehicle
  | AvailableYear;

export type Areas = Array<{ value: AvailableArea; label: string }>;

export type Years = Array<AvailableYear>;

export type Vehicles = Array<{ value: AvailableVehicle; label: string }>;

export const AREAS: Areas = [
  { value: "greenwich", label: "Greenwich" },
  { value: "lewisham", label: "Lewisham" },
  { value: "southwark", label: "Southwark" },
  { value: "towerHamlets", label: "Tower Hamlets" },
];

export const YEARS: Years = [
  "2000",
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
];

export const VEHICLES: Vehicles = [
  { value: "Pedal_cycles", label: "Pedal Cycles" },
  { value: "Two_wheeled_motor_vehicles", label: "Two wheeled Motor Vehicles" },
  { value: "Cars_and_taxis", label: "Cars and Taxis" },
  { value: "Buses_and_coaches", label: "Buses and Coaches" },
  { value: "LGVs", label: "LGVs" },
  { value: "All_HGVs", label: "All HGVs" },
  { value: "All_motor_vehicles", label: "All Motor Vehicles" },
];

type MapDataFileType = "geoJson" | "topoJson";

type MapData = {
  [k in AvailableArea]: {
    label: string;
    mapDataFile: string;
    mapDataFileType: MapDataFileType;
    objectName: string;
    center: [number, number];
    scale: number;
  };
};

type TrafficData = {
  [k in AvailableArea]: {
    trafficDataFile: string;
  };
};

export const TOPO_MAP_DATA: MapData = {
  gb: {
    label: "GB",
    mapDataFile: "./data/geoJson/gb/lad.json",
    mapDataFileType: "geoJson",
    objectName: "", // only for topoJson
    center: [-2.244644, 55.7], // Manchester longitude
    scale: 1700,
  },
  greenwich: {
    label: "Greenwich",
    mapDataFile: "./data/topoJson/london/greenwich/topo_E09000011.json",
    mapDataFileType: "topoJson",
    objectName: "E09000011",
    center: [0.08, 51.478],
    scale: 170000,
  },
  lewisham: {
    label: "Lewisham",
    mapDataFile: "./data/topoJson/london/lewisham/topo_E09000023.json",
    mapDataFileType: "topoJson",
    objectName: "E09000023",
    center: [-0.021, 51.45],
    scale: 170000,
  },
  southwark: {
    label: "Southwark",
    mapDataFile: "./data/topoJson/london/southwark/topo_E09000028.json",
    mapDataFileType: "topoJson",
    objectName: "E09000028",
    center: [-0.08, 51.47],
    scale: 170000,
  },
  towerHamlets: {
    label: "Tower Hamlets",
    mapDataFile: "./data/topoJson/london/tower_hamlets/topo_E09000030.json",
    mapDataFileType: "topoJson",
    objectName: "E09000030",
    center: [-0.03, 51.515],
    scale: 170000,
  },
};

export const TRAFFIC_DATA: TrafficData = {
  gb: {
    trafficDataFile: "./data/csv/dft_traffic_counts_aadf_by_direction.csv",
  },
  greenwich: {
    trafficDataFile: "./data/csv/greenwich.csv",
  },
  lewisham: {
    trafficDataFile: "./data/csv/lewisham.csv",
  },
  southwark: {
    trafficDataFile: "./data/csv/southwark.csv",
  },
  towerHamlets: {
    trafficDataFile: "./data/csv/tower_hamlets.csv",
  },
};
