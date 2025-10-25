export default {
  expo: {
    name: "FrenteJerezApp",
    slug: "frente-jerez-cigarreras",
    version: "1.0.9",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",

    splash: {
      image: "./assets/icon.png",        // Usa el mismo logo como splash
      resizeMode: "contain",
      backgroundColor: "#6A038D",        // 💜 fondo morado del logo
    },

    assetBundlePatterns: ["**/*"],

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.dalogan.frentejerezapp",
      buildNumber: "1",
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#6A038D",      // mismo fondo morado
      },
      package: "com.dalogan.frentejerezapp",
      versionCode: 1,
    },

    web: {
      favicon: "./assets/favicon.ico",   // el que ya creaste 💛
      backgroundColor: "#5E1381",
      themeColor: "#FFD700",             // dorado del logo
    },

    extra: {
      eas: {
        projectId: "9e52578c-8169-475e-817b-fa5f92eb6671",
      },
    },

    experiments: {
      turboModules: false,
      concurrentRoot: false,
    },
  },
};
