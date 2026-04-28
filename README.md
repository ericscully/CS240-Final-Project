# Schedule.io

## Team Members

* Baltasar Urrutia
* Eric Scully
* Angel Santiago-Cruz

**Date:** Monday Apr 27, 2026

**Course:** CMSC 240, Section 01

---

## 📖 Project Description

This project was developed as part of **CMSC 240: Software Systems**. The purpose of this program is to make it easier for managers to keep track of employee performance.

The program allows users to:

* Give incentives for people to participate and pay attention
* Create fun gamified competition with friends/coworkers
* Automatically send calendar invites to desired users

Key features include:

* Calendar type application that can send and receive meeting invites
* Google Calendar API to create the sign in, send email, and create event features
* Live Leaderboard that can track the progress of all people

---

## ⚙️ Installation & External Libraries

This project uses the following external libraries:

* **Asio** (for networking functionality, already included in repo)
* **Crow** (for building the web server/API, see steps below)

### 📦 Installing Asio

```
curl -L https://github.com/chriskohlhoff/asio/archive/refs/tags/asio-1-18-2.tar.gz -o asio-1-18-2.tar.gz
```

#### Extract
```
tar -xzf asio-1-18-2.tar.gz
```

#### Copy required files
```
cp -r asio-asio-1-18-2/asio/include/asio .
```

```
cp asio-asio-1-18-2/asio/include/asio.hpp .
```

### 🌐 Installing Crow

Already installed in the repository, no additional steps needed.

---

## 🛠️ How to Compile and Run

### Compile using Makefile Command:

```bash
make all
```

### Run:

```bash
./server
```
Then right click on index.html, and click on Open With Live Server. This should open Schedule.io's interface in your browser.

---

## ▶️ Example Usage

**Two/or more people have a meeting:**

- Organizer sends a Google Invite to person's email address
- After meeting is complete, organizer evaluates the performance of the other person/people
- Points are assigned respectively to each participant
- Leaderboard automatically ranks participants with highest points

---

## 🖼️ Screenshots

### Booting Up:

![Main Menu](images/Final-Boot-Up.png)

### Signing In:

![Signing In](images/Final-Signing-In.png)

### Signed In:

![Signed In](images/Final-Signed-In.png)

### Calendar Event Created:

![Event Created](images/Final-Calendar-Event.png)

### 3 Participants in Leaderboard Ranked:

![Leaderboard](images/Final-3-Participants.png)

---

## 🤖 AI Tools Used

During the development of this project we used ChatGPT:

* **ChatGPT (OpenAI)**

  * Used for:

    * Debugging code
    * Understanding concepts
    * Improving program structure
    * Writing and refining documentation

* Example prompts:

  * “Help debug this segmentation fault in C++”
  * “Explain how to structure a class for ___”

  https://chatgpt.com/share/69effd0e-c960-83ea-b07f-52fb827e8e22
  
  https://chatgpt.com/share/69efffeb-7bb8-83ea-9ff6-9f38430cb0a6