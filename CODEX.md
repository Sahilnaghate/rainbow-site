# CODEX.md

# Rainbow Masala Digital Platform

## Codex Engineering Guide

Version: 1.0

Status: Active

---

# Purpose

This document defines how Codex should work on this repository.

The objective is to ensure every change improves the project without introducing technical debt, visual regressions, or architectural inconsistencies.

Codex should behave as a Senior Frontend Engineer, not as a code generator.

---

# Primary Goal

Build a maintainable, scalable, production-ready React application.

Every change should improve:

- Architecture
- Readability
- Performance
- Accessibility
- Reusability

without changing the approved design.

---

# Technology Stack

Frontend

React 18

Build Tool

Vite

Styling

Tailwind CSS v4

Animation

Three.js

Language

JavaScript

Deployment

Vercel

---

# Project Philosophy

DO NOT redesign.

DO NOT reinvent.

DO NOT replace working code.

Improve architecture while preserving behaviour.

---

# Before Writing Code

Always read

README.md

PROJECT.md

ARCHITECTURE.md

DESIGN_SYSTEM.md

SPRINT_01.md

TASK-XXX.md

before making changes.

---

# Golden Rule

The user interface should remain unchanged unless the task explicitly requests a redesign.

---

# Architecture Rules

Follow the folder structure.

src/

components/

sections/

features/

hooks/

lib/

utils/

styles/

assets/

data/

Never place unrelated files together.

---

# Component Rules

Keep components focused.

Target

150–250 lines

Maximum

300 lines

Extract repeated logic.

Avoid giant files.

---

# App.jsx

App.jsx should only compose sections.

Good

<App>

<Navbar />

<Hero />

<Products />

<Contact />

</App>

Bad

2000+ lines of JSX.

---

# Business Logic

Business logic belongs inside

features/

Never inside

components/

---

# UI Components

Reusable UI belongs inside

components/ui/

Examples

Button

Card

Badge

Input

Modal

Accordion

Container

---

# Layout Components

Navbar

Footer

Section

Grid

Container

belong inside

components/layout/

---

# Styling Rules

Use Tailwind utilities first.

Avoid custom CSS unless absolutely necessary.

Never duplicate utility classes repeatedly.

Create reusable wrappers where appropriate.

---

# Naming

Components

PascalCase

Hero.jsx

Hooks

camelCase

useReveal.js

Utilities

camelCase

formatCurrency.js

Folders

PascalCase

Hero/

Products/

---

# Imports

Group imports.

Example

React

Third Party

Components

Features

Utilities

Styles

Never use wildcard imports.

---

# State Management

Prefer local state.

Avoid global state unless required.

Use

useState

useMemo

useCallback

only when justified.

---

# Performance

Prefer

React.memo

Lazy Loading

Memoization

Avoid

Unnecessary effects

Repeated renders

Heavy inline functions

---

# Accessibility

Every interactive element should have

Accessible labels

Keyboard navigation

Focus states

Semantic HTML

WCAG AA

---

# Error Handling

Never allow blank screens.

Gracefully handle

Images

Three.js

Forms

Network requests

---

# Responsive Design

Always preserve

Desktop

Tablet

Mobile

Landscape

Portrait

---

# Three.js

Do not modify Three.js unless explicitly requested.

Protect

Fallback

Error Boundary

Loading State

Performance

---

# Dependencies

Never install packages without explicit approval.

Always prefer existing utilities.

---

# Refactoring Rules

Refactor only what the task specifies.

Never perform unrelated refactoring.

Small pull requests.

Small commits.

---

# Pull Requests

Each PR should address only one task.

Example

RM-001

Folder Structure

RM-002

Navbar

RM-003

Hero

Not multiple unrelated changes.

---

# Code Review Checklist

Before completion verify

✓ Build succeeds

✓ No console errors

✓ No warnings

✓ Responsive

✓ No duplicated code

✓ Existing functionality preserved

✓ Existing animations preserved

---

# Definition of Done

Task complete means

Code builds

Tests pass (if applicable)

UI unchanged

Architecture improved

Documentation updated

Ready for review

---

# Forbidden

Do not

- redesign UI
- rename unrelated files
- change branding
- replace libraries
- introduce unnecessary dependencies
- modify colors
- modify typography
- remove animations

unless explicitly instructed.

---

# Preferred Development Style

Small incremental improvements.

One task.

One PR.

One review.

Then merge.

---

# Decision Priority

When making engineering decisions

1. Maintainability
2. Simplicity
3. Performance
4. Accessibility
5. Scalability

Never optimize prematurely.

---

# If Unsure

Do not guess.

Leave TODO comments.

Ask for clarification.

Prefer safe changes.

---

# Engineering Principle

Write code that another engineer can understand in five minutes.

Not code that impresses in five seconds.

---

# Project Motto

Build for the next five years.

Not the next five days.
