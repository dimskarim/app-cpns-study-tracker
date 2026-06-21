# PROMPT.md

## Project

CPNS Study Tracker — Offline Web Application

---

# Overview

Bangun aplikasi web offline untuk membantu pengguna melakukan tracking belajar CPNS.

Aplikasi bukan platform tryout dan bukan LMS.

Fokus:

* Jadwal belajar
* Materi & subbab belajar (custom)
* Catatan hasil tryout
* Statistik progres

Seluruh data berjalan secara lokal.

Tidak membutuhkan internet.

---

# Product Goal

Membantu pengguna mengetahui:

"Hari ini saya belajar apa?"

dan

"Bagaimana progres saya?"

---

# TECH STACK

## Frontend

Framework:
React 19

Build Tool:
Vite

Language:
TypeScript

Package Manager:
pnpm

---

## UI

Styling:
Tailwind CSS

Components:
shadcn/ui

Icons:
Lucide React

Animation:
Framer Motion

Charts:
Recharts

Form:
React Hook Form

Validation:
Zod

Date:
date-fns

---

## State Management

Global State:
Zustand

Server State:
Tidak digunakan

Context:
React Context (opsional)

---

## Storage (OFFLINE)

Primary Database:
IndexedDB

ORM:
Dexie.js

Backup:
JSON Export / Import

Settings:
LocalStorage

---

## Offline Support

PWA:
vite-plugin-pwa

Caching:
Workbox

Strategy:

App Shell

Cache First

Offline First

---

## Development

Lint:
ESLint

Formatter:
Prettier

Git Hooks:
Husky

Testing:
Vitest

Component Testing:
Testing Library

---

# Architecture

Frontend

↓

Pages

↓

Components

↓

Hooks

↓

Services

↓

Dexie Database

↓

IndexedDB

---

# Folder Structure

src/

app/

pages/

components/

ui/

features/

dashboard/

study/

tryout/

statistics/

db/

database.ts

schemas/

services/

hooks/

types/

utils/

constants/

assets/

styles/

---

# Design Direction

Style:
Modern Dashboard

Visual:
Minimal

Clean

Soft Gradient

Card Based

Mood:

Focus

Calm

Productive

---

# Theme

Primary Gradient

#1D4ED8

↓

#60A5FA

Primary

#2563EB

Accent

#38BDF8

Success

#22C55E

Warning

#F59E0B

Danger

#EF4444

Background

#F7FAFF

Card

#FFFFFF

Dark

#081120

Radius

16px

---

# Typography

Font:
Inter

Scale:

H1
32

H2
24

H3
20

Body
16

Caption
13

---

# Application Structure

Dashboard

Belajar
├── Jadwal
└── Materi

Tryout

Statistik

Pengaturan

---

# Page — Dashboard

Components:

Greeting

Progress Card

Today's Study

Last Tryout

Completed Materials

Study Chart

Quick Actions

---

# Page — Belajar

Tabs:

Jadwal

Materi

## Jadwal

Tambah

Edit

Checklist

Copy Mingguan

Fields:

Tanggal

Bab

Subbab

Durasi

Status

## Materi

User Custom

Features:

Tambah Bab

Tambah Subbab

Edit

Delete

Reorder

Search

Accordion

---

# Page — Tryout

Features:

Tambah

Riwayat

Detail

Fields:

Tanggal

TWK

TIU

TKP

Catatan

Total (Auto)

---

# Page — Statistik

Features:

Jam Belajar

Subbab Selesai

Tryout Average

Progress

Chart:

Weekly

Monthly

---

# Page — Pengaturan

Features:

Theme

Backup

Import

Export

Reset

---

# Database Schema

subjects

id

name

color

order

subtopics

id

subjectId

name

duration

completed

order

studyPlans

id

date

subjectId

subtopicId

status

tryouts

id

date

twk

tiu

tkp

notes

settings

theme

---

# Performance Rules

Load:
< 1 second

FPS:
60

Lighthouse:
90+

Bundle:
< 500 KB

Offline:
100%

---

# UX Rules

≤ 3 klik untuk input

Progress selalu terlihat

Responsive

Dark Mode

Empty State

Keyboard Friendly

---

# Deliverables

Figma

Design System

Responsive

Prototype

Developer Handoff

Production Ready

---

# Success Criteria

User dapat:

Tambah materi

Tambah subbab

Buat jadwal

Input tryout

Melihat progres

Semua berjalan tanpa internet
