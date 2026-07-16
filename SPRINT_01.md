# SPRINT_01.md

# Sprint 01

## Foundation Refactor

Sprint ID: S01

Version: 1.0

Duration: 1 Week

Status: Ready

---

# Sprint Goal

Refactor the existing React + Vite application into a scalable architecture **without changing the user interface, animations, styling, or business functionality.**

The website should look and behave exactly the same after this sprint.

This sprint focuses on developer experience, maintainability, and future scalability.

---

# Sprint Objectives

- Reduce technical debt
- Improve project structure
- Extract reusable components
- Create feature-based architecture
- Improve code readability
- Preserve existing UI
- Prepare for future development

---

# Out of Scope

The following are NOT allowed during Sprint 01:

- UI redesign
- New features
- Color changes
- Typography changes
- Animation changes
- Content updates
- Dependency upgrades
- Technology migration
- SEO enhancements
- CMS integration

---

# Epic

## EPIC-01

Architecture Refactor

---

# User Stories

## RM-001

As a developer,

I want a scalable folder structure

so future features are easier to build.

Priority

Critical

---

## RM-002

As a developer,

I want reusable layout components

so the homepage becomes modular.

Priority

Critical

---

## RM-003

As a developer,

I want homepage sections extracted

so App.jsx becomes easy to understand.

Priority

Critical

---

## RM-004

As a developer,

I want business features isolated

so business logic is separated from presentation.

Priority

High

---

## RM-005

As a developer,

I want shared UI components

so future pages remain consistent.

Priority

Medium

---

# Deliverables

Create the following folders.

```

src/

├── components/
│
├── sections/
│
├── features/
│
├── hooks/
│
├── utils/
│
├── lib/
│
├── data/
│
├── styles/
│
└── assets/

```

---

# Component Extraction

Extract

- Navbar
- Footer
- Hero
- Products
- Story
- Sourcing
- Testimonials
- FAQ
- Contact

---

# Feature Extraction

Move

Bulk Inquiry

Cost Calculator

Availability Finder

into

```

features/

```

---

# UI Components

Prepare reusable components.

Button

Card

Container

Section

Heading

Badge

Modal

Input

Textarea

---

# Acceptance Criteria

✅ Website looks identical

✅ Responsive behaviour unchanged

✅ Three.js works

✅ Build succeeds

✅ No console errors

✅ No broken imports

✅ No duplicated code

✅ App.jsx becomes composition only

---

# Technical Rules

Do NOT

- change colors
- change spacing
- change animations
- change fonts
- rename business content
- install libraries

Allowed

- move files
- rename folders
- extract components
- clean imports
- improve readability

---

# Code Quality Goals

Maximum component size

250 lines

Maximum function size

40 lines

Avoid nested ternaries.

Avoid duplicated JSX.

Avoid repeated Tailwind classes where practical.

---

# Pull Requests

This sprint will use small pull requests.

PR-001

Project Structure

PR-002

Navbar

Footer

PR-003

Hero

PR-004

Products

PR-005

Business Features

PR-006

Cleanup

---

# Testing Checklist

Desktop

Chrome

Safari

Firefox

Edge

Mobile

Android

iPhone

Tablet

Landscape

Portrait

---

# QA Checklist

Navigation works

Animations preserved

Forms work

Calculator works

Three.js works

No layout shifts

No broken images

No console warnings

No accessibility regressions

---

# Performance Checklist

Build succeeds

No bundle increase

Images unchanged

Animations smooth

No unnecessary renders

---

# Definition of Done

Sprint is complete only if

- All pull requests merged
- Documentation updated
- Build passes
- UI unchanged
- Technical review approved
- Product Owner approved

---

# Deliverable

At the end of Sprint 01 the codebase should be significantly cleaner while the user cannot visually detect any changes.

The project should be ready for Sprint 02.

---

# Next Sprint

Sprint 02

Business Experience

Product Pages

Recipe Centre

Blog

Distributor Portal

SEO Foundation
