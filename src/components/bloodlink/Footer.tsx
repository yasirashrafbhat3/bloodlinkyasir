import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { NAV_LINKS } from "./Navbar";
import { Logo } from "./shared";

const awarenessLinks = [
  { href: "#awareness", label: "Who can donate?" },
  { href: "#awareness", label: "Donation process" },
  { href: "#awareness", label: "Myths & facts" },
  { href: "#urgent-requests", label: "Urgent requirements" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-10 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo inverted />
            <p className="mt-4 font-serif text-2xl italic text-ink-foreground/90">Every Drop Connects a Life.</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-foreground/55">
              A hackathon prototype exploring how voluntary blood donation can be easier to discover. All listings are
              demonstration data.
            </p>
            <div className="mt-6 flex gap-2">
              {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#home"
                  aria-label="Social media placeholder"
                  className="grid size-10 place-items-center rounded-full border border-ink-foreground/15 text-ink-foreground/70 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <nav aria-label="Quick links">
            <p className="text-sm font-bold">Quick links</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-ink-foreground/60 transition-colors hover:text-ink-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Awareness links">
            <p className="text-sm font-bold">Awareness</p>
            <ul className="mt-4 space-y-2.5">
              {awarenessLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-ink-foreground/60 transition-colors hover:text-ink-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-sm font-bold">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-ink-foreground/60">
              <li className="flex items-center gap-2.5"><Mail className="size-4 text-primary-glow" /> hello@bloodlink.example</li>
              <li className="flex items-center gap-2.5"><Phone className="size-4 text-primary-glow" /> +91 00000 00000</li>
              <li className="flex items-center gap-2.5"><MapPin className="size-4 text-primary-glow" /> India (placeholder address)</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-ink-foreground/10 pt-6 text-xs text-ink-foreground/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} BloodLink. Prototype for demonstration purposes.</p>
          <p>Not a medical service. In an emergency, contact your nearest hospital.</p>
        </div>
      </div>
    </footer>
  );
}
