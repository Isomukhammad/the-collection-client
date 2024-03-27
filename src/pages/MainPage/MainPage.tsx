import { JSX } from "react";
import { useTranslation } from "react-i18next";

import BiggestCollectionsSection from "@/components/sections/BiggestCollectionsSection";
import Hero from "@/components/shared/Hero";
import ItemsTable from "@/components/tables/ItemsTable";

const MainPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <main className={"container my-5"}>
      <Hero />
      <BiggestCollectionsSection />
      <ItemsTable title={t("Last added items")} link={"/items?order_by=createdAt&order_direction=desc&quantity=5"} />
    </main>
  );
};

export default MainPage;
