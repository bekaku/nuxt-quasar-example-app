// https://nuxt.com/docs/api/configuration/nuxt-config
// https://nuxt.com/modules/quasar
// import bootstrapIcons from 'quasar/icon-set/svg-bootstrap-icons'
import bootstrapIcons from 'quasar/icon-set/svg-bootstrap-icons'
const fileNames = [
  'app',
  'base',
  'helper',
  'model',
  'error',
]

function getFileList(locale: string) {
  return fileNames.map(name => `${locale}/${name}.ts`)
}
export default defineNuxtConfig({
  // app: {
  //   head: {
  //     title: 'Quasar + Nuxt',
  //     meta: [
  //       { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //       { name: 'keywords', content: 'Nuxt Quasar Example, Vue Quasar Example' },
  //       { hid: 'description', name: 'description',content: 'ElementPlus + Nuxt3',},
  //     ],
  //     link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  //   }
  // },
  build: {
    transpile: ['form-data'],
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-quasar-ui',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/device'
  ],
  compatibilityDate: '2024-12-14',
  css: [
    '~/assets/css/color.scss',
    '~/assets/css/app.scss',
    '~/assets/css/typography.scss',
  ],
  devtools: { enabled: true },
  devServer: {
    port: 3003
  },
  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: {
    compatibilityVersion: 4,
  },
  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        iso: 'en',
        // file: 'en/index.ts',
        files: getFileList('en'),
      },
      {
        code: 'th',
        iso: 'th',
        // file: 'th/index.ts',
        files: getFileList('th'),
      },
    ],
    // vueI18n: 'i18n.config.ts',
    // lazy: true,
    langDir: 'locales',
    defaultLocale: 'th',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'locale',
      fallbackLocale: 'th',
    },
  },
  quasar: {
    // Configurable Component Defaults
    appConfigKey: 'nuxtQuasarCustom',
    config: {
      loadingBar: {
        color: 'primary',
      },
      // brand: {
      //   primary: '#2e86de',
      //   secondary: '#1dd1a1',
      //   accent: '#1dd1a1',
      //   positive: '#23d160',
      //   negative: '#ff3860',
      //   info: '#00a0dc',
      //   warning: '#ff9f43',
      // },
    },
    extras: {
      // font: 'roboto-font',
      // fontIcons: ['bootstrap-icons'],
      // animations: 'all',// https://v2.quasar.dev/options/animations
    },
    plugins: [
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',
    ],
    cssAddon: true,
    // sassVariables: true,
    sassVariables: '~/assets/css/quasar.variables.scss',
    quietSassWarnings: true,
    iconSet: {
      ...bootstrapIcons,
    },
    components: {
      defaults: {
        QBtn: {
          unelevated: false,
        },
        QLinearProgress: {
          color: 'primary',
          size: '15px',
          stripe: true,
        },
        QCircularProgress: {
          color: 'primary',
          indeterminate: true,
        },
        QSelect: {
          outlined: true,
          dense: true,
        },
        QInput: {
          outlined: true,
        },
        QToggle: {
          color: 'primary',
        },
      },
    },
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',// can be overridden by NUXT_API_SECRET environment variable
    // Keys within public, will be also exposed to the client-side
    public: {
      apiDomain: 'localhost',//override by NUXT_PUBLIC_API_BASE in .env
      apiBase: '/api',//override by NUXT_PUBLIC_API_BASE in .env
      cdnBase: '/api',
      apiClient: '',
      timeOut: 0,
      appVersion: '',
      codeVersion: 0,
      webUrl: '',
      defaultLocale: 'th',
      jwtKeyName: '_token',
      refreshJwtKeyName: '_refresh_token',
      currentUserKeyName: '_current_user',
      jwtAges: 7,//days
      jwtAgesSecond: 604800,//7 days = 7 * 24 * 60 * 60 = 604800 seconds
    }
  },
  ssr: true,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['import', 'global-builtin', 'legacy-js-api'],
        },
        sass: {
          silenceDeprecations: ['import', 'global-builtin', 'legacy-js-api'],
        }
      },
    },
  },
  vue: {
    compilerOptions: {
      // isCustomElement: (tag) => tag.startsWith('swiper-'),
      isCustomElement: (tag) => [
        'swiper-container', 'swiper-slide',
        'cropper-canvas', 'cropper-image', 'cropper-shade', 'cropper-handle', 'cropper-selection', 'cropper-grid', 'cropper-crosshair', 'cropper-viewer'
      ].includes(tag)
    }
  },
})