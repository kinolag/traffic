export type AvailableArea =
  | "gb"
  | "brighton"
  | "bristol"
  | "camden"
  | "cityOfLondon"
  | "cityOfWestminster"
  | "greenwich"
  | "hackney"
  | "hammersmithAndFulham"
  | "islington"
  | "kensingtonAndChelsea"
  | "lambeth"
  | "lewisham"
  | "southwark"
  | "towerHamlets"
  | "wandsworth";

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

/* these labels (to display in select menu) may differ from TOPO_MAP_DATA ones */
export const AREAS: Areas = [
  // { value: "brighton", label: "Brighton" },
  // { value: "bristol", label: "Bristol" },
  { value: "camden", label: "Camden" },
  { value: "cityOfLondon", label: "City of London" },
  { value: "cityOfWestminster", label: "City of Westminster" },
  { value: "greenwich", label: "Greenwich" },
  { value: "hackney", label: "Hackney" },
  { value: "hammersmithAndFulham", label: "Hammersmith" },
  { value: "islington", label: "Islington" },
  { value: "kensingtonAndChelsea", label: "Kensington" },
  { value: "lambeth", label: "Lambeth" },
  { value: "lewisham", label: "Lewisham" },
  { value: "southwark", label: "Southwark" },
  { value: "towerHamlets", label: "Tower Hamlets" },
  { value: "wandsworth", label: "Wandsworth" },
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
  brighton: {
    label: "Brighton",
    mapDataFile: "./data/topoJson/brighton/topo_E06000043.json",
    mapDataFileType: "topoJson",
    objectName: "E06000043",
    center: [-0.105, 50.84],
    scale: 125000,
  },
  bristol: {
    label: "Bristol",
    mapDataFile: "./data/topoJson/bristol/topo_E06000023.json",
    mapDataFileType: "topoJson",
    objectName: "E06000023",
    center: [-2.6, 51.485],
    scale: 125000,
  },
  /* Inner London */
  camden: {
    label: "Camden",
    mapDataFile: "./data/topoJson/london/camden/topo_E09000007.json",
    mapDataFileType: "topoJson",
    objectName: "E09000007",
    center: [-0.16, 51.54],
    scale: 170000,
  },
  cityOfLondon: {
    label: "City of London",
    mapDataFile: "./data/topoJson/london/cityOfLondon/topo_E09000001.json",
    mapDataFileType: "topoJson",
    objectName: "E09000001",
    center: [-0.13, 51.51],
    scale: 170000,
  },
  cityOfWestminster: {
    label: "City of Westminster",
    mapDataFile: "./data/topoJson/london/cityOfWestminster/topo_E09000033.json",
    mapDataFileType: "topoJson",
    objectName: "E09000033",
    center: [-0.14, 51.51],
    scale: 170000,
  },
  greenwich: {
    label: "Greenwich",
    mapDataFile: "./data/topoJson/london/greenwich/topo_E09000011.json",
    mapDataFileType: "topoJson",
    objectName: "E09000011",
    center: [0.08, 51.478],
    scale: 170000,
  },
  hackney: {
    label: "Hackney",
    mapDataFile: "./data/topoJson/london/hackney/topo_E09000012.json",
    mapDataFileType: "topoJson",
    objectName: "E09000012",
    center: [-0.065, 51.55],
    scale: 170000,
  },
  hammersmithAndFulham: {
    label: "Hammersmith and Fulham",
    mapDataFile:
      "./data/topoJson/london/hammersmithAndFulham/topo_E09000013.json",
    mapDataFileType: "topoJson",
    objectName: "E09000013",
    center: [-0.21, 51.5],
    scale: 170000,
  },
  islington: {
    label: "Islington",
    mapDataFile: "./data/topoJson/london/islington/topo_E09000019.json",
    mapDataFileType: "topoJson",
    objectName: "E09000019",
    center: [-0.11, 51.54],
    scale: 170000,
  },
  kensingtonAndChelsea: {
    label: "Kensington and Chelsea",
    mapDataFile:
      "./data/topoJson/london/kensingtonAndChelsea/topo_E09000020.json",
    mapDataFileType: "topoJson",
    objectName: "E09000020",
    center: [-0.195, 51.498],
    scale: 170000,
  },
  lambeth: {
    label: "Lambeth",
    mapDataFile: "./data/topoJson/london/lambeth/topo_E09000022.json",
    mapDataFileType: "topoJson",
    objectName: "E09000022",
    center: [-0.113, 51.46],
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
  wandsworth: {
    label: "Wandsworth",
    mapDataFile: "./data/topoJson/london/wandsworth/topo_E09000032.json",
    mapDataFileType: "topoJson",
    objectName: "E09000032",
    center: [-0.189, 51.458],
    scale: 170000,
  },
};

export const TRAFFIC_DATA: TrafficData = {
  gb: {
    trafficDataFile: "./data/csv/dft_traffic_counts_aadf_by_direction.csv",
  },
  brighton: {
    trafficDataFile: "./data/csv/brighton.csv",
  },
  bristol: {
    trafficDataFile: "./data/csv/bristol.csv",
  },
  /* Inner London */
  camden: {
    trafficDataFile: "./data/csv/camden.csv",
  },
  cityOfLondon: {
    trafficDataFile: "./data/csv/cityOfLondon.csv",
  },
  cityOfWestminster: {
    trafficDataFile: "./data/csv/cityOfWestminster.csv",
  },
  greenwich: {
    trafficDataFile: "./data/csv/greenwich.csv",
  },
  hackney: {
    trafficDataFile: "./data/csv/hackney.csv",
  },
  hammersmithAndFulham: {
    trafficDataFile: "./data/csv/hammersmithAndFulham.csv",
  },
  islington: {
    trafficDataFile: "./data/csv/islington.csv",
  },
  kensingtonAndChelsea: {
    trafficDataFile: "./data/csv/kensingtonAndChelsea.csv",
  },
  lambeth: {
    trafficDataFile: "./data/csv/lambeth.csv",
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
  wandsworth: {
    trafficDataFile: "./data/csv/wandsworth.csv",
  },
};

/* UI */

export const GREYS = ["#ccc", "#bbb", "#aaa", "#888", "#555", "#333", "#111"];

export const GREENS = [
  // "#00ff00",
  // "#00e500",
  // "#00cc00",
  "#00b200",
  "#009900",
  "#007f00",
  "#006600",
  "#004c00",
  "#003300",
  "#001900",
  // "#000000",
];
