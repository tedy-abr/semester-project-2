export function Navbar() {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("user_name") || "User";
  const userCredits = localStorage.getItem("user_credits") || 0;
  const userAvatar =
    localStorage.getItem("user_avatar") ||
    "https://ui-avatars.com/api/?name=" + userName + "&background=random";

  const isLoggedIn = !!token;

  // Desktop Links
  const navLinks = `
    <a href="/" class="text-primary hover:text-secondary font-medium nav-link text-lg">Home</a>
    <a href="/about.html" class="text-primary hover:text-secondary font-medium nav-link text-lg">About</a>
    <a href="/contact.html" class="text-primary hover:text-secondary font-medium nav-link text-lg">Contact</a>
  `;

  // Mobile Links
  const mobileNavLinks = `
    <a href="/" class="block w-full text-left text-secondary font-primary font-semibold py-2 text-base">Home</a>
    <a href="/about.html" class="block w-full text-left text-primary font-primary font-medium py-2 hover:text-secondary text-base">About</a>
    <a href="/contact.html" class="block w-full text-left text-primary font-primary font-medium py-2 hover:text-secondary text-base">Contact</a>
  `;

  let desktopAuth = "";
  let mobileAuth = "";

  if (isLoggedIn) {
    // --- LOGGED IN STATE ---

    // Desktop Credits + Avatar
    desktopAuth = `
      <div class="hidden md:flex items-center gap-6 relative">
        <div class="flex items-center gap-2 text-slate-600 font-medium">
            <span class="w-3 h-3 rounded-full bg-secondary"></span>
            <span class="text-secondary font-bold text-base">|</span>
            <span class="text-secondary font-primary font-semibold text-base">Credit</span>
            <span class="text-gray-700 font-primary font-medium text-base">${userCredits}</span>
        </div>

        <button id="user-menu-btn" class="focus:outline-none transition-transform hover:scale-105">
           <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border border-slate-200 shadow-sm">
             <img src="${userAvatar}" alt="${userName}" class="w-full h-full object-cover">
           </div>
        </button>

        <div id="user-dropdown" class="hidden absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
            <a href="/profile.html" class="flex items-center gap-2 px-4 py-3 hover:bg-slate-50 transition-colors font-primary group">
                <span class="material-symbols-outlined text-xl text-slate-400 group-hover:text-primary transition-colors">person</span>
                <span class="text-base font-primary font-medium text-primary">My Profile</span>
            </a>
            <button id="logout-btn" class="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 transition-colors text-left group">
                <span class="material-symbols-outlined text-xl text-red-600 group-hover:text-red-700 transition-colors">logout</span>
                <span class="text-base font-primary font-medium text-red-600 hover:text-red-700">Log Out</span>
            </button>
        </div>
      </div>
    `;

    // Mobile Credits + Profile Link + Logout
    mobileAuth = `
      <div class="pt-4 border-t border-slate-100">
        <div class="flex items-center justify-between mb-4">
           <div class="flex items-center gap-2">
             <div class="w-3 h-3 rounded-full bg-secondary"></div>
             <span class="text-secondary font-primary font-semibold text-base">Credit: ${userCredits}</span>
           </div>
           <a href="/profile.html" class="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
             <img src="${userAvatar}" alt="${userName}" class="w-full h-full object-cover">
           </a>
        </div>
        <button id="mobile-logout-btn" class="w-full text-left text-red-600 font-primary font-medium py-2">Log Out</button>
      </div>
    `;
  } else {
    // --- LOGGED OUT STATE ---

    // Desktop Buttons
    desktopAuth = `
      <div class="hidden md:flex items-center gap-3.5">
        <a href="/login.html" class="text-primary font-primary text-base hover:text-secondary transition-all font-semibold border-2 border-gray-300 rounded-full px-6 py-2.5 hover:border-secondary">Log In</a>
        <a href="/register.html" class="bg-secondary hover:bg-hover font-primary text-base text-white px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105">Sign Up</a>
      </div>
    `;

    // Mobile Vertical Buttons
    mobileAuth = `
      <div class="pt-4 border-t border-slate-100 space-y-3">
        <a href="/login.html" class="block w-full text-center px-6 py-3 border-2 border-gray-300 rounded-full font-primary font-semibold text-primary text-base">Log In</a>
        <a href="/register.html" class="block w-full text-center px-6 py-3 bg-secondary text-white rounded-full font-primary font-semibold text-base">Sign Up</a>
      </div>
    `;
  }

  return `
    <nav class="bg-white relative">
      <div class="container-custom flex justify-between items-center h-20">
        
        <a href="/" class="text-3xl md:text-4xl font-primary font-bold text-logo hover:opacity-80 transition-opacity">
          NidarBid
        </a>

        <div class="hidden md:flex gap-8">
          ${navLinks}
        </div>

        ${desktopAuth}

        <button id="mobile-menu-btn" class="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none">
          <span id="mobile-menu-icon" class="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>

      <div id="mobile-menu" class="hidden md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-lg px-4 pb-6 z-50">
        <div class="flex flex-col space-y-2">
           ${mobileNavLinks}
           ${mobileAuth}
        </div>
      </div>
    </nav>
  `;
}
