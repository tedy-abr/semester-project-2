export function Footer() {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="bg-white border-t border-gray-200 mt-16 pt-12 pb-8">
      <div class="container-custom px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div class="flex flex-col">
            <a href="/" class="text-3xl font-primary font-bold text-logo hover:opacity-80 transition-opacity mb-4 inline-block">
              NidarBid
            </a>
            <p class="text-gray-600 font-primary text-base leading-relaxed mb-4 max-w-sm">
              Your trusted destination for live auctions. Find the best deals on unique items from trusted sellers worldwide.
            </p>
          </div>
          <div class="flex flex-col">
            <h3 class="text-lg font-bold text-primary font-primary mb-4">Quick Links</h3>
            <ul class="space-y-3">
              <li><a href="/" class="text-gray-600 hover:text-secondary font-medium transition-colors">Home</a></li>
              <li><a href="/about.html" class="text-gray-600 hover:text-secondary font-medium transition-colors">About Us</a></li>
              <li><a href="/contact.html" class="text-gray-600 hover:text-secondary font-medium transition-colors">Contact</a></li>
            </ul>
          </div>
          <div class="flex flex-col">
            <h3 class="text-lg font-bold text-primary font-primary mb-4">Account</h3>
            <ul class="space-y-3">
              <li><a href="/login.html" class="text-gray-600 hover:text-secondary font-medium transition-colors">Log In</a></li>
              <li><a href="/register.html" class="text-gray-600 hover:text-secondary font-medium transition-colors">Sign Up</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-500 font-primary text-sm text-center md:text-left">
            &copy; ${currentYear} NidarBid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `;
}
