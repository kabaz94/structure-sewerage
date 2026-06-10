import { Siren, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function EmergencyCard() {
  return (
    <div className="bg-error-container/20 rounded-xl p-10 border border-error/10 flex flex-col justify-between h-full">
      <div>
        <div className="bg-error text-white w-12 h-12 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-error/20">
          <Siren className="w-6 h-6" />
        </div>
        <h2 className="font-headline text-3xl font-bold text-primary mb-4">
          Emergency Works
        </h2>
        <p className="text-on-surface-variant mb-8">
          24/7 rapid response for critical infrastructure failures.
        </p>
        <ul className="space-y-5 mb-10">
          <li className="flex items-center gap-3 text-primary font-semibold">
            <CheckCircle2 className="w-6 h-6 text-error shrink-0" />
            Pipe Breakage / Leakage
          </li>
          <li className="flex items-center gap-3 text-primary font-semibold">
            <CheckCircle2 className="w-6 h-6 text-error shrink-0" />
            Fallen Trees Clearance
          </li>
          <li className="flex items-center gap-3 text-primary font-semibold">
            <CheckCircle2 className="w-6 h-6 text-error shrink-0" />
            Clogged Pipes / Toilets
          </li>
        </ul>
      </div>
      <Link
        href="/contact"
        className="w-full bg-error text-white py-4 rounded-lg font-headline font-black text-sm uppercase tracking-widest hover:brightness-90 transition-all text-center block"
      >
        Emergency Dispatch
      </Link>
    </div>
  );
}
