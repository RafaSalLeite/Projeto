# Overview

MedScan is a React-based medical appointment management application built with Vite. The application provides a user-friendly interface for managing hospital appointments, user profiles, and medical services. It features a modern healthcare-focused design with comprehensive appointment scheduling capabilities and user authentication flows.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18.3.1 with TypeScript support
- **Build Tool**: Vite 7.1.2 for fast development and optimized production builds
- **UI Library**: PrimeReact 10.9.7 for consistent component design and styling
- **Icons**: PrimeIcons 7.0.0 for comprehensive icon coverage
- **Routing**: React Router DOM 7.8.2 for client-side navigation
- **Styling**: CSS modules with component-specific stylesheets for maintainable styling

## Component Structure
The application follows a modular component architecture with dedicated CSS files for each major component:
- **Authentication Components**: Login/registration forms with centralized styling
- **Layout Components**: Responsive menubar and page layouts
- **Feature Components**: Appointment management, user profiles, and hospital listings
- **Welcome/Landing Pages**: Branded welcome experience with logo integration

## Development Configuration
- **TypeScript Configuration**: Strict mode enabled with modern ES features
- **Vite Setup**: Configured for development server on port 5000 with host binding for Replit compatibility
- **Module System**: ES modules with React JSX transformation
- **Development Server**: Hot module reloading enabled for rapid development

## Design System
- **Color Scheme**: Healthcare-focused gradient background (#2C353C, #1A5C6B, #08839B)
- **Branding**: MedScan logo integration with consistent brand colors
- **Responsive Design**: Mobile-first approach with flexible card-based layouts
- **Accessibility**: Form validation and proper semantic HTML structure

# External Dependencies

## UI Framework Dependencies
- **PrimeReact**: Complete UI component library providing tables, forms, dialogs, and navigation components
- **PrimeIcons**: Icon library for consistent iconography across the application

## Development Dependencies
- **React & React DOM**: Core React framework for component-based UI development
- **TypeScript**: Type safety and enhanced development experience
- **Vite**: Modern build tool with fast HMR and optimized bundling
- **@vitejs/plugin-react**: Vite plugin for React support with JSX transformation

## Runtime Dependencies
- **React Router DOM**: Client-side routing for single-page application navigation

## Asset Dependencies
- **Custom Graphics**: MedScan logo and background assets for branding
- **External Flag Assets**: PrimeReact CDN for international flag imagery
- **Google Fonts**: Segoe UI font family for consistent typography