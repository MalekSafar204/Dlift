import Image from "next/image";

type Crane = {
  title: string;
  description: string;
  specs: Record<string, string | undefined>; 
  image: string;
};

export default function CraneCard({ crane }: { crane: Crane }) {
  return (
    <div className="crane-card bg-white transition hover:-translate-y-2 hover:shadow-lg rounded-lg overflow-hidden">
      <Image
        src={crane.image}
        alt={crane.title}
        width={600}
        height={400}
        className="object-cover w-full h-80"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{crane.title}</h3>
        <p className="text-gray-600 mb-4">{crane.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(crane.specs).map(([key, value]) => (
            <div key={key}>
              <span className="font-semibold">{key}:</span>{" "}
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>
        <button
          className={`mt-4 w-full py-2 rounded-md text-white bg-gray-800 hover:bg-gray-900 transition cursor-pointer`}
        >
          Inquire Now
        </button>
      </div>
    </div>
  );
}
