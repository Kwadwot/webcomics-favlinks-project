-- Drop table if it exists (useful for testing/resetting)
DROP TABLE IF EXISTS sites CASCADE;

-- Create the sites table
CREATE TABLE sites (
    id SERIAL PRIMARY KEY,
    site_name VARCHAR(100) NOT NULL,
    site_link VARCHAR(500) NOT NULL,
    comic_type VARCHAR(50) NOT NULL,
    popular_comic_name VARCHAR(200),
    popular_comic_link VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comic_type ON sites(comic_type);