import { useEffect, useState } from "react";
import { Menu, LogIn } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DemoBadge, Logo } from "./shared";

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#find-donors", label: "Find Donors" },
  { href: "#blood-banks", label: "Blood Banks" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#awareness", label: "Awareness" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV_LINKS.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border/70 bg-background/80 shadow-soft backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 shadow-soft backdrop-blur lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active === l.href ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" onClick={() => setLoginOpen(true)}>
            Login
          </Button>
          <Button variant="hero" asChild>
            <a href="#become-donor">Become a Donor</a>
          </Button>
        </div>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="surface" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <ul className="mt-6 flex flex-col gap-1 px-4">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      active === l.href ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-muted",
                    )}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-2 px-4">
              <Button
                variant="surface"
                size="lg"
                onClick={() => {
                  setMenuOpen(false);
                  setLoginOpen(true);
                }}
              >
                Login
              </Button>
              <Button variant="hero" size="lg" asChild>
                <a href="#become-donor" onClick={() => setMenuOpen(false)}>
                  Become a Donor
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>

      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DemoBadge className="w-fit">Prototype login</DemoBadge>
            <DialogTitle className="pt-2 text-2xl font-extrabold">Welcome back</DialogTitle>
            <DialogDescription>Accounts aren't active in this prototype. Nothing you type here is stored.</DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoginOpen(false);
              toast.success("Demo login complete", { description: "This prototype doesn't create real accounts." });
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" type="email" required placeholder="you@example.com" className="h-11 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="login-password">Password</Label>
              <Input id="login-password" type="password" required placeholder="••••••••" className="h-11 rounded-xl" />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full">
              <LogIn /> Continue (demo)
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
