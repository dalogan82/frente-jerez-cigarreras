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
      bundleIdentifier: "com.dalogan.frentejerezapp"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.dalogan.frentejerezapp"
    },
    web: {
      favicon: "./assets/favicon.png"
    },

    // 👇 Esta parte es la que EAS necesita para funcionar correctamente
    extra: {
      eas: {
        projectId: "c4ace6cc-704c-44c1-b2c6-80b4bd9abc94"
      }
    },

    // (Opcional, pero útil para evitar problemas de arquitectura)
    experiments: {
      turboModules: false,
      concurrentRoot: false
    }
  }
};
