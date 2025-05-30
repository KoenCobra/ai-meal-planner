# Bubu AI Request Cancellation

This directory implements AI-powered recipe generation with request cancellation support using the Vercel AI SDK and AbortController API.

## Implementation

### API Routes (with AbortSignal Support)

- `app/api/ai/generate-recipe/route.ts` - Generate recipes from text descriptions
- `app/api/ai/generate-image/route.ts` - Generate images for recipes
- `app/api/ai/analyze-image/route.ts` - Analyze food images to generate recipes

### Client Functions

- `client-actions.ts` - Client-side functions that call the API routes with abort signal support

### Components

- `BubuAiForm.tsx` - Form component with cancel functionality
- `BubuAiResponse.tsx` - Display component for generated recipes

## Usage

The form component creates AbortController instances for each request and allows users to cancel ongoing AI operations by clicking the "Cancel" button. Requests are automatically aborted when:

1. User clicks the cancel button
2. Component unmounts
3. User navigates away from the page
4. Browser tab is closed

## Migration

The original server actions in `actions.ts` are deprecated in favor of the new API routes that support request cancellation. The new implementation:

- Uses Next.js App Router API routes instead of server actions
- Forwards the request's abort signal to the AI SDK calls
- Handles cleanup on component unmount
- Provides better user experience with cancellation feedback

## Technical Details

- Uses `req.signal` to forward abort signals from Vercel Functions
- Implements proper error handling for cancelled requests (status 499)
- Maintains rate limiting functionality
- Preserves all existing features while adding cancellation support
