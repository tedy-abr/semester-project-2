# NidarBid | Auction House

![NidarBid Homepage](./screenshots/semester-project-2-homepage.png)

## 📖 Description

NidarBid is a dynamic, responsive front-end web application for a modern auction house. It allows users to browse live listings, create an account, publish new auction items, and place bids on active listings using an internal credit system. The project focuses on clean architecture, reusable components, and a good user experience.

## Live Demo & Repository

- **Live Site:** [https://nidarbid.netlify.app/](#)
- **GitHub Repository:** [https://github.com/tedy-abr/semester-project-2](https://github.com/tedy-abr/semester-project-2)

## Tech Stack

- **HTML5** - Semantic structure and layout
- **Vanilla JavaScript (ES6+)** - Logic, DOM manipulation, and API integration using Modules
- **Tailwind CSS (v4)** - Utility-first styling for a completely custom, responsive design
- **Vite** - High-performance local development server and build tool

## Main Features

- **User Authentication:** Secure register and login functionality.
- **Credit System:** Users can track their available credits to bid on items.
- **Listing Management:** Authenticated users can create listings with titles, descriptions, deadlines, and media.
- **Interactive Bidding:** View the latest bids and place new bids on active auctions.
- **Search & Filter:** Search listings by keywords and sort them by newest, oldest, or ending soon.
- **Responsive Layout:** A fully responsive interface that works seamlessly on mobile, tablet, and desktop screens.

## Pages & User Flows

1. **Home (`index.html`)** - Displays live listings with search and sort functionality.
2. **Details (`details.html`)** - Shows detailed information about a specific listing, including the bidding history and the quick-bid form.
3. **Register (`register.html`)** - Account creation form.
4. **Log In (`login.html`)** - Existing user authentication.
5. **Profile (`profile.html`)** - Displays user details, avatar, total credits, and their active listings.
6. **Edit Profile (`edit-profile.html`)** - Allows users to update their profile information.
7. **Create Listing (`create-listing.html`)** - Form to publish a new auction item.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js installed on your computer.

### Installation & Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/tedy-abr/semester-project-2.git
   ```
2. Navigate into the project directory:
   ```bash
   cd semester-project-2
   ```
3. Install the required dependencies (Vite and Tailwind CSS):
   ```bash
   npm install
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit the URL provided in the terminal (usually `http://localhost:5173` or `http://localhost:5174`).

---

## Portfolio 2 Improvement

As part of the Portfolio 2 assignment, a meaningful improvement was made to the project's layout, code structure, and user experience:

**Implemented a Reusable Global Footer Component**

- **The Problem:** The website pages ended abruptly with an empty `<footer id="footer"></footer>` tag, making the layout feel unfinished and lacking secondary navigation.
- **The Solution:** A completely new, responsive Global Footer component was built. Instead of duplicating HTML across 7 different pages, a reusable JavaScript component (`src/components/Footer.js`) was created.
- **Implementation details:** The footer is dynamically rendered across the application by importing and injecting it through `src/main.js`. It includes brand information, dynamic copyright dates, quick links.
