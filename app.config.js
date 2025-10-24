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
      bundler: "metro",
      favicon: "./assets/favicon.png",
      name: "Frente Jerez App",
      shortName: "FrenteJerez",
      display: "standalone",
      backgroundColor: "#ffffff",
      themeColor: "#800080",
      orientation: "portrait"
    },

    extra: {
      eas: {
        projectId: "9e52578c-8169-475e-817b-fa5f92eb6671"
      }
    },

    experiments: {
      turboModules: false,
      concurrentRoot: false
    }
  }
};
