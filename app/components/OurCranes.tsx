import CraneCard from "./CraneCard";

const cranes = [
  {
    title: "Tower Crane",
    description: "Ideal for constructing tall buildings, tower cranes offer impressive height and lifting capacity, making them essential for urban construction projects.",
    specs: { "Max Lift": "18,000 kg", Reach: "70 m", Height: "80 m" },
    image: "/towerCrane.jpg",
  },
  {
    title: "Crawler Crane",
    description: "Equipped with tracks for stability and mobility on rough terrain, crawler cranes are perfect for heavy lifting on large construction sites.",
    specs: {
      "Max Lift": "350,000 kg",
      "Boom Length": "120 m",
      Features: "Track mounted",
    },
    image: "/crawlerCrane.jpg",
  },
  {
    title: "Truck Mounted Crane",
    description: "Mounted on a truck chassis, these cranes combine mobility and lifting power, making them suitable for quick setup and transport between job sites.",
    specs: {
      "Max Lift": "50,000 kg",
      "Boom Length": "45 m",
      Speed: "Road legal",
    },
    image: "/truckCrane.jpg",
  },
];

export default function OurCranes() {
  return (
    <section id="cranes" className="py-16 px-4 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Our Crane Fleet
        </h2>
        <p className="text-center mb-12 text-gray-600">
          We offer a diverse range of cranes suitable for any lifting
          requirement.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cranes.map((c) => (
            <CraneCard key={c.title} crane={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
