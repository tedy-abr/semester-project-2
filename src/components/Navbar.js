export function Navbar() {
  const isLoggedIn = false;

  const navLinks = `
    <a href="/" class="text-heading-color hover:text-primary font-medium  nav-link text-xl">Home</a>
    <a href="/about.html" class="text-heading-color hover:text-primary font-medium nav-link text-xl">About</a>
    <a href="/contact.html" class="text-heading-color hover:text-primary font-medium nav-link text-xl">Contact</a>
  `;

  let authSection = "";

  if (isLoggedIn) {
    // Logged in view
    authSection = `
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
           <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
             U
           </div>
           <div class="hidden md:block text-sm">
             <p class="font-bold text-slate-800">User Name</p>
             <p class="text-slate-500">Credits: 1000</p>
           </div>
        </div>
        <button id="logout-btn" class="text-red-500 hover:text-red-700 font-medium text-sm ml-2">Log Out</button>
      </div>
    `;
  } else {
    // Public view
    authSection = `
      <div class="flex items-center gap-3.5">
        <a href="/login.html" class="text-heading-color font-heading text-xl hover:text-primary font-medium ">Log in</a>
        <a href="/register.html" class="bg-primary hover:bg-logo font-heading text-xl text-white px-5 py-1.5 rounded-full font-medium shadow-sm">Sign Up</a>
      </div>
    `;
  }
  return `
    <div class="container-custom flex justify-between items-center h-20 bg-white">
      <a href="/" class="text-4xl font-heading font-bold text-logo">
        NidarBid</span>
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
