import { CraneCategory } from "@/constants/types"; 

export const craneCategories: CraneCategory[] = [
  {
    id: "atc",
    title: "All-Terrain Cranes (ATC)",
    href: "atc",
    description:
      "Versatile cranes designed for both on-road and off-road operations with exceptional mobility and lifting capacity. Our fleet includes premium Liebherr and Demag models ranging from 65 to 500 tons.",
    image: "/ATC.jpg",
    cranes: [
      {
        id: "atc-ltm-1120",
        name: "LTM 1120",
        capacity: "70 ton",
        year: "1991 & other years",
        manufacturer: "Liebherr",
        image: "/atc/LTM-1120.jpg",
        description:
          "A versatile all-terrain crane ideal for heavy lifting in construction and industrial projects, known for its reliability and reach.",
      },
      {
        id: "atc-ltm-1100",
        name: "LTM 1100",
        capacity: "65 ton",
        year: "1994",
        manufacturer: "Liebherr",
        image: "/atc/LTM-1100.jpg",
        description:
          "Compact and powerful, this crane is suited for urban and confined job sites requiring efficient lifting solutions.",
      },
      {
        id: "atc-ltm-1300",
        name: "LTM 1300",
        capacity: "300 ton",
        year: "2002",
        manufacturer: "Liebherr",
        image: "/atc/LTM-1300.jpg",
        description:
          "High-capacity crane designed for demanding lifts in infrastructure and energy sectors, offering advanced technology and safety.",
      },
      {
        id: "atc-ltm-1300-1",
        name: "LTM 1300/1",
        capacity: "300 ton",
        year: "2001",
        manufacturer: "Liebherr",
        image: "/atc/LTM-1300-1.jpg",
        description:
          "Engineered for versatility and strength, suitable for large-scale construction and industrial lifting tasks.",
      },
      {
        id: "atc-ltm-1500-8-1",
        name: "LTM 1500-8.1",
        capacity: "500 ton",
        year: "2002",
        manufacturer: "Liebherr",
        image: "/atc/LTM-1500-8.1.jpg",
        description:
          "One of the most powerful mobile cranes, perfect for heavy-duty lifting in wind energy, bridge, and plant construction.",
      },
      {
        id: "atc-ac-200-1",
        name: "AC 200-1",
        capacity: "250 ton",
        year: "2005",
        manufacturer: "Demag",
        image: "/atc/AC-200-1.jpg",
        description:
          "Efficient and robust, this Demag crane is ideal for large construction projects and industrial applications.",
      },
      {
        id: "atc-ac-100",
        name: "AC 100",
        capacity: "100 ton",
        year: "2007",
        manufacturer: "Demag",
        image: "/atc/AC-100.jpg",
        description:
          "A reliable all-terrain crane, well-suited for medium to heavy lifting in a variety of environments.",
      },
    ],
  },
  {
    id: "tc",
    title: "Truck Cranes (TC)",
    href: "tc",
    description:
      "Mobile cranes mounted on truck chassis for quick deployment and transportation between job sites. Featuring reliable XCMG and Iveco models for efficient project execution.",
    image: "/TC.jpg",
    cranes: [
      {
        id: "tc-qy25k",
        name: "QY25K",
        capacity: "25 ton",
        year: "multiple years",
        manufacturer: "XCMG",
        image: "/tc/QY25K.webp",
        description:
          "A reliable truck crane for light to medium lifting, ideal for quick deployment and urban construction sites.",
      },
      {
        id: "tc-qy50b",
        name: "QY50B",
        capacity: "50 ton",
        year: "multiple years",
        manufacturer: "XCMG",
        image: "/tc/QY50B.jpg",
        description:
          "Versatile and efficient, this model is suited for a range of lifting tasks in construction and logistics.",
      },
      {
        id: "tc-qy65k",
        name: "QY65K",
        capacity: "65 ton",
        year: "multiple years",
        manufacturer: "XCMG",
        image: "/tc/QY65K.jpg",
        description:
          "Designed for higher capacity lifts, this crane is perfect for infrastructure and industrial projects.",
      },
      {
        id: "tc-qy70k",
        name: "QY70K",
        capacity: "70 ton",
        year: "multiple years",
        manufacturer: "XCMG",
        image: "/tc/QY70K.jpg",
        description:
          "A robust truck crane for heavy lifting, suitable for demanding construction and industrial environments.",
      },
      {
        id: "tc-180-e-28",
        name: "180 E 28",
        capacity: "Truck-mounted",
        year: "N/A",
        manufacturer: "Iveco",
        image: "/tc/180-E-28.jpg",
        description:
          "A flexible truck-mounted crane, ideal for transport and lifting tasks in various site conditions.",
      },
    ],
  },
  {
    id: "rtc",
    title: "Rough Terrain Cranes (RTC)",
    href: "rtc",
    description:
      "Specialized cranes built for challenging off-road conditions with enhanced stability and mobility. Our Terex models provide reliable performance in the most demanding environments.",
    image: "/RTC2.jpg",
    cranes: [
      {
        id: "rtc-rt-555",
        name: "RT 555",
        capacity: "30 ton",
        year: "2007",
        manufacturer: "Terex",
        image: "/rtc/RT-555.jpg",
        description:
          "Rough terrain crane designed for off-road performance and reliable lifting in challenging environments.",
      },
      {
        id: "rtc-rt-555-1",
        name: "RT 555-1",
        capacity: "55 ton",
        year: "2007",
        manufacturer: "Terex",
        image: "/rtc/RT-555-1.jpg",
        description:
          "Enhanced capacity and reach, this model is perfect for heavy-duty lifting on rough terrain.",
      },
    ],
  },
  {
    id: "crawler",
    title: "Crawler Cranes",
    href: "crawler",
    description:
      "Heavy-duty cranes with tracked undercarriages for maximum stability and lifting capacity on challenging terrain. From 50 to 320 tons, our crawler fleet handles the most complex lifting operations.",
    image: "/crawler/crawler.jpg",
    cranes: [
      {
        id: "crawler-scc1000",
        name: "SCC1000",
        capacity: "100 ton",
        year: "2008",
        manufacturer: "Sany",
        image: "/crawler/SCC1000.jpg",
        description:
          "Crawler crane with high lifting capacity, ideal for large-scale construction and infrastructure projects.",
      },
      {
        id: "crawler-scc500d",
        name: "SCC500D",
        capacity: "50 ton",
        year: "2007",
        manufacturer: "Sany",
        image: "/crawler/SCC500D.jpg",
        description:
          "Efficient crawler crane for medium lifting tasks, suitable for construction and industrial use.",
      },
      {
        id: "crawler-scc3200",
        name: "SCC3200",
        capacity: "320 ton",
        year: "2008",
        manufacturer: "Sany",
        image: "/crawler/SCC3200.webp",
        description:
          "Heavy-duty crawler crane for the most demanding lifting operations in energy and infrastructure sectors.",
      },
      {
        id: "crawler-quy70",
        name: "QUY70",
        capacity: "70 ton",
        year: "2007, 2003",
        manufacturer: "Zoomlion",
        image: "/crawler/QUY70.webp",
        description:
          "Reliable crawler crane for medium to heavy lifting, suitable for construction and industrial projects.",
      },
      {
        id: "crawler-scx2500",
        name: "SCX2500",
        capacity: "250 ton",
        year: "2005",
        manufacturer: "Hitachi Sumitomo",
        image: "/crawler/SCX2500.jpg",
        description:
          "High-capacity crawler crane, perfect for infrastructure, energy, and large-scale construction projects.",
      },
      {
        id: "crawler-lr-1280",
        name: "LR 1280",
        capacity: "200 ton",
        year: "1993",
        manufacturer: "Liebherr",
        image: "/crawler/LR-1280.jpeg",
        description:
          "Versatile crawler crane for heavy lifting, known for its stability and performance on challenging terrain.",
      },
      {
        id: "crawler-hs843hd",
        name: "HS843HD",
        capacity: "100 ton",
        year: "2003",
        manufacturer: "Liebherr",
        image: "/crawler/HS843HD.jpg",
        description:
          "Heavy-duty crawler crane, ideal for foundation work and large construction projects.",
      },
      {
        id: "crawler-6100",
        name: "6100",
        capacity: "100 ton",
        year: "1999",
        manufacturer: "Sennebogen",
        image: "/crawler/6100.jpg",
        description:
          "Reliable crawler crane for a variety of lifting tasks in construction and industry.",
      },
      {
        id: "crawler-ch135",
        name: "CH135",
        capacity: "135 ton",
        year: "N/A",
        manufacturer: "Ruston Bucyrus",
        image: "/crawler/CH135.jpg",
        description:
          "Specialized crawler crane for heavy lifting, suitable for unique and challenging project requirements.",
      },
      {
        id: "crawler-cch",
        name: "CCH",
        capacity: "120 ton",
        year: "1991",
        manufacturer: "IHI",
        image: "/crawler/CCH.jpg",
        description:
          "Efficient crawler crane for medium to heavy lifting, ideal for construction and industrial use.",
      },
      {
        id: "crawler-ls-248-h",
        name: "LS 248 H",
        capacity: "100 ton",
        year: "1987",
        manufacturer: "Link-Belt",
        image: "/crawler/LS-248-H.jpg",
        description:
          "Classic crawler crane, known for its durability and reliability in various lifting operations.",
      },
      {
        id: "crawler-mc136",
        name: "MC136",
        capacity: "55 ton",
        year: "1990",
        manufacturer: "Hyco",
        image: "/crawler/MC136.jpg",
        description:
          "Compact crawler crane, perfect for smaller sites and lighter lifting requirements.",
      },
    ],
  },
  {
    id: "special",
    title: "Mobile Harbour & Special Equipment",
    href: "special",
    description:
      "Specialized equipment including mobile harbour cranes and versatile lifting solutions for unique applications. Our Grove models provide exceptional performance in specialized environments.",
    image: "/MOBILE.jpg",
    cranes: [
      {
        id: "special-gmk-5130",
        name: "GMK 5130",
        capacity: "130 ton",
        year: "1998",
        manufacturer: "Grove",
        image: "/special/GMK-5130.jpg",
        description:
          "Mobile harbour crane designed for heavy lifting in ports and special applications.",
      },
      {
        id: "special-gmk-5100",
        name: "GMK 5100",
        capacity: "100 ton",
        year: "2003",
        manufacturer: "Grove",
        image: "/special/GMK-5100.jpg",
        description:
          "Versatile mobile crane for a range of lifting tasks in specialized environments.",
      },
      {
        id: "special-gmk-3050",
        name: "GMK 3050",
        capacity: "50 ton",
        year: "1999, 2000",
        manufacturer: "Grove",
        image: "/special/GMK-3050.jpg",
        description:
          "Compact mobile crane, ideal for lighter lifting and maneuverability in tight spaces.",
      },
    ],
  },
  {
    id: "equipment",
    title: "Transportation and Supporting Equipment",
    href: "support",
    description:
      "Essential transport and support equipment including trailers, manlifts, and tractors to complete your project requirements. Complete solutions for comprehensive project support.",
    image: "/SUPPORT.jpg",
    cranes: [
      {
        id: "support-lowbed-trailers",
        name: "Lowbed Trailers",
        capacity: "Various capacities",
        year: "Multiple years",
        manufacturer: "Scheuerle, Welte",
        image: "/support/Lowbed-Trailers.jpg",
        description:
          "Essential for transporting heavy equipment and cranes to and from job sites, ensuring safe and efficient logistics.",
      },
      {
        id: "support-daf-2100",
        name: "DAF 2100",
        capacity: "Manlift",
        year: "N/A",
        manufacturer: "DAF",
        image: "/support/DAF-2100.jpg",
        description:
          "Reliable manlift for safe access to elevated work areas, supporting a variety of maintenance and installation tasks.",
      },
      {
        id: "support-mercedes",
        name: "Mercedes",
        capacity: "Tractor",
        year: "N/A",
        manufacturer: "Mercedes",
        image: "/support/Mercedes.jpeg",
        description:
          "Powerful tractor unit for hauling trailers and heavy loads, ensuring efficient site logistics.",
      },
    ],
  },
];
