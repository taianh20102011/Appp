/**
 * SMART AI - Secure Preload Script
 * Ensures complete context isolation and security sandbox
 */

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('SMART_DESKTOP', {
  isDesktop: true,
  platform: process.platform,
  version: '1.0.0'
});
