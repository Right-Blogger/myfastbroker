import mysql from 'mysql2/promise';

// ─── Connection Pool ──────────────────────────────────────────────────────────

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!pool) {
    pool = mysql.createPool({
      uri: url,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: 'utf8mb4',
    });
  }
  return pool;
}

export function isUsingMysql(): boolean {
  return !!process.env.DATABASE_URL;
}

// ─── Schema Initialization ────────────────────────────────────────────────────

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS cms_posts (
  id VARCHAR(36) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content LONGTEXT,
  category VARCHAR(100),
  category_slug VARCHAR(100),
  author VARCHAR(255),
  author_role VARCHAR(255),
  published_at DATETIME,
  updated_at DATETIME,
  scheduled_at DATETIME,
  reading_time VARCHAR(50),
  featured_image TEXT,
  image_alt TEXT,
  status ENUM('draft','published','scheduled') DEFAULT 'draft',
  key_takeaways JSON,
  tags JSON,
  seo_title TEXT,
  seo_description TEXT,
  primary_keyword VARCHAR(255),
  secondary_keywords JSON,
  og_image TEXT,
  canonical_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_posts_status (status),
  INDEX idx_posts_slug (slug),
  INDEX idx_posts_published_at (published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cms_pages (
  id VARCHAR(36) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content LONGTEXT,
  published_at DATETIME,
  updated_at DATETIME,
  status ENUM('draft','published') DEFAULT 'draft',
  featured_image TEXT,
  image_alt TEXT,
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
  canonical_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_pages_status (status),
  INDEX idx_pages_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cms_revisions (
  id VARCHAR(36) PRIMARY KEY,
  content_id VARCHAR(36) NOT NULL,
  timestamp DATETIME NOT NULL,
  snapshot JSON NOT NULL,
  INDEX idx_revisions_content_id (content_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

let schemaInitialized = false;

export async function ensureSchema(): Promise<void> {
  if (schemaInitialized) return;
  const p = getPool();
  if (!p) return;

  try {
    const connection = await p.getConnection();
    const statements = SCHEMA_SQL.split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    for (const stmt of statements) {
      await connection.execute(stmt);
    }
    connection.release();
    schemaInitialized = true;
    console.log('[CMS] MySQL schema initialized successfully');
  } catch (error) {
    console.error('[CMS] Failed to initialize MySQL schema:', error);
    throw error;
  }
}
