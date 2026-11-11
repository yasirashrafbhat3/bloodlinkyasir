// All records in this file are fictional demonstration data for the BloodLink prototype.

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
export type BloodGroup = (typeof BLOOD_GROUPS)[number];

export type Availability = "Available" | "On request" | "Recently donated";

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  city: string;
  area: string;
  availability: Availability;
  donations: number;
  lastDonation: string;
  languages: string[];
}

export const DONORS: Donor[] = [
  { id: "d1", name: "Aarav Mehta", bloodGroup: "O+", city: "Delhi", area: "Saket", availability: "Available", donations: 9, lastDonation: "Jun 2026", languages: ["Hindi", "English"] },
  { id: "d2", name: "Zoya Khan", bloodGroup: "B+", city: "Srinagar", area: "Rajbagh", availability: "Available", donations: 4, lastDonation: "May 2026", languages: ["Kashmiri", "Urdu", "English"] },
  { id: "d3", name: "Rohan Iyer", bloodGroup: "A+", city: "Bengaluru", area: "Indiranagar", availability: "On request", donations: 12, lastDonation: "Aug 2026", languages: ["Tamil", "Kannada", "English"] },
  { id: "d4", name: "Priya Sharma", bloodGroup: "O-", city: "Mumbai", area: "Andheri West", availability: "Available", donations: 7, lastDonation: "Apr 2026", languages: ["Marathi", "Hindi"] },
  { id: "d5", name: "Imran Bhat", bloodGroup: "AB+", city: "Srinagar", area: "Hyderpora", availability: "Recently donated", donations: 3, lastDonation: "Oct 2026", languages: ["Kashmiri", "English"] },
  { id: "d6", name: "Ananya Das", bloodGroup: "B-", city: "Kolkata", area: "Salt Lake", availability: "Available", donations: 5, lastDonation: "Mar 2026", languages: ["Bengali", "English"] },
  { id: "d7", name: "Karthik Reddy", bloodGroup: "O+", city: "Hyderabad", area: "Gachibowli", availability: "Available", donations: 11, lastDonation: "Jul 2026", languages: ["Telugu", "English"] },
  { id: "d8", name: "Meera Nair", bloodGroup: "A-", city: "Chennai", area: "Adyar", availability: "On request", donations: 6, lastDonation: "Feb 2026", languages: ["Malayalam", "Tamil"] },
  { id: "d9", name: "Vikram Singh", bloodGroup: "B+", city: "Jaipur", area: "Malviya Nagar", availability: "Available", donations: 8, lastDonation: "Jun 2026", languages: ["Hindi"] },
  { id: "d10", name: "Sana Qureshi", bloodGroup: "AB-", city: "Lucknow", area: "Gomti Nagar", availability: "Available", donations: 2, lastDonation: "Jan 2026", languages: ["Hindi", "Urdu"] },
  { id: "d11", name: "Arjun Patel", bloodGroup: "O+", city: "Ahmedabad", area: "Navrangpura", availability: "Recently donated", donations: 14, lastDonation: "Oct 2026", languages: ["Gujarati", "Hindi"] },
  { id: "d12", name: "Neha Kulkarni", bloodGroup: "A+", city: "Pune", area: "Kothrud", availability: "Available", donations: 5, lastDonation: "May 2026", languages: ["Marathi", "English"] },
  { id: "d13", name: "Rahul Verma", bloodGroup: "O-", city: "Delhi", area: "Dwarka", availability: "On request", donations: 10, lastDonation: "Jul 2026", languages: ["Hindi", "English"] },
  { id: "d14", name: "Fatima Shaikh", bloodGroup: "B+", city: "Mumbai", area: "Bandra", availability: "Available", donations: 6, lastDonation: "Apr 2026", languages: ["Hindi", "English"] },
  { id: "d15", name: "Siddharth Rao", bloodGroup: "AB+", city: "Bengaluru", area: "Whitefield", availability: "Available", donations: 3, lastDonation: "Mar 2026", languages: ["Kannada", "English"] },
  { id: "d16", name: "Ishita Ghosh", bloodGroup: "O+", city: "Kolkata", area: "Ballygunge", availability: "Available", donations: 8, lastDonation: "Jun 2026", languages: ["Bengali", "Hindi"] },
];

export type Urgency = "Critical" | "High" | "Moderate";

export interface BloodRequest {
  id: string;
  bloodGroup: BloodGroup;
  hospital: string;
  city: string;
  units: number;
  urgency: Urgency;
  posted: string;
  purpose: string;
}

export const REQUESTS: BloodRequest[] = [
  { id: "r1", bloodGroup: "O-", hospital: "Sunrise Multispeciality Hospital", city: "Delhi", units: 3, urgency: "Critical", posted: "2 hours ago", purpose: "Scheduled surgery" },
  { id: "r2", bloodGroup: "B+", hospital: "Valley Care Medical Centre", city: "Srinagar", units: 2, urgency: "High", posted: "5 hours ago", purpose: "Post-delivery care" },
  { id: "r3", bloodGroup: "AB-", hospital: "Harbourview General Hospital", city: "Mumbai", units: 1, urgency: "High", posted: "Today", purpose: "Platelet support" },
  { id: "r4", bloodGroup: "A+", hospital: "Lakeside Children's Hospital", city: "Kolkata", units: 4, urgency: "Moderate", posted: "Yesterday", purpose: "Thalassemia support" },
  { id: "r5", bloodGroup: "O+", hospital: "Deccan Heart Institute", city: "Hyderabad", units: 2, urgency: "Moderate", posted: "Yesterday", purpose: "Cardiac procedure" },
  { id: "r6", bloodGroup: "B-", hospital: "Greenfield Trauma Centre", city: "Bengaluru", units: 2, urgency: "Critical", posted: "1 hour ago", purpose: "Accident care" },
];

export interface BloodBank {
  id: string;
  name: string;
  city: string;
  address: string;
  hours: string;
  available: BloodGroup[];
  phone: string;
}

export const BLOOD_BANKS: BloodBank[] = [
  { id: "b1", name: "LifeStream Community Blood Centre", city: "Delhi", address: "14 Ring Road, Lajpat Nagar", hours: "Open 24 × 7", available: ["A+", "B+", "O+", "O-", "AB+"], phone: "+91 00000 10001" },
  { id: "b2", name: "Chinar Voluntary Blood Bank", city: "Srinagar", address: "Residency Road, Lal Chowk", hours: "8 AM – 8 PM", available: ["A+", "B+", "B-", "O+", "AB+"], phone: "+91 00000 10002" },
  { id: "b3", name: "Coastal Red Cell Centre", city: "Mumbai", address: "Link Road, Malad West", hours: "Open 24 × 7", available: ["A-", "B+", "O+", "O-", "AB-"], phone: "+91 00000 10003" },
  { id: "b4", name: "Hooghly Blood Services", city: "Kolkata", address: "Park Street, Block C", hours: "9 AM – 9 PM", available: ["A+", "A-", "B+", "O+"], phone: "+91 00000 10004" },
  { id: "b5", name: "Garden City Blood Bank", city: "Bengaluru", address: "100 Ft Road, Koramangala", hours: "Open 24 × 7", available: ["A+", "B-", "O+", "AB+", "AB-"], phone: "+91 00000 10005" },
  { id: "b6", name: "Pearl City Transfusion Centre", city: "Hyderabad", address: "Banjara Hills, Road No. 3", hours: "8 AM – 10 PM", available: ["A+", "B+", "O+", "O-"], phone: "+91 00000 10006" },
];

export const STATS = [
  { label: "Donors Registered", value: 12500, suffix: "+" },
  { label: "Donations Supported", value: 8200, suffix: "+" },
  { label: "Partner Organisations", value: 120, suffix: "+" },
  { label: "Cities Reached", value: 35, suffix: "+" },
];

export const TESTIMONIALS = [
  { name: "Nida Rashid", role: "First-time donor, Srinagar", quote: "I always wanted to donate but never knew where to start. Seeing nearby camps and banks in one place made it feel simple and safe." },
  { name: "Dr. Kabir Anand", role: "Transfusion medicine, Delhi", quote: "A clear, respectful platform like this can help communities understand why voluntary, regular donation matters so much." },
  { name: "Ritika Sen", role: "Patient family member, Kolkata", quote: "During a stressful week, knowing where to look and who to call gave our family a sense of direction and calm." },
];
