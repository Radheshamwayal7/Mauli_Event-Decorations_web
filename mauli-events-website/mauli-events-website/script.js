const photos = [
  {src:"images/floral-ring.jpg", title:"Floral ring backdrop"},
  {src:"images/birthday-balloons.jpg", title:"Birthday balloon setup"},
  {src:"images/canopy.jpg", title:"Colourful floral canopy"},
  {src:"images/floral-drape.jpg", title:"Pink and white drape decoration"},
  {src:"images/car.jpg", title:"Flower-decorated wedding car"},
  {src:"images/garland.jpg", title:"Rose and baby’s breath garland"},
  {src:"images/neon-ring.jpg", title:"First birthday balloon ring"},
  {src:"images/bell-backdrop.jpg", title:"Floral backdrop with brass bells"},
  {src:"images/seat-backdrop.jpg", title:"Ceremony seating backdrop"},
  {src:"images/pink-arch.jpg", title:"Pink drape floral arch"},
  {src:"images/rose-frame.jpg", title:"Floral stage frame"}
];

const gallery = document.getElementById("galleryGrid");
const viewer = document.getElementById("photoViewer");
const viewerImage = document.getElementById("viewerImage");
const viewerCaption = document.getElementById("viewerCaption");
let activePhoto = 0;

photos.forEach((photo, index) => {
  const button = document.createElement("button");
  button.className = "gallery-item";
  button.type = "button";
  button.setAttribute("aria-label", `View ${photo.title}`);
  const img = document.createElement("img");
  img.src = photo.src;
  img.alt = photo.title;
  img.loading = "lazy";
  const caption = document.createElement("span");
  caption.textContent = photo.title;
  button.append(img, caption);
  button.addEventListener("click", () => openPhoto(index));
  gallery.appendChild(button);
});

function openPhoto(index) {
  activePhoto = (index + photos.length) % photos.length;
  viewerImage.src = photos[activePhoto].src;
  viewerImage.alt = photos[activePhoto].title;
  viewerCaption.textContent = photos[activePhoto].title;
  if (!viewer.open) viewer.showModal();
}
document.getElementById("viewerClose").addEventListener("click", () => viewer.close());
document.getElementById("viewerPrev").addEventListener("click", () => openPhoto(activePhoto - 1));
document.getElementById("viewerNext").addEventListener("click", () => openPhoto(activePhoto + 1));
viewer.addEventListener("click", event => { if (event.target === viewer) viewer.close(); });
document.addEventListener("keydown", event => {
  if (!viewer.open) return;
  if (event.key === "ArrowLeft") openPhoto(activePhoto - 1);
  if (event.key === "ArrowRight") openPhoto(activePhoto + 1);
});

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const get = id => document.getElementById(id).value.trim();
  const message = [
    "Hello Mauli Events! I would like to enquire about a decoration booking.",
    `Name: ${get("name")}`,
    `Event: ${get("eventType")}`,
    get("eventDate") ? `Date: ${get("eventDate")}` : "",
    get("venue") ? `Venue/area: ${get("venue")}` : "",
    `Approximate budget: ${get("budget")}`,
    "Please share ideas, availability and a quote. Thank you!"
  ].filter(Boolean).join("\n");
  window.open(`https://wa.me/919325972481?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});
