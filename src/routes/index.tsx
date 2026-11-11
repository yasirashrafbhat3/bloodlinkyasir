import { createFileRoute } from "@tanstack/react-router";
import { Awareness } from "@/components/bloodlink/Awareness";
import { BloodBanks } from "@/components/bloodlink/BloodBanks";
import { DonorRegistration } from "@/components/bloodlink/DonorRegistration";
import { DonorSearch } from "@/components/bloodlink/DonorSearch";
import { EmergencyRequests } from "@/components/bloodlink/EmergencyRequests";
import { Footer } from "@/components/bloodlink/Footer";
import { Hero } from "@/components/bloodlink/Hero";
import { HowItWorks } from "@/components/bloodlink/HowItWorks";
import { ImpactStatistics } from "@/components/bloodlink/ImpactStatistics";
import { Navbar } from "@/components/bloodlink/Navbar";
import { Testimonials } from "@/components/bloodlink/Testimonials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BloodLink — Every Drop Connects a Life" },
      {
        name: "description",
        content: "Discover sample blood donors, blood banks and urgent requirements, and learn about voluntary blood donation with BloodLink.",
      },
      { property: "og:title", content: "BloodLink — Every Drop Connects a Life" },
      {
        property: "og:description",
        content: "A blood donation discovery prototype connecting donors, hospitals and communities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <DonorSearch />
        <EmergencyRequests />
        <BloodBanks />
        <HowItWorks />
        <DonorRegistration />
        <Awareness />
        <ImpactStatistics />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
