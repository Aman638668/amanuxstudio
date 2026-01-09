<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            max-width: 75rem;
            margin: 0 auto;
            padding: 2rem;
          }
          h1 {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          p {
            color: #666;
            margin-bottom: 2rem;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            font-size: 0.9rem;
          }
          th {
            text-align: left;
            padding: 1rem;
            border-bottom: 1px solid #ddd;
            background: #f8f9fa;
            font-weight: 600;
            color: #444;
          }
          td {
            padding: 1rem;
            border-bottom: 1px solid #eee;
          }
          tr:hover td {
            background-color: #f8f9fa;
          }
          a {
            color: #2563eb;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .count {
            background: #eef2ff;
            color: #3730a3;
            padding: 0.2rem 0.6rem;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 500;
            margin-left: 1rem;
          }
        </style>
      </head>
      <body>
        <h1>XML Sitemap</h1>
        <p>
          This is an XML Sitemap, meant for search engines like Google, Bing and Yahoo.
          <span class="count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs</span>
        </p>
        
        <table>
          <thead>
            <tr>
              <th width="60%">URL</th>
              <th width="20%">Priority</th>
              <th width="20%">Change Freq</th>
              <th width="20%">Last Modified</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                </td>
                <td>
                  <xsl:value-of select="sitemap:priority"/>
                </td>
                <td>
                  <xsl:value-of select="sitemap:changefreq"/>
                </td>
                <td>
                  <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
