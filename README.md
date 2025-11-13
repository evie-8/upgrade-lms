# Upgrade-LMS

[![Next.js](https://img.shields.io/badge/Next.js-13.5.0-blue?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.0-blue?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0.0-blue?style=flat&logo=prisma)](https://www.prisma.io/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4.24.0-blue?style=flat&logo=nextauth)](https://next-auth.js.org/)

**Upgrade-LMS** is a modern, scalable Learning Management System (LMS) built with Next.js. It provides a comprehensive platform for educators and learners to manage courses, track progress, and facilitate interactive learning experiences. Designed with performance, security, and user experience in mind, this LMS supports features like user authentication, course creation, enrollment, quizzes, and analytics.

This project is ideal for educational institutions, online course creators, or anyone looking to deploy a customizable LMS. It's fully responsive, accessible, and extensible.

## ✨ Features

- **User Authentication & Authorization**: Secure login/signup with NextAuth.js, supporting email/password, social logins (Google, GitHub), and role-based access (Admin, Instructor, Student).
- **Course Management**: Create, edit, and publish courses with multimedia support (videos, PDFs, quizzes). Organize into modules and lessons.
- **Student Enrollment & Progress Tracking**: Self-enrollment or admin-assigned access. Real-time progress dashboards with completion certificates.
- **Interactive Quizzes & Assessments**: Multiple-choice, essay, and timed quizzes with auto-grading and feedback.
- **Discussion Forums**: Threaded discussions per course for peer interaction and instructor moderation.
- **Analytics & Reporting**: Dashboards for instructors (student performance) and admins (system usage metrics).
- **File Upload & Storage**: Integrated with cloud storage (e.g., AWS S3 or Vercel Blob) for course materials.
- **Notifications**: Email and in-app notifications for enrollments, deadlines, and updates.
- **API-First Design**: RESTful API endpoints for easy integration with mobile apps or third-party tools.
- **Multi-Language Support**: Built-in i18n for English, Spanish, and French (extensible).
- **Accessibility Compliance**: WCAG 2.1 AA compliant with ARIA labels and keyboard navigation.

## 🛠 Tech Stack

| Category          | Technology                  | Version    | Purpose                          |
|-------------------|-----------------------------|------------|----------------------------------|
| **Framework**     | Next.js                     | 13.5.0    | Full-stack React framework       |
| **Language**      | TypeScript                  | 5.0       | Type-safe JavaScript             |
| **Styling**       | Tailwind CSS                | 3.3.0     | Utility-first CSS framework      |
| **Database**      | PostgreSQL (via Prisma)     | Latest    | ORM for schema management        |
| **Auth**          | NextAuth.js                 | 4.24.0    | Authentication provider          |
| **UI Components** | Shadcn/UI & Radix UI        | Latest    | Accessible, customizable components |
| **State Management** | Zustand                  | 4.4.0     | Lightweight state management     |
| **File Handling** | Uploadthing                 | Latest    | File uploads with progress       |
| **Deployment**    | Vercel                      | Latest    | Serverless deployment            |
| **Testing**       | Jest + React Testing Library| Latest    | Unit and integration tests       |
| **Linting/Formatting** | ESLint + Prettier      | Latest    | Code quality enforcement         |

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database (local or cloud-hosted, e.g., Supabase, Neon)
- Git
- Yarn or npm

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/evie-8/upgrade-lms.git
   cd upgrade-lms
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Environment Setup**
   Copy the example environment file and configure your variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/upgrade_lms?schema=public"

   # NextAuth.js
   NEXTAUTH_SECRET="your-super-secret-key"  # Generate with `openssl rand -base64 32`
   NEXTAUTH_URL="http://localhost:3000"

   # Email Provider (for notifications, e.g., Resend)
   RESEND_API_KEY="your-resend-api-key"

   # File Storage (optional, e.g., Uploadthing)
   UPLOADTHING_SECRET="your-uploadthing-secret"
   UPLOADTHING_APP_ID="your-app-id"
   ```

4. **Database Setup**
   Run Prisma migrations to set up your database schema:
   ```bash
   yarn db:generate  # Generate Prisma client
   yarn db:migrate   # Run migrations
   yarn db:seed      # Optional: Seed with sample data
   ```

5. **Run the Development Server**
   ```bash
   yarn dev
   # or
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser. You'll see the landing page.

### Production Deployment

- **Vercel (Recommended)**: Connect your GitHub repo to Vercel, add environment variables in the dashboard, and deploy with one click.
- **Docker**: Use the provided `Dockerfile` and `docker-compose.yml` for containerized deployment.
  ```bash
  docker-compose up -d
  ```
- **Other Platforms**: Supports Railway, Render, or any Node.js host.

## 📖 Usage

### For Students
1. Sign up or log in at `/auth/signin`.
2. Browse courses at `/courses`.
3. Enroll in a course: Click "Enroll Now" on the course page.
4. Access dashboard at `/dashboard` to view enrolled courses and progress.
5. Complete lessons, take quizzes, and participate in forums.

### For Instructors
1. Log in with instructor role (assigned by admin).
2. Navigate to `/instructor/courses` to create/manage courses.
3. Upload materials via the rich editor in lesson creation.
4. Monitor student progress in the analytics tab.

### For Admins
1. Access admin panel at `/admin`.
2. Manage users, courses, and system settings.
3. View global reports and configure integrations.

### API Usage
The backend exposes a public API at `/api`. Authenticated endpoints require a JWT token in the `Authorization` header.

Example: Fetch enrolled courses
```bash
curl -H "Authorization: Bearer <token>" https://your-domain.com/api/courses/enrolled
```

Full API docs available at `/api/docs` (powered by Swagger/OpenAPI).

## 🧪 Testing

Run tests with:
```bash
yarn test
yarn test:e2e  # End-to-end tests with Playwright
```

Coverage reports are generated in `/coverage`.

## 📁 Project Structure

```
upgrade-lms/
├── app/                  # Next.js App Router pages and layouts
│   ├── (auth)/           # Authentication routes
│   │   ├── signin/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/      # Protected dashboard routes
│   │   ├── courses/      # Course listing and details
│   │   ├── progress/     # Student progress tracker
│   │   └── analytics/    # Reports and insights
│   ├── admin/            # Admin panel
│   ├── instructor/       # Instructor tools
│   ├── api/              # API routes (e.g., /api/courses)
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn/UI primitives
│   ├── forms/            # Form components (e.g., CourseForm)
│   └── layout/           # Header, Sidebar, etc.
├── lib/                  # Utilities and configurations
│   ├── auth.ts           # NextAuth config
│   ├── db.ts             # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema and migrations
│   ├── schema.prisma
│   └── seed.ts
├── public/               # Static assets (images, icons)
├── scripts/              # Build and deployment scripts
├── tests/                # Test files (unit, integration)
├── .env.example          # Environment variables template
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind setup
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies and scripts
```

## 🔧 Customization

- **Themes**: Modify `tailwind.config.js` for custom colors/fonts.
- **Add Providers**: Extend NextAuth in `lib/auth.ts` for new login methods.
- **Database Models**: Edit `prisma/schema.prisma` and run `yarn db:push`.
- **New Features**: Follow the [Next.js App Router docs](https://nextjs.org/docs/app) for adding pages/routes.

## 🤝 Contributing

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit changes: `git commit -m 'Add amazing feature'`.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

### Guidelines
- Use TypeScript for all new code.
- Write tests for new features.
- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.
- Ensure code passes linting: `yarn lint`.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
