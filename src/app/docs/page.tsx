'use client'

import Link from 'next/link'
import { BarChart3, ArrowLeft, Copy, Check } from 'lucide-react'
import { useState } from 'react'

export default function Docs() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const trackingScript = `<script>
  (function() {
    var apiKey = 'YOUR_API_KEY';
    var endpoint = 'https://craig-o-metrics.vercel.app/api/track';
    
    // Track page view
    function trackPageView() {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: apiKey,
          type: 'pageview',
          data: {
            path: window.location.pathname,
            referrer: document.referrer,
            sessionId: sessionStorage.getItem('com_session') || crypto.randomUUID()
          }
        })
      });
    }
    
    // Track custom event
    window.comTrack = function(eventName, properties) {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: apiKey,
          type: 'event',
          data: {
            name: eventName,
            properties: properties,
            path: window.location.pathname,
            sessionId: sessionStorage.getItem('com_session')
          }
        })
      });
    };
    
    trackPageView();
  })();
</script>`

  const npmInstall = `npm install @craig-o/metrics`

  const reactUsage = `import { MetricsProvider, useTrack } from '@craig-o/metrics';

function App() {
  return (
    <MetricsProvider apiKey="YOUR_API_KEY">
      <MyApp />
    </MetricsProvider>
  );
}

function MyComponent() {
  const track = useTrack();
  
  return (
    <button onClick={() => track('button_click', { buttonId: 'cta' })}>
      Click Me
    </button>
  );
}`

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Craig-O-Metrics</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
        <p className="text-xl text-gray-600 mb-12">
          Get started with Craig-O-Metrics in minutes.
        </p>

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Create an account</h3>
              <p className="text-gray-600 mb-4">
                Sign up for Craig-O-Metrics and add your first website. You&apos;ll receive a unique API key.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Add the tracking script</h3>
              <p className="text-gray-600 mb-4">
                Add this script to your website, just before the closing <code className="bg-gray-100 px-2 py-1 rounded">&lt;/head&gt;</code> tag:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{trackingScript}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(trackingScript, 'script')}
                  className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                >
                  {copied === 'script' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. View your analytics</h3>
              <p className="text-gray-600">
                That&apos;s it! Visit your dashboard to see real-time analytics data.
              </p>
            </div>
          </div>
        </section>

        {/* React/Next.js */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">React / Next.js</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Install the package</h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                  <code>{npmInstall}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(npmInstall, 'npm')}
                  className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                >
                  {copied === 'npm' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage</h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{reactUsage}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(reactUsage, 'react')}
                  className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                >
                  {copied === 'react' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">API Reference</h2>
          
          <div className="space-y-8">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <code className="text-sm">
                  <span className="text-green-600 font-bold">POST</span>{' '}
                  <span className="text-gray-900">/api/track</span>
                </code>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">Track a pageview or custom event.</p>
                <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
                <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`{
  "apiKey": "your-api-key",
  "type": "pageview" | "event",
  "data": {
    "path": "/page-path",
    "name": "event_name",        // for events
    "properties": { ... },       // optional
    "referrer": "https://...",   // optional
    "sessionId": "session-id"    // optional
  }
}`}
                </pre>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <code className="text-sm">
                  <span className="text-blue-600 font-bold">GET</span>{' '}
                  <span className="text-gray-900">/api/analytics</span>
                </code>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">Get analytics data for a site.</p>
                <h4 className="font-semibold text-gray-900 mb-2">Query Parameters</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><code className="bg-gray-100 px-1 rounded">siteId</code> - Your site ID</li>
                  <li><code className="bg-gray-100 px-1 rounded">range</code> - Time range (24h, 7d, 30d, 90d)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Help?</h2>
          <p className="text-gray-600">
            Contact us at{' '}
            <a href="mailto:support@craig-o-metrics.com" className="text-blue-600 hover:text-blue-700">
              support@craig-o-metrics.com
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}
