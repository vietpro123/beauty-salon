// Salon meta & business hours. Hours are in local time, 24h format.
// day: 0 = Sun ... 6 = Sat
export const SALON = {
  name: "Maison Luminaire",
  tagline: "A sanctuary for considered beauty.",
  address: "500 Terry Francine Street San Francisco, CA 94158",
  phone: "123-456-7890",
  email: "info@mysite.com",
  instagram: "https://instagram.com/",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.0!2d-74.006!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNew%20York!5e0!3m2!1sen!2sus!4v1700000000000",
  coordinates: { lat: 40.7128, lng: -74.006 },
};

export const HOURS = [
  { day: 0, label: "Sunday", open: null, close: null },
  { day: 1, label: "Monday", open: null, close: null },
  { day: 2, label: "Tuesday", open: "10:00", close: "19:00" },
  { day: 3, label: "Wednesday", open: "10:00", close: "19:00" },
  { day: 4, label: "Thursday", open: "10:00", close: "20:00" },
  { day: 5, label: "Friday", open: "10:00", close: "20:00" },
  { day: 6, label: "Saturday", open: "09:00", close: "18:00" },
];

export function getOpenStatus(date = new Date()) {
  const today = HOURS.find((h) => h.day === date.getDay());
  if (!today || !today.open) return { open: false, label: "Closed today" };
  const [oh, om] = today.open.split(":").map(Number);
  const [ch, cm] = today.close.split(":").map(Number);
  const now = date.getHours() * 60 + date.getMinutes();
  const openMin = oh * 60 + om;
  const closeMin = ch * 60 + cm;
  if (now >= openMin && now < closeMin) {
    return { open: true, label: `Open · closes ${today.close}` };
  }
  if (now < openMin) {
    return { open: false, label: `Opens today at ${today.open}` };
  }
  return { open: false, label: "Closed for the day" };
}