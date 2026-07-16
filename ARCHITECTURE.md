````markdown
# ARCHITECTURE.md

# Rainbow Masala Digital Platform Architecture

Version: 1.0

Status: Active

---

# Purpose

This document defines the architecture, folder structure, coding standards, design principles, and engineering decisions for the Rainbow Masala Digital Platform.

The objective is to ensure that the project remains maintainable, scalable, and easy to extend as new features are introduced.

This document is the single source of truth for all technical decisions.

---

# Architecture Philosophy

The project follows these principles:

- Component Driven Development
- Feature Based Architecture
- Separation of Concerns
- Reusable UI Components
- Performance First
- Mobile First
- SEO First
- Accessibility by Default

---

# High Level Architecture

```
Browser
        │
        ▼
React Application (Vite)
        │
        ▼
Pages / Sections
        │
        ▼
Reusable Components
        │
        ▼
Business Features
        │
        ▼
Utilities
        │
        ▼
Static Data (Current)

Future

CMS
API
Database
Analytics
```

---

# Project Folder Structure

```
src/

│
├── app/
│
│   ├── App.jsx
│   ├── AppRoutes.jsx
│   └── providers.jsx
│
├── assets/
│
│   ├── images/
│   ├── icons/
│   ├── videos/
│   ├── logos/
│   └── fonts/
│
├── components/
│
│   ├── ui/
│   │
│   ├── Button/
│   ├── Card/
│   ├── Badge/
│   ├── Modal/
│   ├── Input/
│   ├── Select/
│   ├── Tabs/
│   ├── Accordion/
│   └── Spinner/
│   │
│   ├── layout/
│   │
│   ├── Navbar/
│   ├── Footer/
│   ├── Section/
│   └── Container/
│   │
│   ├── shared/
│   │
│   ├── Reveal/
│   ├── TiltCard/
│   ├── HeroBackground/
│   └── ScrollIndicator/
│
├── sections/
│
│   ├── Hero/
│   ├── Trust/
│   ├── Products/
│   ├── ProductCategories/
│   ├── CostCalculator/
│   ├── Sourcing/
│   ├── Recipes/
│   ├── Story/
│   ├── Timeline/
│   ├── Testimonials/
│   ├── Distributor/
│   ├── FAQ/
│   ├── Contact/
│   └── FooterCTA/
│
├── features/
│
│   ├── BulkInquiry/
│   ├── AvailabilityFinder/
│   ├── ProductFilter/
│   ├── Search/
│   ├── Newsletter/
│   └── WhatsApp/
│
├── hooks/
│
│   ├── useReveal.js
│   ├── useScroll.js
│   ├── useWindowSize.js
│   └── useMediaQuery.js
│
├── data/
│
│   ├── products.js
│   ├── recipes.js
│   ├── testimonials.js
│   ├── faqs.js
│   ├── sourcing.js
│   └── distributors.js
│
├── lib/
│
│   ├── constants.js
│   ├── colors.js
│   ├── typography.js
│   ├── spacing.js
│   └── animations.js
│
├── services/
│
│   ├── whatsapp.js
│   ├── enquiry.js
│   ├── analytics.js
│   └── seo.js
│
├── utils/
│
│   ├── formatCurrency.js
│   ├── formatDate.js
│   ├── slugify.js
│   ├── validators.js
│   └── helpers.js
│
├── styles/
│
│   ├── globals.css
│   ├── typography.css
│   └── animations.css
│
└── main.jsx
```

---

# Component Architecture

Every component belongs to one category.

## UI

Reusable visual elements.

Examples

Button

Card

Badge

Input

Modal

Accordion

---

## Layout

Responsible for page layout.

Examples

Navbar

Footer

Container

Section

Grid

---

## Sections

Business sections that compose pages.

Examples

Hero

Recipes

Products

Testimonials

---

## Features

Self-contained business functionality.

Examples

Bulk Inquiry

Cost Calculator

Availability Finder

Product Search

---

# State Management

Current

React Hooks

useState

useMemo

useEffect

Future

Context API

Only when necessary.

Avoid unnecessary global state.

---

# Data Strategy

Current

Static JavaScript Objects

Future

CMS

Products

Recipes

Blogs

Testimonials

FAQ

Media

The UI should never depend on hardcoded values.

---

# Routing Strategy

Current

Single Page

Future

/

about

products

products/:slug

recipes

recipes/:slug

blogs

blogs/:slug

distributors

contact

privacy-policy

terms

---

# Naming Convention

Components

PascalCase

```
HeroSection.jsx
```

Hooks

camelCase

```
useReveal.js
```

Utilities

camelCase

```
formatCurrency.js
```

Folders

PascalCase

```
Hero/
Navbar/
```

Constants

UPPER_CASE

```
PRIMARY_COLOR
```

---

# Styling

Tailwind CSS

Custom CSS only when necessary.

Avoid inline styles except for:

- Dynamic colors
- Canvas
- Three.js
- Animation calculations

---

# Animation Principles

Animations should support storytelling.

Never distract.

Maximum duration

600ms

Preferred easing

ease-out

Respect

prefers-reduced-motion

---

# Performance Strategy

Code Splitting

Lazy Loading

Image Optimization

Memoization

Minimal Re-renders

Avoid unnecessary effects

---

# Accessibility

Semantic HTML

Keyboard Navigation

ARIA Labels

Visible Focus States

Proper Heading Hierarchy

Color Contrast

---

# SEO Architecture

Each page should have

Title

Description

Canonical URL

Open Graph

Twitter Card

Schema.org

Breadcrumb

Future

Dynamic Sitemap

Robots.txt

Structured Data

---

# Security

No secrets in frontend

Validate all forms

Escape dynamic values

Sanitize inputs

Spam protection for forms

---

# Error Handling

Every feature should fail gracefully.

Example

Three.js

↓

Fallback Illustration

↓

Error Boundary

↓

User never sees a blank screen

---

# Future Integrations

Phase 2

CMS

Analytics

Newsletter

CRM

---

Phase 3

Dealer Portal

Authentication

Dashboard

Inventory

ERP

---

# Development Rules

Never create duplicate components.

Never duplicate CSS.

Keep components under approximately 250 lines where practical.

Extract repeated logic.

Prefer composition over inheritance.

Business logic belongs inside Features.

UI belongs inside Components.

Page composition belongs inside Sections.

---

# Architecture Decision Records (ADR)

Major architectural decisions should be documented.

Example

ADR-001

Remain on Vite instead of migrating to Next.js.

Reason

Faster delivery

Lower migration risk

Existing codebase already stable

Future migration remains possible.

---

# Definition of Good Architecture

A new developer should understand the project within one hour.

A feature should be added without modifying unrelated files.

A component should be reusable in multiple places.

Business logic should not be tightly coupled to presentation.

The codebase should remain understandable after 100+ features.

---

# Final Principle

> **Build for the next five years, not the next five days.**

Every architectural decision should improve maintainability, scalability, and developer experience while preserving the premium user experience of the Rainbow Masala Digital Platform.
````
