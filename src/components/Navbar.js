export function Navbar() {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("user_name") || "User";
  const userCredits = localStorage.getItem("user_credits") || 0;
  const userAvatar =
    localStorage.getItem("user_avatar") ||
    "https://ui-avatars.com/api/?name=" + userName + "&background=random";

  const isLoggedIn = !!token;

  const navLinks = `
    <a href="/" class="text-primary hover:text-secondary font-medium nav-link text-lg">Home</a>
    <a href="/about.html" class="text-primary hover:text-secondary font-medium nav-link text-lg">About</a>
    <a href="/contact.html" class="text-primary hover:text-secondary font-medium nav-link text-lg">Contact</a>
  `;

  let authSection = "";

  if (isLoggedIn) {
    // Logged In View
    authSection = `
      <div class="flex items-center gap-6 relative">
        
        <div class="hidden md:flex items-center gap-2 text-slate-600 font-medium">
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
                <span class="material-symbols-outlined text-xl text-slate-400 group-hover:text-primary transition-colors">
                    person
                </span>
                
                <span class="text-base font-primary font-medium text-primary">
                    My Profile
                </span>
            </a>

            <button id="logout-btn" class="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 transition-colors text-left group">
                <span class="material-symbols-outlined text-xl text-red-600 group-hover:text-red-700 transition-colors">
                    logout
                </span>
                
                <span class="text-base font-primary font-medium text-red-600 hover:text-red-700">
                    Log Out
                </span>
            </button>
        </div>

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
    <div class="container-custom flex justify-between items-center h-20 bg-white relative">
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
