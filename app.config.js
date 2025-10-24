export default {
  expo: {
    name: "FrenteJerezApp",
    slug: "frente-jerez-cigarreras",
    version: "1.0.9",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",

    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },

    assetBundlePatterns: ["**/*"],

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.dalogan.frentejerezapp",
      buildNumber: "1"
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.dalogan.frentejerezapp",
      versionCode: 1
    },

    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro",
      name: "Frente Jerez App",
      shortName: "FrenteJerez",
      backgroundColor: "#ffffff",
      themeColor: "#ffffff",
      webManifest: "./manifest.json"
    },

    extra: {
      eas: {
        projectId: "9e52578c-8169-475e-817b-fa5f92eb6671"
      }
    },

    // 🚫 Evita errores de TurboModules en iOS recientes y Expo Web
    experiments: {
      turboModules: false,
      concurrentRoot: false
    }
  }
};
