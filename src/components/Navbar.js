export function Navbar() {
  // Read data from LocalStorage
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("user_name") || "User";
  const userCredits = localStorage.getItem("user_credits") || 0;

  // Check if logged in, If token exists
  const isLoggedIn = !!token;

  const navLinks = `
    <a href="/" class="text-primary hover:text-secondary font-medium nav-link text-lg">Home</a>
    <a href="/about.html" class="text-primary hover:text-secondary font-medium nav-link text-lg">About</a>
    <a href="/contact.html" class="text-primary hover:text-secondary font-medium nav-link text-lg">Contact</a>
  `;

  let authSection = "";

  if (isLoggedIn) {
    // Logged In View Dynamic Name & Credits
    authSection = `
      <div class="flex items-center gap-4">
        <a href="/profile.html" class="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
           <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md overflow-hidden">
             ${userName.charAt(0).toUpperCase()}
           </div>
           <div class="hidden md:block text-sm text-left">
             <p class="font-bold text-slate-800">${userName}</p>
             <p class="text-slate-500">Credits: ${userCredits}</p>
           </div>
        </a>
        <button id="logout-btn" class="text-red-500 hover:text-red-700 font-medium text-sm ml-2">Log Out</button>
      </div>
    `;
  } else {
    // Public View
    authSection = `
      <div class="flex items-center gap-3.5">
        <a href="/login.html" class="text-primary font-primary text-base hover:text-secondary transition-all font-semibold border-2 border-gray-300 rounded-full px-6 py-2.5 hover:border-secondary">Log In</a>

        <a href="/register.html" class="bg-secondary hover:bg-hover font-primary text-base text-white px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105">Sign Up</a>
      </div>
    `;
  }

  return `
    <div class="container-custom flex justify-between items-center h-20 bg-white">
      <a href="/" class="text-4xl font-primary font-bold text-logo hover:opacity-80 transition-opacity">
        NidarBid
      </a>

      <nav class="hidden md:flex gap-8">
        ${navLinks}
      </nav>

      <div>
        ${authSection}
      </div>
    </div>
  `;
}
