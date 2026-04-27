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

* **Asio** (for networking functionality)
* **Crow** (for building the web server/API)

---

### 📦 Installing Asio

1. Download Asio from the official source:

   * [https://think-async.com/Asio/](https://think-async.com/Asio/)

2. Extract the downloaded `.tar.gz` file:

```bash
tar -xvf asio.tar.gz
```

3. Locate the extracted folder (e.g., `asio-asio-1-18-2/`) and copy the necessary files into your project directory:

   * `asio.hpp`
   * `asio/` (entire folder)

4. Your project structure should include:

```
/project-root
  ├── asio/
  ├── asio.hpp
```

---

### 🌐 Installing Crow

1. Download Crow:

   * [https://github.com/CrowCpp/Crow](https://github.com/CrowCpp/Crow)

2. From the repository, copy the following file into your project:

   * `crow_all.h`

3. Place it in your project root or include directory:

```
/project-root
  ├── crow_all.h
```

---

## 🛠️ How to Compile and Run

### Compile:

```bash
g++ -o program main.cpp file1.cpp file2.cpp
```

### Run:

```bash
./program
```

> If your program uses input files:

```bash
./program input.txt
```

---

## ▶️ Example Usage

### Example 1:

**Input:**

```
(User enters...)
```

**Output:**

```
(Program prints...)
```

---

### Example 2:

**Input:**

```
...
```

**Output:**

```
...
```

---

## 🖼️ Screenshots

*(Insert screenshots below — VERY important for grading)*

### Main Menu:

![Main Menu](screenshots/menu.png)

### Example Output:

![Output](screenshots/output.png)

> 💡 Put your screenshots in a `/screenshots` folder

---

## 🤖 AI Tools Used

During the development of this project, the following AI tools were used:

* **ChatGPT (OpenAI)**

  * Used for:

    * Debugging code
    * Understanding concepts
    * Improving program structure
    * Writing and refining documentation

* Example prompts:

  * “Help debug this segmentation fault in C++”
  * “Explain how to structure a class for ___”

* Chat links (if required by professor):

  * *(Paste links here if you have them)*

All AI-generated suggestions were reviewed, tested, and modified as necessary to ensure correctness and alignment with project requirements.

---

## 📌 Notes / Limitations

* Limitation 1
* Limitation 2
* Future improvements could include:

  * ---
  * ---