import { CraneCategory } from "./types";

export const craneCategories: CraneCategory[] = [
  {
    id: "atc",
    title: "All-Terrain Cranes (ATC)",
    description:
      "Versatile cranes designed for both on-road and off-road operations with exceptional mobility and lifting capacity. Our fleet includes premium Liebherr and Demag models ranging from 65 to 500 tons.",
    image: "/ATC.jpg",
    cranes: [
      {
        name: "LTM 1120",
        capacity: "70 ton",
        year: "1991 & other years",
        manufacturer: "Liebherr",
      },
      {
        name: "LTM 1100",
        capacity: "65 ton",
        year: "1994",
        manufacturer: "Liebherr",
      },
      {
        name: "LTM 1300",
        capacity: "300 ton",
        year: "2002",
        manufacturer: "Liebherr",
      },
      {
        name: "LTM 1300/1",
        capacity: "300 ton",
        year: "2001",
        manufacturer: "Liebherr",
      },
      {
        name: "LTM 1500-8.1",
        capacity: "500 ton",
        year: "2002",
        manufacturer: "Liebherr",
      },
      {
        name: "AC 200-1",
        capacity: "250 ton",
        year: "2005",
        manufacturer: "Demag",
      },
      {
        name: "AC 100",
        capacity: "100 ton",
        year: "2007",
        manufacturer: "Demag",
      },
    ],
  },
  {
    id: "tc",
    title: "Truck Cranes (TC)",
    description:
      "Mobile cranes mounted on truck chassis for quick deployment and transportation between job sites. Featuring reliable XCMG and Iveco models for efficient project execution.",
    image: "/TC.jpg",
    cranes: [
      {
        name: "QY25K",
        capacity: "25 ton",
        year: "multiple years",
        manufacturer: "XCMG",
      },
      {
        name: "QY50B",
        capacity: "50 ton",
        year: "multiple years",
        manufacturer: "XCMG",
      },
      {
        name: "QY65K",
        capacity: "65 ton",
        year: "multiple years",
        manufacturer: "XCMG",
      },
      {
        name: "QY70K",
        capacity: "70 ton",
        year: "multiple years",
        manufacturer: "XCMG",
      },
      {
        name: "180 E 28",
        capacity: "Truck-mounted",
        year: "N/A",
        manufacturer: "Iveco",
      },
    ],
  },
  {
    id: "rtc",
    title: "Rough Terrain Cranes (RTC)",
    description:
      "Specialized cranes built for challenging off-road conditions with enhanced stability and mobility. Our Terex models provide reliable performance in the most demanding environments.",
    image: "/RTC.jpg",
    cranes: [
      {
        name: "RT 555",
        capacity: "30 ton",
        year: "2007",
        manufacturer: "Terex",
      },
      {
        name: "RT 555-1",
        capacity: "55 ton",
        year: "2007",
        manufacturer: "Terex",
      },
    ],
  },
  {
    id: "crawler",
    title: "Crawler Cranes",
    description:
      "Heavy-duty cranes with tracked undercarriages for maximum stability and lifting capacity on challenging terrain. From 50 to 320 tons, our crawler fleet handles the most complex lifting operations.",
    image: "/CRAWLER.jpg",
    cranes: [
      {
        name: "SCC1000",
        capacity: "100 ton",
        year: "2008",
        manufacturer: "Sany",
      },
      {
        name: "SCC500D",
        capacity: "50 ton",
        year: "2007",
        manufacturer: "Sany",
      },
      {
        name: "SCC3200",
        capacity: "320 ton",
        year: "2008",
        manufacturer: "Sany",
      },
      {
        name: "QUY70",
        capacity: "70 ton",
        year: "2007, 2003",
        manufacturer: "Zoomlion",
      },
      {
        name: "SCX2500",
        capacity: "250 ton",
        year: "2005",
        manufacturer: "Hitachi Sumitomo",
      },
      {
        name: "LR 1280",
        capacity: "200 ton",
        year: "1993",
        manufacturer: "Liebherr",
      },
      {
        name: "HS843HD",
        capacity: "100 ton",
        year: "2003",
        manufacturer: "Liebherr",
      },
      {
        name: "6100",
        capacity: "100 ton",
        year: "1999",
        manufacturer: "Sennebogen",
      },
      {
        name: "CH135",
        capacity: "135 ton",
        year: "N/A",
        manufacturer: "Ruston Bucyrus",
      },
      { name: "CCH", capacity: "120 ton", year: "1991", manufacturer: "IHI" },
      {
        name: "LS 248 H",
        capacity: "100 ton",
        year: "1987",
        manufacturer: "Link-Belt",
      },
      { name: "MC136", capacity: "55 ton", year: "1990", manufacturer: "Hyco" },
    ],
  },
  {
    id: "special",
    title: "Mobile Harbour & Special Equipment",
    description:
      "Specialized equipment including mobile harbour cranes and versatile lifting solutions for unique applications. Our Grove models provide exceptional performance in specialized environments.",
    image: "/MOBILE.jpg",
    cranes: [
      {
        name: "GMK 5130",
        capacity: "130 ton",
        year: "1998",
        manufacturer: "Grove",
      },
      {
        name: "GMK 5100",
        capacity: "100 ton",
        year: "2003",
        manufacturer: "Grove",
      },
      {
        name: "GMK 3050",
        capacity: "50 ton",
        year: "1999, 2000",
        manufacturer: "Grove",
      },
    ],
  },
  {
    id: "equipment",
    title: "Supporting Equipment",
    description:
      "Essential support equipment including trailers, manlifts, and tractors to complete your project requirements. Complete solutions for comprehensive project support.",
    image: "/SUPPORT.jpg",
    cranes: [
      {
        name: "Lowbed Trailers",
        capacity: "Various capacities",
        year: "Multiple years",
        manufacturer: "Scheuerle, Welte",
      },
      {
        name: "DAF 2100",
        capacity: "Manlift",
        year: "N/A",
        manufacturer: "DAF",
      },
      {
        name: "Mercedes",
        capacity: "Tractor",
        year: "N/A",
        manufacturer: "Mercedes",
      },
    ],
  },
];
