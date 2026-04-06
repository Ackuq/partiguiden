# Scraper Agent Guidelines

This directory contains the party data scrapers for Partiguiden. When working in this package, please adhere to these specific findings and workflows:

## Technical Findings

- **Selector Stability**: Swedish party websites (like Vänsterpartiet) often use CMS-generated IDs (e.g., `#template-s6_M7Q_F\#0`) that change frequently. **Mandate**: Always prefer stable, semantic classes (e.g., `.vp-page`, `.spolitik-content`) over auto-generated IDs when defining `opinionTags` or `listSelector`.
- **URL Filtering**: Many "Politics A-Ö" pages use anchor links (`#`) for navigation within the same page. The base `Scraper` class now skips these automatically, but future scraper implementations should be aware of this pattern.
- **Graceful Degradation**: The scraping process should not fail the entire party if a single URL is malformed or an attribute is missing. Using `undefined` returns and filtering in `handleLinks` is the preferred pattern.
- **Data Sanitization**: Web content often contains excessive whitespace. The base `Scraper.getOpinions` now handles trimming and empty-string filtering, so individual scrapers should avoid duplicating this logic unless they have very specific cleaning needs.

## Common Workflows

### Debugging a Scraper

To debug a specific scraper, use the `-p` flag with the `scrape` script:

```bash
pnpm --filter @partiguiden/scrapers scrape -p [party_abbreviation]
```

Replace `[party_abbreviation]` with the party's abbreviation (e.g., `s`, `c`, `kd`, `l`, `m`, `mp`, `sd`, `v`).

### Verifying Scraper Outputs

After making changes to a scraper, always run it in isolation and check the resulting JSON data in `packages/party-data/src/data/parties/` to ensure the content is correctly extracted and formatted.
