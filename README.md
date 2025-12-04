# Webcomics FavLinks

A full-stack web application for managing and organizing your favorite webcomic reading sites. Track sites, their comic types (comics, manga, manhwa, manhua), and their most popular comics all in one place.

## Features

- **Create**: Add new webcomic reading sites with details
- **Read**: View all saved sites in a clean table format
- **Update**: Edit existing site information
- **Delete**: Remove sites from your collection
- **Database Integration**: All data is persisted in PostgreSQL

## Technologies Used

### Frontend
- **React** - UI library for building interactive components
- **Vite** - Fast build tool and development server
- **React Hooks** - useState for state management
- **Props** - Component communication

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for building RESTful APIs
- **PostgreSQL** - Relational database for data persistence
- **pg** (node-postgres) - PostgreSQL client for Node.js
- **dotenv** - Environment variable management

## Project Structure

```
webcomics-favlinks-project/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── LinkContainer.jsx
│ │ │ ├── Table.jsx
│ │ │ └── Form.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── dist/ # Production build output
│ └── package.json
├── server/ # Express backend
│ ├── index.js # Express server setup
│ ├── queries.js # Database query functions
│ ├── .env # Environment variables (not committed)
│ └── package.json
├── schema.sql # Database schema
├── seed.sql # Sample data (optional)
└── README.md

## Database Schema

The `sites` table contains the following fields:
- `id` - Primary key (auto-increment)
- `site_name` - Name of the webcomic reading site
- `site_link` - URL to the site
- `comic_type` - Type of comics (comics, manga, manhwa, manhua, etc.)
- `popular_comic_name` - Name of the site's most popular comic
- `popular_comic_link` - URL to the popular comic
- `created_at` - Timestamp of when the record was created

## API Endpoints

- `GET /sites` - Retrieve all sites
- `POST /sites` - Create a new site
- `PUT /sites/:id` - Update a site
- `DELETE /sites/:id` - Delete a site

## Future Enhancements

- Search and filter functionality
- Categories and tags

## Author

Kwadwot