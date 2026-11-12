import React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import IdleJazz from '@/components/portfolio/IdleJazz'
import { BodyCustomCode, renderHeadCustomCode } from '@/lib/make-custom-code'
import { makeSiteSettings, sanitizeHtmlAttribute } from '@/lib/make-site-settings'
import './styles.css'

const defaultTitle = 'Himanshu Ranjan Raj — Product Designer'
const title = makeSiteSettings.title ?? defaultTitle
const description =
  makeSiteSettings.description ??
  'Product designer focused on clear systems, thoughtful interactions, and useful digital experiences.'
const favicon = makeSiteSettings.icons?.icon ?? '/favicon.svg'
const socialImage = makeSiteSettings.openGraph?.image
const googleAnalyticsId = sanitizeHtmlAttribute(makeSiteSettings.analytics?.googleAnalyticsId)
const figmaHydrationGuard = `
(() => {
  const attributeNames = ["data-fge-id", "data-fginspector-mode"];
  const selector = attributeNames.map((name) => \`[\${name}]\`).join(",");
  const savedAttributes = new Map();

  const stripAttributes = (element) => {
    if (!(element instanceof Element)) return;

    const elements = element.matches(selector)
      ? [element, ...element.querySelectorAll(selector)]
      : element.querySelectorAll(selector);

    elements.forEach((target) => {
      const saved = savedAttributes.get(target) || {};

      attributeNames.forEach((name) => {
        if (!target.hasAttribute(name)) return;
        if (!(name in saved)) saved[name] = target.getAttribute(name);
        target.removeAttribute(name);
      });

      savedAttributes.set(target, saved);
    });
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes") {
        stripAttributes(mutation.target);
        return;
      }

      mutation.addedNodes.forEach(stripAttributes);
    });
  });

  stripAttributes(document.documentElement);
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: attributeNames,
  });

  window.addEventListener("load", () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        observer.disconnect();
        savedAttributes.forEach((attributes, element) => {
          Object.entries(attributes).forEach(([name, value]) => {
            if (value !== null) element.setAttribute(name, value);
          });
        });
      });
    });
  }, { once: true });
})();
`

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title,
  description,
  robots: makeSiteSettings.robots?.index === false ? { follow: false, index: false } : undefined,
  icons: favicon ? { icon: favicon } : undefined,
  openGraph: {
    title,
    description,
    images: socialImage ? [socialImage] : undefined,
  },
  twitter: socialImage
    ? {
        card: 'summary_large_image',
        images: [socialImage],
      }
    : undefined,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const language = sanitizeHtmlAttribute(makeSiteSettings.language) || 'en'
  const addBypassLinks = makeSiteSettings.accessibility?.addBypassLinks === true
  const customScripts = makeSiteSettings.customScripts

  return (
    <html lang={language}>
      <head>
        {process.env.NODE_ENV === 'development' && (
          <Script id="figma-editor-hydration-guard" strategy="beforeInteractive">
            {figmaHydrationGuard}
          </Script>
        )}
        {renderHeadCustomCode(customScripts?.headStart, 'head-start')}
        {renderHeadCustomCode(customScripts?.headEnd, 'head-end')}
      </head>
      <body className="min-h-screen bg-white text-zinc-950 antialiased">
        <BodyCustomCode html={customScripts?.bodyStart} />
        {addBypassLinks && (
          <a className="figma-bypass-link" href="#root">
            Skip to content
          </a>
        )}
        <div id="root" tabIndex={-1}>
          {children}
        </div>
        <IdleJazz />
        {googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="figma-google-analytics" strategy="afterInteractive">
              {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(googleAnalyticsId)});
`}
            </Script>
          </>
        )}
        <BodyCustomCode html={customScripts?.bodyEnd} />
      </body>
    </html>
  )
}
