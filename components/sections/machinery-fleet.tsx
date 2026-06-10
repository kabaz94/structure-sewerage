import Link from "next/link";
import { Truck, Wrench, Construction } from "lucide-react";

export function MachineryFleet() {
  const items = [
    {
      icon: Truck,
      title: "Heavy-Duty Tankers",
      description: "Industrial-grade liquid waste management.",
    },
    {
      icon: Wrench,
      title: "Jetters & Rodding",
      description: "High-velocity clearance systems for deep blockage.",
    },
    {
      icon: Construction,
      title: "Sewerage Specialized Tools",
      description: "Proprietary plumbing and structural equipment.",
    },
  ];

  return (
    <div className="bg-primary text-white rounded-xl p-10 flex flex-col justify-between relative overflow-hidden h-full">
      <div className="absolute -right-16 -bottom-16 opacity-10">
        <Construction className="w-[20rem] h-[20rem]" />
      </div>
      <div className="relative z-10">
        <h2 className="font-headline text-3xl font-bold mb-8">
          Our Machinery Fleet
        </h2>
        <div className="space-y-8">
          {items.map((item) => (
            <div key={item.title} className="flex items-start gap-5">
              <div className="bg-white/10 p-2 rounded-lg shrink-0">
                <item.icon className="w-5 h-5 text-tertiary-fixed" />
              </div>
              <div>
                <h4 className="font-bold text-xl font-headline">
                  {item.title}
                </h4>
                <p className="text-on-primary-container text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link
        href="/services"
        className="relative z-10 w-fit bg-tertiary-fixed text-on-tertiary-fixed px-10 py-4 rounded-lg font-headline font-bold text-sm mt-12 hover:brightness-110 transition-all"
      >
        Book Service
      </Link>
    </div>
  );
}
