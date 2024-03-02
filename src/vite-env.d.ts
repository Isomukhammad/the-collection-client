/// <reference types="vite/client" />
import en from "@/locales/en/en.json";
import ru from "@/locales/ru/ru.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "en";
    resources: {
      en: typeof en;
      ru: typeof ru;
    };
  }
}
