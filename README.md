# Blog API - NestJS + PostgreSQL

This is a Blog API built using NestJS and PostgreSQL where authenticated users can create, edit, delete blogs, and set them as public or private. Public blogs are accessible to all visitors, and visitors can search for public blogs by title or partial title. JWT-based authentication is implemented for signup and login functionality.

## Features
- JWT Authentication: Secure signup and login functionality using JSON Web Tokens (JWT).
- Blog Management: Authenticated users can create, edit, and delete blogs.
- Privacy Controls: Users can mark blogs as public or private.
- Public Blog Access: Visitors can access public blogs without needing to log in.
- Search Functionality: Visitors can search for public blogs by title or a part of the title.
- Postman Collection: Includes a Postman collection for API testing.

## Tech Stack
- Framework: NestJS (Node.js Framework)
- Database: PostgreSQL
- ORM: Prisma
- Authentication: JWT (JSON Web Tokens)