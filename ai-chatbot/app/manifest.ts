import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'AI Chatbot',
        short_name: 'CHatAI',
        description: 'AI based chat application',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: 'rgba(8,8,18,0.98)',
        icons: [
            {
              src: '/tomato_logo.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/tomato_logo.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/tomato-smiling.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/tomato-smiling.png',
              sizes: '512x512',
              type: 'image/png',
            },
        ],
    }
}