/**
 * Modern SEO Component for 2025
 * Copyright (c) 2025 Comibyte Team. All Rights Reserved.
 * 
 * PROPRIETARY AND CONFIDENTIAL
 * 
 * This software is the exclusive property of Comibyte Team.
 * Unauthorized copying, modification, distribution, or use of this software,
 * via any medium, is strictly prohibited.
 * 
 * This software was developed with significant time and effort.
 * Any unauthorized use, reproduction, or distribution of this software
 * or its contents is strictly prohibited and may result in severe legal penalties.
 * 
 * For licensing inquiries, please contact: Misterhge@gmail.com
 */

import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image = "/og-image.png", 
  url, 
  structuredData,
  pageType = "website",
  author = "Comibyte Team",
  siteName = "Konverter - Professional Data Format & Code Minifier"
}) => {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullUrl = url ? `https://Kon-verter.web.app${url}` : "https://Kon-verter.web.app/";
  const fullImage = image.startsWith('http') ? image : `https://Kon-verter.web.app${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={pageType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content="@ComibyteTeam" />
      <meta name="twitter:site" content="@ComibyteTeam" />

      {/* Additional Meta Tags for 2025 */}
      <meta name="theme-color" content="#2563EB" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      
      {/* Name variations for better searchability */}
      <meta name="alternate-name" content="Konverter" />
      <meta name="alternate-name" content="Comibyte" />
      <meta name="alternate-name" content="CSV JSON Converter" />
      <meta name="alternate-name" content="Code Minifier" />
      <meta name="alternate-name" content="Data Converter" />
      
      {/* Mobile and App specific */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Konverter" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
