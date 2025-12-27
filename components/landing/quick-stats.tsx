'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Database, Layers, Gamepad2, Trophy } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  color: string;
}

function AnimatedNumber({ value }: { value: number }) {
  const [isInView, setIsInView] = useState(false);
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <motion.span
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true }}
    >
      {display}
    </motion.span>
  );
}

function StatItem({ icon, value, label, suffix = '', color }: StatItemProps) {
  return (
    <motion.div
      variants={staggerItem}
      className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${color}`}
      >
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
        <AnimatedNumber value={value} />
        {suffix}
      </div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </motion.div>
  );
}

export function QuickStats() {
  const stats = [
    {
      icon: <Database className="w-6 h-6 text-purple-600" />,
      value: 1025,
      suffix: '+',
      label: 'Pokemon',
      color: 'bg-purple-100',
    },
    {
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      value: 18,
      label: 'Types',
      color: 'bg-blue-100',
    },
    {
      icon: <Gamepad2 className="w-6 h-6 text-green-600" />,
      value: 9,
      label: 'Generations',
      color: 'bg-green-100',
    },
    {
      icon: <Trophy className="w-6 h-6 text-yellow-600" />,
      value: 100,
      suffix: '%',
      label: 'Free to use',
      color: 'bg-yellow-100',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            By the Numbers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your ultimate Pokemon companion with comprehensive data
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
