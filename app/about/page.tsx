import Link from 'next/link';
import { Code2, Target, Users, Rocket } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'About',
  description: 'Learn about Scale with Chintan and the mission behind the blog',
};

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Practical Knowledge',
      description:
        'Real-world insights from building and scaling production systems, not just theory.',
    },
    {
      icon: Code2,
      title: 'Technical Depth',
      description:
        'In-depth technical content that goes beyond surface-level tutorials.',
    },
    {
      icon: Users,
      title: 'Community Focused',
      description:
        'Building a community of engineers who learn and grow together.',
    },
    {
      icon: Rocket,
      title: 'Continuous Learning',
      description:
        'Staying current with evolving technologies and best practices.',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navigation />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            About Scale with Chintan
          </h1>
          <p className="text-lg text-neutral-400">
            Helping engineers build better, scalable systems
          </p>
        </div>

        <div className="mb-16 rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">The Mission</h2>
          <p className="mb-4 text-neutral-400">
            Scale with Chintan is a technical blog dedicated to sharing knowledge
            about system design, software architecture, and building scalable
            applications. The goal is to provide practical, in-depth content that
            helps engineers level up their skills and build better systems.
          </p>
          <p className="text-neutral-400">
            Whether you're designing your first distributed system or optimizing
            an existing architecture, you'll find valuable insights and practical
            guidance here. All content is based on real-world experience and
            industry best practices.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            Core Values
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6"
              >
                <value.icon className="mb-4 h-8 w-8 text-emerald-500" />
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16 rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">Topics Covered</h2>
          <ul className="space-y-3 text-neutral-400">
            <li className="flex items-start">
              <span className="mr-2 text-emerald-500">•</span>
              System Design: Architecture patterns, trade-offs, and design decisions
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-emerald-500">•</span>
              Scalability: Techniques for handling growth and high traffic
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-emerald-500">•</span>
              Distributed Systems: Challenges and solutions in distributed computing
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-emerald-500">•</span>
              Performance Optimization: Making systems faster and more efficient
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-emerald-500">•</span>
              Cloud Architecture: Building and deploying cloud-native applications
            </li>
          </ul>
        </div>

        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Ready to Start Learning?
          </h2>
          <p className="mb-6 text-neutral-400">
            Explore the latest articles and join the community
          </p>
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600">
            <Link href="/blog">Browse Articles</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
