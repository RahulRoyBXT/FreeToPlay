// This file extends/overrides Next.js types to fix TypeScript errors
import type { Metadata } from 'next';

// Define custom PageProps interface to fix TypeScript errors with dynamic routes
declare module 'next' {
  // Fix the typing issue by making params compatible with Next.js 15.3.0
  interface PageProps {
    params?: Record<string, string>;
    searchParams?: Record<string, string | string[]>;
  }
}

export {};