const CLIENT_ID = "348084601498-vskgkbajk14okl7o0rvm6jbo9beet3uh.apps.googleusercontent.com";
const API_KEY = "AIzaSyBuWiMJ-j4E4lXTnCI_295UW0z_Fxv2Tks";

const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar";

const BACKEND_URL = "http://localhost:18080";

let tokenClient;

function gapiLoaded() {
  gapi.load("client", initializeGapiClient);
}

async function initializeGapiClient() {
  try {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    document.getElementById("output").textContent = "Google API loaded.";
  } catch (err) {
    document.getElementById("output").textContent = "GAPI init error: " + err.message;
  }
}

function gisLoaded() {
  try {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: () => {},
    });
    document.getElementById("output").textContent = "Google Identity loaded.";
  } catch (err) {
    document.getElementById("output").textContent = "GIS init error: " + err.message;
  }
}

function handleAuthClick() {
  if (!tokenClient) {
    document.getElementById("output").textContent = "Google sign-in client is not ready yet.";
    return;
  }

  tokenClient.callback = async (resp) => {
    if (resp.error) {
      document.getElementById("output").textContent = "Auth error: " + resp.error;
      return;
    }
    document.getElementById("output").textContent = "Signed in successfully!";
  };

  tokenClient.requestAccessToken({ prompt: "consent" });
}

async function createParticipant() {
    const email = document.getElementById("targetEmail").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();

    if (!email || !firstName || !lastName) {
        document.getElementById("output").textContent = "Please fill in all fields.";
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/participant/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, role: "member" }),
        });

        if (!response.ok) throw new Error("Server error: " + response.status);

        const data = await response.json();
        document.getElementById("output").textContent =
            `Created participant: ${data.name}`;

        fetchLeaderboard();
    } catch (err) {
        document.getElementById("output").textContent = "Error creating participant: " + err.message;
    }
}

function sendEmail() {
  const to = document.getElementById("guestEmail").value.trim();
  const subject = "Project Testing";
  const body = "Project Testing.";

  if (!to) {
    document.getElementById("output").textContent = "Please enter a guest email first.";
    return;
  }

  const url =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    "&to=" + encodeURIComponent(to) +
    "&su=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  window.open(url, "_blank");
}

async function listEvents() {
  try {
    const response = await gapi.client.calendar.events.list({
      calendarId: "primary",
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
      timeMin: new Date().toISOString(),
    });

    const events = response.result.items || [];
    let output = "";

    if (events.length === 0) {
      output = "No upcoming events found.";
    } else {
      events.forEach((event) => {
        output += `${event.summary} - ${event.start?.dateTime || event.start?.date}\n`;
      });
    }

    document.getElementById("output").textContent = output;
  } catch (err) {
    document.getElementById("output").textContent =
      "Error listing events: " + (err.result?.error?.message || err.message);
  }
}

function addGuestFunction() {
  const guestEmail = document.getElementById("guestEmail").value.trim();

  if (!guestEmail) {
    throw new Error("Please enter a guest email.");
  }

  if (!guestEmail.endsWith("@richmond.edu")) {
    throw new Error("Guest email must be a @richmond.edu address.");
  }

  return [{ email: guestEmail }];
}

async function createCalendarInvite() {
  try {
    const startInput = document.getElementById("startTime").value;
    const endInput = document.getElementById("endTime").value;

    if (!startInput || !endInput) {
      document.getElementById("output").textContent = "Please choose both a start time and end time.";
      return;
    }

    const start = new Date(startInput).toISOString();
    const end = new Date(endInput).toISOString();

    const event = {
      summary: "Project Testing Meeting",
      location: "Online",
      description: "Invite sent from my JavaScript Calendar API project.",
      start: { dateTime: start, timeZone: "America/New_York" },
      end: { dateTime: end, timeZone: "America/New_York" },
      attendees: addGuestFunction(),
      guestsCanInviteOthers: false,
      guestsCanModify: false,
    };

    const response = await gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
      sendUpdates: "all",
    });

    document.getElementById("output").innerHTML =
      "Invite created successfully:<br>" + response.result.htmlLink;
  } catch (err) {
    document.getElementById("output").innerHTML =
      "Error creating invite:<br>" + (err.result?.error?.message || err.message);
  }
}

// ── Leaderboard ──────────────────────────────────────────────────────────────

async function fetchLeaderboard() {
  try {
    const response = await fetch(`${BACKEND_URL}/leaderboard`);
    if (!response.ok) throw new Error("Server error: " + response.status);

    const participants = await response.json();
    const box = document.getElementById("leaderboard");
    box.innerHTML = "";

    if (participants.length === 0) {
      box.innerHTML = "<div>No participants yet.</div>";
      return;
    }

    // Sort by points descending
    participants.sort((a, b) => b.points - a.points);

    participants.forEach((p, i) => {
      const div = document.createElement("div");
      div.textContent = `${i + 1}. ${p.name} — ${p.points} pts`;
      box.appendChild(div);
    });

    // Fill remaining rows up to 10
    for (let i = participants.length; i < 10; i++) {
      const div = document.createElement("div");
      div.textContent = `${i + 1}. —`;
      box.appendChild(div);
    }
  } catch (err) {
    document.getElementById("leaderboard").innerHTML =
      "<div>Error loading leaderboard: " + err.message + "</div>";
  }
}

// ── Points controls ───────────────────────────────────────────────────────────

async function addPoints(amount) {
    const email = document.getElementById("targetEmail").value.trim();
    if (!email) { alert("Enter a participant name first."); return; }

    // Try to create the participant first (409 just means they already exist)
    await fetch("http://localhost:18080/participant/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            firstName: email.split("@")[0],
            lastName: "",
            email: email,
            role: "member"
        })
    });

    // Now add points
    const res = await fetch("http://localhost:18080/participant/addPoints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, amount })
    });

    if (res.ok) {
        fetchLeaderboard();
    } else {
        alert("Error adding points.");
    }
}

async function clearLeaderboard() {
    if (!confirm("Are you sure you want to delete the entire leaderboard?")) return;
    
    await fetch("http://localhost:18080/leaderboard/clear", {
        method: "POST"
    });
    
    fetchLeaderboard();
}

async function deletePoints() {
  const email = document.getElementById("targetEmail").value.trim();

  if (!email) {
    document.getElementById("output").textContent = "Please enter a participant name.";
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/participant/setPoints`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, points: 0 }),
    });

    if (!response.ok) throw new Error("Server error: " + response.status);

    const data = await response.json();
    document.getElementById("output").textContent =
      `Reset points for ${data.name}. New total: ${data.points}`;

    fetchLeaderboard();
  } catch (err) {
    document.getElementById("output").textContent = "Error resetting points: " + err.message;
  }
}

// ── Init ──────────────────────────────────────────────────────────────────────

window.onload = () => {
  gapiLoaded();
  gisLoaded();
  fetchLeaderboard();
};