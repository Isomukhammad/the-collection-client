/// <reference types="vite/client" />
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

declare module "i18next" {
  interface Resources {
    defaultNS: "en";
    resources: {
      en: typeof en;
      ru: typeof ru;
    };
  }
}
