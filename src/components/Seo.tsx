import { Helmet } from 'react-helmet-async';

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
}

const Seo = ({
    title,
    description = "Aman UX Studio - Digital Solutions & Web Development Agency",
    image = "/og-image.jpg",
    url,
    type = 'website',
    keywords,
    publishedTime,
    modifiedTime,
    author = "Aman UX Studio"
}: SeoProps) => {
    const siteTitle = "Aman UX Studio";
    const fullTitle = `${title} | ${siteTitle}`;
    const fullUrl = url ? `https://amanuxstudio.com${url}` : 'https://amanuxstudio.com';

    // JSON-LD Schema Generation
    let schemaData: any = {
        "@context": "https://schema.org",
        "@type": type === 'article' ? "BlogPosting" : "WebSite",
        "name": fullTitle,
        "description": description,
        "url": fullUrl,
    };

    if (type === 'article') {
        schemaData = {
            ...schemaData,
            "headline": title.substring(0, 110),
            "image": image ? [`https://amanuxstudio.com${image}`] : [],
            "datePublished": publishedTime,
            "dateModified": modifiedTime || publishedTime,
            "author": {
                "@type": "Person",
                "name": author
            },
            "publisher": {
                "@type": "Organization",
                "name": siteTitle,
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://amanuxstudio.com/aman-ux-studio.png"
                }
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": fullUrl
            }
        };
    } else {
        schemaData = {
            ...schemaData,
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://amanuxstudio.com/blog?search={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        };
    }

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Article Specific Tags */}
            {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {type === 'article' && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
            {type === 'article' && author && <meta property="article:author" content={author} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};

export default Seo;
