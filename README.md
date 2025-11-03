# Glenn Dalbey - Professional Portfolio

A modern, full-stack portfolio website showcasing professional experience, projects, skills, certifications, and technical expertise in analytics, machine learning, and data science.

## Overview

This portfolio website is built with cutting-edge web technologies to provide a responsive, performant, and interactive experience. It features automated GitHub project synchronization, an AI-powered chatbot assistant, dynamic resume management, and a comprehensive contact system with email and SMS notifications.

## Key Features

### Core Sections
- **Hero Section**: Professional introduction with smooth animations and visual appeal
- **About Section**: Detailed professional background and expertise overview
- **Projects Portfolio**: Dynamic project showcase with GitHub integration and automatic synchronization
- **Skills Matrix**: Organized technical skills by category with proficiency levels
- **Certifications**: Professional certifications and credentials display
- **Resume Management**: Cloud-hosted resume with version control and downloadable access
- **Contact Form**: Multi-channel communication system with email and SMS notifications

### Technical Highlights
- **AI-Powered Chat Assistant**: Integrated chatbot using Groq API for visitor interaction
- **GitHub Synchronization**: Automated project data sync from GitHub repositories
- **Cloud Storage**: AWS S3 integration for resume and asset management
- **Database-Driven**: PostgreSQL database with Prisma ORM for structured data management
- **Responsive Design**: Mobile-first approach with Tailwind CSS utilities
- **Type Safety**: Full TypeScript implementation for robust code quality
- **Modern UI Components**: Radix UI primitives for accessible, composable interfaces

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.2
- **Styling**: Tailwind CSS 3.3
- **UI Components**: Radix UI, shadcn/ui components
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Yup/Zod validation
- **State Management**: Zustand, Jotai
- **Data Fetching**: SWR, TanStack Query

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma 6.16
- **Authentication**: NextAuth.js 4.24

### External Services
- **AI Integration**: Groq API for chatbot functionality
- **Email Service**: Resend API for transactional emails
- **SMS Service**: Twilio for text notifications
- **Cloud Storage**: AWS S3 for file management
- **Version Control**: GitHub with automated project syncing

### Development Tools
- **Package Manager**: Yarn
- **Linting**: ESLint with TypeScript and React Hooks plugins
- **Build Tool**: Next.js compiler with SWC
- **Deployment**: Nixpacks configuration for containerized deployment

## Data Models

The application uses Prisma ORM with the following core models:

- **Contact**: Visitor contact form submissions with status tracking
- **Project**: GitHub-synced project data with metadata
- **Skill**: Technical skills organized by category and proficiency
- **Resume**: Version-controlled resume files with cloud storage paths
- **Certification**: Professional certifications and credentials
- **GitHubSync**: GitHub synchronization status and history

## Project Structure

```
glenn-portfolio/
├── app/                    # Next.js App Router pages and layouts
│   ├── api/               # API route handlers
│   │   ├── certifications/
│   │   ├── chat/          # AI chatbot endpoint
│   │   ├── contact/       # Contact form handler
│   │   ├── projects/      # Projects CRUD operations
│   │   ├── resume/        # Resume management
│   │   └── skills/        # Skills data endpoints
│   ├── live-demos/        # Interactive project demos
│   ├── resume/            # Resume page route
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI primitives
│   ├── about-section.tsx
│   ├── ai-chatbot-section.tsx
│   ├── certifications-section.tsx
│   ├── contact-section.tsx
│   ├── hero-section.tsx
│   ├── navigation.tsx
│   ├── projects-section.tsx
│   ├── resume-section.tsx
│   └── skills-section.tsx
├── lib/                   # Utility functions and configurations
├── hooks/                 # Custom React hooks
├── data/                  # Static data files
├── prisma/               # Database schema and migrations
│   └── schema.prisma     # Prisma data models
├── public/               # Static assets
│   └── resume/           # Resume files
├── scripts/              # Automation scripts
│   └── seed.ts           # Database seeding
└── [config files]        # TypeScript, Tailwind, Next.js, etc.
```

## Prerequisites

- Node.js 18+ or 20+
- PostgreSQL database
- Yarn package manager
- AWS account with S3 bucket (for resume storage)
- Groq API key (for AI chatbot)
- Resend API key (for email notifications)
- Twilio account (optional, for SMS notifications)
- GitHub personal access token (for project synchronization)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/XxRemsteelexX/glenn-portfolio.git
cd glenn-portfolio
```

2. Install dependencies:
```bash
yarn install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio"

# Groq AI
GROQ_API_KEY="your_groq_api_key"

# AWS S3
AWS_PROFILE=default
AWS_REGION=us-west-2
AWS_BUCKET_NAME=your-bucket-name
AWS_FOLDER_PREFIX=uploads/

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV=development

# GitHub Integration
GITHUB_TOKEN="your_github_token"
GITHUB_USERNAME="XxRemsteelexX"

# Email (Resend)
RESEND_API_KEY="your_resend_key"

# SMS (Twilio - Optional)
TWILIO_ACCOUNT_SID="your_twilio_sid"
TWILIO_AUTH_TOKEN="your_twilio_token"
TWILIO_PHONE_NUMBER="your_twilio_number"
```

4. Set up the database:
```bash
yarn db:setup
```

This command will:
- Generate Prisma client
- Push schema to database
- Run seed script to populate initial data

5. Run the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production (includes Prisma generation)
- `yarn start` - Start production server
- `yarn lint` - Run ESLint checks
- `yarn db:setup` - Initialize database and seed data

## API Endpoints

### Projects
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/sync` - Sync projects from GitHub

### Skills
- `GET /api/skills` - Fetch all skills
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Certifications
- `GET /api/certifications` - Fetch all certifications
- `POST /api/certifications` - Create new certification
- `PUT /api/certifications/:id` - Update certification
- `DELETE /api/certifications/:id` - Delete certification

### Resume
- `GET /api/resume` - Get active resume information
- `POST /api/resume/upload` - Upload new resume version
- `GET /api/resume/download` - Get presigned download URL

### Contact
- `POST /api/contact` - Submit contact form (triggers email/SMS)
- `GET /api/contact` - Fetch contact submissions (admin)

### Chat
- `POST /api/chat` - Send message to AI chatbot
- `GET /api/chat/history` - Retrieve chat history

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

### Contact
Stores visitor inquiries with name, email, subject, message, phone, company, and status tracking.

### Project
Manages project portfolio with GitHub integration, including name, description, technologies, URLs, stars, forks, and sync timestamps.

### Skill
Organizes technical skills by category with proficiency levels and years of experience.

### Resume
Tracks resume versions with cloud storage paths, versioning, and active status.

### Certification
Stores professional certifications with issuer, dates, credential information, and featured status.

### GitHubSync
Maintains GitHub synchronization state with username, last sync time, repository count, and status.

## Features in Detail

### AI Chatbot Assistant
The integrated AI assistant uses the Groq API to provide intelligent responses to visitor questions about your background, skills, projects, and experience. The chatbot is context-aware and trained on your portfolio information.

### GitHub Project Synchronization
Automatically syncs project data from your GitHub profile, including:
- Repository names and descriptions
- Stars and forks count
- Primary programming language
- Live demo and repository URLs
- Last update timestamps

### Resume Management
- Upload multiple resume versions
- Cloud storage via AWS S3
- Presigned URL generation for secure downloads
- Version control with active resume selection
- File size and metadata tracking

### Contact System
Multi-channel notification system:
- Email notifications via Resend API
- SMS alerts via Twilio (optional)
- Form validation with React Hook Form
- Status tracking (new, read, responded)
- Anti-spam measures

## Deployment

The application includes a `nixpacks.toml` configuration for containerized deployment. Compatible with:
- Vercel
- Railway
- Render
- AWS ECS
- Any platform supporting Nix-based builds

### Build Configuration
The build process:
1. Generates Prisma client
2. Compiles TypeScript
3. Builds Next.js production bundle
4. Optimizes static assets

### Environment Configuration
Ensure all environment variables are set in your deployment platform, including:
- Database connection string
- API keys for external services
- AWS credentials for S3 access
- Public URL for absolute path generation

## Security Considerations

- All API keys stored as environment variables
- Database credentials never committed to version control
- AWS S3 presigned URLs with expiration
- Input validation on all forms
- SQL injection protection via Prisma ORM
- XSS protection with React's built-in escaping
- CSRF protection for form submissions

## Performance Optimizations

- Server-side rendering with Next.js App Router
- Image optimization (unoptimized flag for development flexibility)
- Code splitting and lazy loading
- SWR caching for API requests
- Prisma query optimization
- Tailwind CSS purging for minimal bundle size

## Browser Support

Configured to support:
- Internet Explorer 11+
- Modern browsers with >0.5% usage
- Last 2 versions of major browsers
- Actively maintained browsers

## Contributing

This is a personal portfolio project. However, if you find bugs or have suggestions:

1. Open an issue describing the problem or enhancement
2. Fork the repository
3. Create a feature branch
4. Submit a pull request with detailed description

## License

This project is private and proprietary. All rights reserved.

## Contact

**Glenn Dalbey**

- GitHub: [@XxRemsteelexX](https://github.com/XxRemsteelexX)
- LinkedIn: [Connect on LinkedIn](https://www.linkedin.com/in/glenn-dalbey)
- Portfolio: Visit live site for contact form

---

**Specializing in Analytics, Machine Learning, and Data Science Solutions**

Built with Next.js, TypeScript, and modern web technologies.
