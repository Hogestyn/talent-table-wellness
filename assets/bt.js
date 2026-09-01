const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const signupTriggers = document.querySelectorAll(".signup-trigger");

if (signupTriggers.length) {
  const layer = document.createElement("div");
  layer.className = "invitation-layer";
  layer.setAttribute("aria-hidden", "true");
  layer.innerHTML = `
    <button class="invitation-backdrop" type="button" aria-label="Close invitation form"></button>
    <aside class="invitation-drawer" role="dialog" aria-modal="true" aria-labelledby="invitation-title">
      <button class="invitation-close" type="button" aria-label="Close invitation form">×</button>
      <div class="invitation-content">
        <div class="invitation-form-view">
          <p class="eyebrow">Better Together invitations</p>
          <h2 id="invitation-title">Your invitation starts here.</h2>
          <p class="invitation-intro">Ontvang uitnodigingen voor nieuwe Talent Tables, Founder Studio-programma’s, Slow Escapes en bijzondere Better Together experiences.</p>
          <form class="invitation-form">
            <label class="invitation-field"><span>First name</span><input name="first_name" type="text" autocomplete="given-name" required></label>
            <label class="invitation-field"><span>Email address</span><input name="email" type="email" autocomplete="email" required></label>
            <label class="invitation-consent"><input name="consent" type="checkbox" required><span>Ja, ik ontvang graag uitnodigingen en updates van Better Together. Uitschrijven kan op elk moment.</span></label>
            <input name="interest" type="hidden" value="General Better Together">
            <button class="button invitation-submit" type="submit">Put me on the list</button>
            <p class="invitation-status" role="status" aria-live="polite"></p>
          </form>
        </div>
        <div class="invitation-success" tabindex="-1">
          <p class="eyebrow">Better Together</p>
          <h2>You’re on the list.</h2>
          <p>We’ll keep you close to what’s coming next.</p>
        </div>
      </div>
    </aside>`;
  document.body.appendChild(layer);

  const drawer = layer.querySelector(".invitation-drawer");
  const closeButton = layer.querySelector(".invitation-close");
  const backdrop = layer.querySelector(".invitation-backdrop");
  const form = layer.querySelector(".invitation-form");
  const interestInput = form.elements.interest;
  const intro = layer.querySelector(".invitation-intro");
  const submitButton = layer.querySelector(".invitation-submit");
  const status = layer.querySelector(".invitation-status");
  const success = layer.querySelector(".invitation-success");
  let returnFocus = null;

  const openDrawer = (trigger) => {
    returnFocus = trigger;
    const interest = trigger.dataset.interest || "General Better Together";
    interestInput.value = interest;
    drawer.classList.remove("success");
    form.reset();
    interestInput.value = interest;
    status.textContent = "";
    intro.textContent = interest === "The Legal Table"
      ? "Join the waiting list for The Legal Table. Je ontvangt als eerste bericht zodra de nieuwe editie opent."
      : "Ontvang uitnodigingen voor nieuwe Talent Tables, Founder Studio-programma’s, Slow Escapes en bijzondere Better Together experiences.";
    layer.classList.add("open");
    layer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
    window.setTimeout(() => form.elements.first_name.focus(), 80);
  };

  const closeDrawer = () => {
    layer.classList.remove("open");
    layer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("drawer-open");
    if (returnFocus) returnFocus.focus({ preventScroll: true });
  };

  signupTriggers.forEach((trigger) => trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openDrawer(trigger);
  }));
  closeButton.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && layer.classList.contains("open")) closeDrawer();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    submitButton.disabled = true;
    submitButton.textContent = "Adding you…";
    status.textContent = "";

    const email = form.elements.email.value.trim();
    const firstName = form.elements.first_name.value.trim();
    const interest = interestInput.value;
    const payload = {
      data: {
        type: "subscription",
        attributes: {
          profile: {
            data: {
              type: "profile",
              attributes: {
                email,
                first_name: firstName,
                properties: {
                  bt_interest: interest,
                  bt_signup_source: window.location.pathname
                }
              }
            }
          },
          custom_source: `Better Together website: ${interest}`
        },
        relationships: {
          list: { data: { type: "list", id: "XgKHQA" } }
        }
      }
    };

    try {
      const response = await fetch("https://a.klaviyo.com/client/subscriptions/?company_id=WCiezL", {
        method: "POST",
        headers: {
          "content-type": "application/vnd.api+json",
          "revision": "2026-07-15"
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`Klaviyo returned ${response.status}`);
      drawer.classList.add("success");
      success.focus();
    } catch (error) {
      status.textContent = "Dat ging niet goed. Probeer het opnieuw of mail hello@rockyourworld.co.";
      console.error(error);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Put me on the list";
    }
  });
}
