'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();

  // Don't show navbar on auth or marketing landing page
  if (
    pathname === '/' ||
    pathname?.startsWith('/sign-in') ||
    pathname?.startsWith('/sign-up')
  ) {
    return null;
  }

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dsa', label: 'DSA' },
    { href: '/interview', label: 'Interview' },
    { href: '/learn', label: 'Learn' },
    { href: '/roadmaps', label: 'Roadmaps' },
    { href: '/cheatsheets', label: 'Cheatsheets' },
    { href: '/resume', label: 'Resume' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-white">PrepWise</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <span className="text-sm text-gray-300">
                  Hi, <span className="font-medium text-white">{user.firstName || 'there'}</span>
                </span>
              </div>
            )}
            
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-10 h-10 rounded-full border-2 border-white/20 hover:border-blue-500/50 transition-colors',
                  userButtonPopoverCard: 'bg-slate-900 border border-white/10',
                  userButtonPopoverActionButton: 'hover:bg-white/5',
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-white/10">
        <div className="px-2 py-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
