---
name: image-generator
description: Generate images from prompts using the project-local image API configuration.
---

Use this skill when the user asks to generate an image for this project.

Requirements:
- `.env.local` must define `IMAGE_API_BASE_URL` and `IMAGE_API_KEY`

Supported parameters:
- `prompt` (required)
- `model` (`gpt-5-3`, `gpt-5-4-thinking`, `gpt-5-4-thinkin`; default `gpt-5-4-thinking`)
- `size` (format `WIDTHxHEIGHT`; default `1024x1024`)
- `image` (optional reference image URL array)
- `timeout_sec` (10-1800; default `300`)
- `debug_chatgpt_token` (optional string)
- `debug_account_tier` (`free` or `plus`)

Run:
`node --import tsx scripts/image-generator.ts '{"prompt":"...","model":"gpt-5-3","size":"1024x1024","image":["https://example.com/ref.png"],"timeout_sec":300,"debug_chatgpt_token":"token","debug_account_tier":"plus"}'`

Return:
- the generated image URLs on success
- a clear error message on failure
