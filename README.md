# Senior Full Stack Engineer - Performance Task Setup

This repository contains the starting code for the Innovare performance task.

## Overview

-   `/student-insights-widget-v2`: A React application representing the "before" state of a key dashboard component.
-   `/mock-data-endpoint`: A simple Node.js server that simulates the legacy data source for the widget.

## How to Run

You will need two separate terminal windows.

**Terminal 1: Start the Mock Data Endpoint**

```bash
cd mock-data-endpoint
npm install
npm start
```
**Run Tests:**
```bash
cd mock-data-endpoint
npm install
npm test
```

**Terminal 2: Start the Insights Widget Endpoint**

```bash
cd student-insights-widget-v2
npm install
npm start

**Run Tests:**
```bash
cd student-insights-widget-v2
npm install --legacy-peer-deps
npm test -- --watchAll=false
```