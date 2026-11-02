#!/bin/bash
echo "========================================================"
echo "  SMART AI - BUILD MACOS APPLICATION (.DMG / .APP)"
echo "========================================================"
npm install --include=dev
npm run build:mac
echo "Done! The macOS app (.dmg) is located in the dist/ folder."
