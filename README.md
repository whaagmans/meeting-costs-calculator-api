# 💾 Meeting Costs Calculator API

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=whaagmans_meeting-costs-calculator-api&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=whaagmans_meeting-costs-calculator-api)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=whaagmans_meeting-costs-calculator-api&metric=bugs)](https://sonarcloud.io/summary/new_code?id=whaagmans_meeting-costs-calculator-api)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=whaagmans_meeting-costs-calculator-api&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=whaagmans_meeting-costs-calculator-api)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=whaagmans_meeting-costs-calculator-api&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=whaagmans_meeting-costs-calculator-api)

## 📢 Overview

The **Meeting Costs Calculator API** is the backend service powering the Meeting Costs Calculator. This API facilitates user management, meeting room creation, and real-time cost tracking using WebSockets. Built with **NestJS**, **Fastify**, and **Prisma**, it ensures optimal performance, scalability, and efficiency.

## 🔮 Planned Features

The following features are currently under development:

- **User-Created Meeting Rooms**: Generate shareable links with optional passwords.
- **Real-Time Updates**: Keep all participants in sync via WebSockets.
- **Secure Salary Input**: Users can enter salaries privately without exposing them to others.
- **Persistent Meetings**: Pause and resume meetings with saved room data.
- **User Authentication & Roles**: Secure access for different user types.
- **Enhanced Analytics**: Generate detailed reports on meeting costs.
- **OAuth Support**: Enable login via Google, GitHub, and other providers.

## 🛠 Tech Stack

- **Framework**: NestJS
- **Server**: Fastify
- **Database ORM**: Prisma (PostgreSQL)
- **WebSockets**: Integrated for real-time synchronization

## 🔧 Installation

### Prerequisites

- Node.js & npm installed
- Docker & Docker Compose installed

### Setup Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/whaagmans/meeting-costs-calculator-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd meeting-costs-calculator-api
   ```

3. Ensure you're using the correct Node.js version:

   ```bash
   nvm use
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start required services using Docker Compose:

   ```bash
   docker-compose up -d
   ```

6. Run database migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

7. Start the API server:

   ```bash
   npm run start:dev
   ```

## 🤝 Contributing

We welcome contributions! To contribute, follow these steps:

1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b feature-name`.
3. **Implement your changes**.
4. **Push your changes**: `git push origin feature-name`.
5. **Submit a pull request**.

## 📜 License

This project is licensed under the MIT License, allowing free use and modifications.

---

🚀 **Start tracking your meeting costs with a robust backend!**

