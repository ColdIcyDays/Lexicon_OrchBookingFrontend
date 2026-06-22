import {defineConfig, loadEnv} from 'vite'
import fs from "fs"

import path from "path"
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_")
  const currentTarget : string = "http://localhost:5294" //"http://localhost:5294"//"http://localhost:5003" /*lexicon_orchbookingbackend:8080*/
  console.log("The current target is: " + currentTarget);
  return {
    plugins: [
      react(),
      tailwindcss(),
      babel({ presets: [reactCompilerPreset()]})
    ],
    server: {
      host: "0.0.0.0",
      proxy: {
        '/WeatherForecast': {
          target: currentTarget,
          changeOrigin: true,
          secure: false
        },
        '/api/Show/GetVenues': {
          target: currentTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              proxyReq.setHeader("origin", currentTarget);
            })
          }
        },
        '/api/Show/UploadVenue': {
          target: currentTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              proxyReq.setHeader("origin", currentTarget);
            })
          }
        },
        '/Account/Auth/Logout': {
          target: currentTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) =>
          {
            proxy.on('proxyReq', (proxyReq, req, res) =>
            {
              proxyReq.setHeader("origin", currentTarget);
            })
          }
        },
        '/api/Show/UploadShow': {
          target: currentTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              proxyReq.setHeader("origin", currentTarget);
            })
          }
        },
        '/api/Show/UploadProgram': {
          target: currentTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              proxyReq.setHeader("origin", currentTarget);
            })
          }
        },
        '/api/Show/GetShows': {
          target: currentTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              proxyReq.setHeader("origin", currentTarget);
            })
          }
        },
        '/api/Show/GetPrograms': {
          target: currentTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              proxyReq.setHeader("origin", currentTarget);
            })
          }
        },
        '/api/Blog/GetBlogs': {
          target: currentTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              proxyReq.setHeader("origin", currentTarget);
            })
          }
        },
        '/api/Blog/UploadBlog': {
          target: currentTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              proxyReq.setHeader("origin", currentTarget);
            })
          }
        },
        '/Account/Auth/Login': {
          target: currentTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              proxyReq.setHeader("origin", currentTarget);
            })
          }
        },
        '/Account/Auth/AccountInfo': {
          target: currentTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              proxyReq.setHeader("origin", currentTarget);
            })
          }
        },
        '/Account/Auth/CheckAuth': {
          target: currentTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              proxyReq.setHeader("origin", currentTarget);
            })
          }
        },
        '/Account/Auth/ModifyUserRole': {
          target: currentTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              proxyReq.setHeader("origin", currentTarget);
            })
          }
        },
        '/Account/Auth/Register': {
          target: currentTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              proxyReq.setHeader("origin", currentTarget);
            })
          }
        }
      }
    }
  }
})


/*
* import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()]})
  ],
  server: {
    host: "0.0.0.0",
    proxy: {
      '/WeatherForecast': {
        target: 'http://lexicon_orchbookingbackend:8080',
        changeOrigin: true,
        secure: false
      },
      '/Account/Auth/Login': {
        target: 'http://lexicon_orchbookingbackend:8080',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader("origin", "http://lexicon_orchbookingbackend:8080");
          })
        }
      },
      '/Account/Auth/AccountInfo': {
        target: 'http://lexicon_orchbookingbackend:8080',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader("origin", "http://lexicon_orchbookingbackend:8080");
          })
        }
      },
      '/Account/Auth/CheckAuth': {
        target: 'http://lexicon_orchbookingbackend:8080',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader("origin", "http://lexicon_orchbookingbackend:8080");
          })
        }
      },
      '/Account/Auth/ModifyUserRole': {
        target: 'http://lexicon_orchbookingbackend:8080',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader("origin", "http://lexicon_orchbookingbackend:8080");
          })
        }
      },
      '/Account/Auth/Register': {
        target: 'http://lexicon_orchbookingbackend:8080',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader("origin", "http://lexicon_orchbookingbackend:8080");
          })
        }
      }
    }
  }
})
*/