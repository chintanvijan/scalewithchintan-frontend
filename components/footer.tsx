'use client';

import Link from 'next/link';
import { Code2, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { trackExternalLink } from '@/lib/analytics';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@scalewithchintan.com', label: 'Email' },
  ];

  const footerLinks = {
    content: [
      { href: '/blog', label: 'All Posts' },
      { href: '/categories', label: 'Categories' },
      // { href: '/tags', label: 'Tags' },
    ],
    resources: [
      { href: '/about', label: 'About' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  };

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <Code2 className="h-8 w-8 text-emerald-500 transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold text-white">
                ScaleWith<span className="text-emerald-500">Chintan.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-neutral-400">
              Technical insights on system design, software architecture, and
              building scalable applications. Join the journey to engineering
              excellence.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink(social.href)}
                  className="text-neutral-400 transition-colors hover:text-emerald-500"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Content
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.content.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-emerald-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-emerald-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-8">
          <p className="text-center text-sm text-neutral-400">
            &copy; {currentYear} Scale with Chintan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
