// https://nuxt.com/docs/api/configuration/nuxt-config
// https://nuxt.com/modules/quasar
import bootstrapIcons from 'quasar/icon-set/svg-bootstrap-icons'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: {
    port: 3003
  },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', 'nuxt-quasar-ui', '@vueuse/nuxt'],
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',// can be overridden by NUXT_API_SECRET environment variable
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: '/api',//override by NUXT_PUBLIC_API_BASE in .env
      cdnBase: '/api',
      apiClient: '',
      timeOut: 0,
      appVersion: '',
      codeVersion: 0,
      webUrl: '',
      defaultLocale: 'th',
      jwtKeyName: 'token',
      refreshJwtKeyName: 'refresh_token',
      jwtAges: 30,//days
    }
  },
  // css
  css: [
    '~/assets/scss/color.scss',
    '~/assets/scss/app.scss',
    '~/assets/scss/typography.scss',
  ],
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  },
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
      isCustomElement: (tag) =>
        ['swiper-container', 'swiper-slide'].includes(tag)
    }
  },
  app: {
    head: {
      title: 'Quasar + Nuxt 3',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: 'Nuxt Quasar Example, Vue Quasar Example' },
        {
          hid: 'description',
          name: 'description',
          content: 'ElementPlus + Nuxt3',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
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
      fontIcons: ['bootstrap-icons'],
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
    sassVariables: '~/assets/scss/quasar.variables.scss',
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
  }

})