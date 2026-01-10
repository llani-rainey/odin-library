# Odin Library

A small library app from The Odin Project. Users can add books, toggle read status, and remove books. Book data is stored in a JavaScript array (`myLibrary`) and the UI is rendered from that data.

## Live Demo
- https://llani_rainey.github.io/odin-library/

## Features
- Add books (title, author, pages, read status)
- Prevent duplicates (same title + author, case/whitespace-insensitive)
- Display books in a table
- Toggle read/unread per book
- Remove books from the library

## Technologies Used
- HTML
- CSS
- JavaScript (DOM manipulation + event delegation)

## Learning Objectives
- Practice object constructors (`Book`) and managing collections in arrays
- Separate **data (source of truth)** from **UI (rendered view)**
- Implement basic CRUD:
  - Create: add a book
  - Read: render the library
  - Update: toggle read status
  - Delete: remove a book
- Use event delegation for dynamic elements

## Requirements Implemented
- Users can add books with details
- Books are displayed in an organized layout
- Books can be marked read/unread
- Books can be removed

## Project Structure
```text
03_library/
  index.html
  style.css
  script.js
