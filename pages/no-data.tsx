import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import AppHeader from "../components/Header/AppHeader";
import { GetStaticProps } from "next";

const NoDataFound = () => {
  const t = useTranslations("Others");
  return (
    <>
      <AppHeader title="No Data Found - Arpan Decores" />
      <div className="flex flex-col h-[90%]  justify-center items-center w-full">
        <h1 className="text-silver text-2xl ">{t("no_data_found")}</h1>
        <Image
          src="/bg-img/no-data-found.svg"
          alt="404 Page Not Found"
          width={400}
          height={300}
        />
        <span className="text-silver hover:text-gold">
          {t("go_back_to")}{" Home? "}
          <Link href="/">
            <a className="underline text-gold">Click here</a>
          </Link>
          .
        </span>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../messages/common/${locale}.json`)).default,
    },
  };
};

export default NoDataFound;
