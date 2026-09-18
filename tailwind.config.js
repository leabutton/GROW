/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        village: {
          orange: {
            DEFAULT: '#FF6A0C',
            hover: '#E65A00',
            light: '#FFF0E6',
            dark: '#CC5200',
          },
          black: '#000000',
          slate: {
            DEFAULT: '#1A1A1A',
            dark: '#111111',
            card: '#222222',
            elevated: '#2A2A2A',
            border: '#333333',
            muted: '#8E8E93',
          },
          blue: {
            DEFAULT: '#3DB5E6', // Gym & Swim
            light: '#E6F7FD',
          },
          lime: {
            DEFAULT: '#A8E000', // HIIT / Fitness
            light: '#F4FCE8',
          },
          amber: {
            DEFAULT: '#F5A623', // Pub & Grill
            light: '#FEF6E9',
          },
          purple: {
            DEFAULT: '#8B5CF6', // Parties & Events
            light: '#F3E8FF',
          },
          gray: {
            DEFAULT: '#6B7280', // VWorks
          },
          green: {
            DEFAULT: '#49D67C', // Booking Revolution / Success
            light: '#E8FBF0',
          }
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 20px rgba(255, 106, 12, 0.35)',
        'glow-sm': '0 0 10px rgba(255, 106, 12, 0.2)',
        'card-dark': '0 4px 20px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
