/* =========================================================
   THE JJ'S WEDDING INVITATION — INTERACTIVITY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Guest Personalization (?guest=Name)
  const params = new URLSearchParams(window.location.search);
  const rawGuest = params.get("guest");
  const guestName = rawGuest && rawGuest.trim() ? rawGuest.trim() : "Guest";

  const heroGuestEl = document.getElementById("guest-name-hero");
  const introGuestEl = document.getElementById("guest-name-intro");
  if (heroGuestEl) heroGuestEl.textContent = guestName;
  if (introGuestEl) introGuestEl.textContent = guestName;

  // 2. Live Countdown Timer to Saturday, 29th August 2026 at 1:00 PM EAT (UTC+3)
  const targetDate = new Date("2026-08-29T13:00:00+03:00").getTime();
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const secondsEl = document.getElementById("cd-seconds");

  function pad(num) {
    return String(num).padStart(2, "0");
  }

  function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = "0";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = String(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 3. Personalized WhatsApp RSVP Links
  const rsvpButtons = document.querySelectorAll(".whatsapp-rsvp");
  rsvpButtons.forEach((btn) => {
    const phone = btn.dataset.phone;
    const contact = btn.dataset.contact;
    const guestPart = guestName !== "Guest" ? ` (${guestName})` : "";
    const message = `Hello ${contact}, I${guestPart} would like to RSVP for the wedding of John Michael Oliba & Jane Namubiru on Saturday, 29th August 2026.`;
    btn.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
  });

  // 4. Downloadable .ics Calendar File
  const downloadIcsBtn = document.getElementById("download-ics");
  if (downloadIcsBtn) {
    downloadIcsBtn.addEventListener("click", () => {
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//The JJs Wedding//EN",
        "BEGIN:VEVENT",
        "UID:jjs-wedding-20260829@thejjs.ug",
        "DTSTAMP:20260101T000000Z",
        "DTSTART:20260829T100000Z",
        "DTEND:20260829T170000Z",
        "SUMMARY:Wedding of John Michael Oliba & Jane Namubiru",
        "DESCRIPTION:Church Service at Watoto Church Bweyogerere (1:00pm) followed by Reception at PDN opposite Watoto Bweyogerere (3:00pm).",
        "LOCATION:Watoto Church Bweyogerere, Kampala, Uganda",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "The-JJs-Wedding-2026.ics";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  // 5. Invitation Card Lightbox Modal
  const formalCard = document.getElementById("formal-card");
  const cardModal = document.getElementById("card-modal");
  const modalCardClone = document.getElementById("modal-card-clone");
  const closeCardModal = document.getElementById("close-card-modal");

  function openCardPreview() {
    if (!formalCard || !cardModal || !modalCardClone) return;
    modalCardClone.innerHTML = "";
    const clone = formalCard.cloneNode(true);
    clone.style.cursor = "default";
    clone.style.maxWidth = "100%";
    modalCardClone.appendChild(clone);
    cardModal.hidden = false;
  }

  if (formalCard) {
    formalCard.addEventListener("click", openCardPreview);
    formalCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCardPreview();
      }
    });
  }

  if (closeCardModal && cardModal) {
    closeCardModal.addEventListener("click", () => {
      cardModal.hidden = true;
    });
    cardModal.addEventListener("click", (e) => {
      if (e.target === cardModal) cardModal.hidden = true;
    });
  }

  // 6. Personalized Guest Link Generator Modal
  const openPersonalizerBtn = document.getElementById("open-personalizer");
  const linkModal = document.getElementById("link-modal");
  const closeLinkModal = document.getElementById("close-link-modal");
  const guestInput = document.getElementById("guest-input");
  const generatedUrlInput = document.getElementById("generated-url");
  const copyUrlBtn = document.getElementById("copy-url-btn");
  const copyFeedback = document.getElementById("copy-feedback");

  function refreshGeneratedUrl() {
    const baseUrl = window.location.origin + window.location.pathname;
    const val = guestInput.value.trim();
    generatedUrlInput.value = val ? `${baseUrl}?guest=${encodeURIComponent(val)}` : baseUrl;
  }

  if (openPersonalizerBtn && linkModal) {
    openPersonalizerBtn.addEventListener("click", () => {
      guestInput.value = guestName !== "Guest" ? guestName : "";
      refreshGeneratedUrl();
      copyFeedback.textContent = "";
      linkModal.hidden = false;
      guestInput.focus();
    });
  }

  if (guestInput) {
    guestInput.addEventListener("input", refreshGeneratedUrl);
  }

  if (copyUrlBtn) {
    copyUrlBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(generatedUrlInput.value);
        copyFeedback.textContent = "Personalized invitation link copied to clipboard!";
      } catch {
        generatedUrlInput.select();
        document.execCommand("copy");
        copyFeedback.textContent = "Personalized invitation link copied!";
      }
    });
  }

  if (closeLinkModal && linkModal) {
    closeLinkModal.addEventListener("click", () => {
      linkModal.hidden = true;
    });
    linkModal.addEventListener("click", (e) => {
      if (e.target === linkModal) linkModal.hidden = true;
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (cardModal && !cardModal.hidden) cardModal.hidden = true;
      if (linkModal && !linkModal.hidden) linkModal.hidden = true;
    }
  });
});
