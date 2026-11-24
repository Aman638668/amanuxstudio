import { Helmet } from 'react-helmet-async';

export interface FaqItem {
  question: string;
  answer: string;
}

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
  faqItems?: FaqItem[];
}

const Seo = ({
  title,
  description = "Aman UX Studio is a digital studio led by web developer and UI/UX designer Aman Sharma. Crafting high-converting custom WordPress websites, fast WooCommerce stores, and modern digital experiences.",
  image = "/og-image.jpg",
  url,
  type = 'website',
  keywords = "web design, ui ux designer, custom wordpress development, woocommerce speed, aman sharma, website redesign, freelance web developer new delhi",
  publishedTime,
  modifiedTime,
  author = "Aman Sharma",
  category = "Web Development & UI/UX",
  faqItems
}: SeoProps) => {
  const siteTitle = "Aman UX Studio";
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  const siteOrigin = "https://amanuxstudio.vercel.app";
  const fullUrl = url ? `${siteOrigin}${url.startsWith('/') ? url : `/${url}`}` : siteOrigin;
  const fullImageUrl = image.startsWith('http') ? image : `${siteOrigin}${image.startsWith('/') ? image : `/${image}`}`;

  // Organization Schema (Studio Profile)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteOrigin}/#organization`,
    "name": "Aman UX Studio",
    "url": siteOrigin,
    "logo": `${siteOrigin}/aman-ux-studio.png`,
    "image": fullImageUrl,
    "description": "Digital studio specializing in high-converting custom WordPress development, speed tuning, and UI/UX design.",
    "founder": {
      "@type": "Person",
      "name": "Aman Sharma",
      "jobTitle": "Web Developer & UI/UX Designer",
      "url": `${siteOrigin}/about`
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New Delhi",
      "addressRegion": "DL",
      "addressCountry": "IN"
    },
    "priceRange": "$$",
    "areaServed": "Global",
    "sameAs": [
      "https://github.com/Aman638668",
      "https://www.linkedin.com/in/aman-sharma-4b772124a/",
      "https://x.com/amanuxstudio"
    ]
  };

  // Breadcrumb Schema
  const breadcrumbSchema = url && url !== '/' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteOrigin
      },
      ...(url.startsWith('/blog/') ? [
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Journal",
          "item": `${siteOrigin}/blog`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": title,
          "item": fullUrl
        }
      ] : [
        {
          "@type": "ListItem",
          "position": 2,
          "name": title,
          "item": fullUrl
        }
      ])
    ]
  } : null;

  // FAQ Schema (for Google Rich Snippets & AI Citations)
  const faqSchema = faqItems && faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  // Article / WebSite Schema
  let pageSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteOrigin}/#website`,
    "name": "Aman UX Studio",
    "url": siteOrigin,
    "description": description,
    "publisher": {
      "@id": `${siteOrigin}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteOrigin}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  if (type === 'article') {
    pageSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title.substring(0, 110),
      "description": description,
      "image": [fullImageUrl],
      "inLanguage": "en-US",
      "articleSection": category,
      "keywords": keywords,
      "datePublished": publishedTime || "2026-03-01T00:00:00Z",
      "dateModified": modifiedTime || publishedTime || "2026-03-01T00:00:00Z",
      "author": {
        "@type": "Person",
        "name": author,
        "jobTitle": "Web Developer & UI/UX Designer",
        "url": `${siteOrigin}/about`,
        "sameAs": [
          "https://github.com/Aman638668",
          "https://www.linkedin.com/in/aman-sharma-4b772124a/"
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Aman UX Studio",
        "logo": {
          "@type": "ImageObject",
          "url": `${siteOrigin}/aman-ux-studio.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": fullUrl
      }
    };
  }

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Article Specific Open Graph */}
      {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {type === 'article' && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && <meta property="article:author" content={author} />}
      {type === 'article' && category && <meta property="article:section" content={category} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content="@amanuxstudio" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(pageSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default Seo;
