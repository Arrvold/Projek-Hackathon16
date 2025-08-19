'use client'

import { Zap, Shield, Users, BarChart3, Clock, Globe } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built for speed and performance. Get results in milliseconds, not minutes.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with end-to-end encryption and compliance standards.'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together seamlessly with real-time collaboration tools.'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Get deep insights with powerful analytics and reporting features.'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock support from our dedicated team of experts.'
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Deploy anywhere with our global infrastructure and CDN.'
  }
]

export default function Features() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We've built the most comprehensive solution for modern businesses. 
            Here's what makes us different.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <feature.icon className="w-6 h-6 text-primary-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
