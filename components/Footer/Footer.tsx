// import Link from "next/link";
import { useTranslations } from "next-intl";

import FacebookLogo from "../../public/icons/FacebookLogo";
import InstagramLogo from "../../public/icons/InstagramLogo";
import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Navigation");

  return (
    <>
      <div className={styles.footerContainer}>
        <div className={`app-max-width app-x-padding ${styles.footerContents}`}>
          <div>
            <h3 className={`${styles.footerHead} text-gold hidden md:block`}>
              {t("arpan_decores")}
            </h3>
            <div className={styles.column}>
              <div className="lg:w-3/4 w-10 pb-5">
                <Image
                  className="justify-center h-auto w-full"
                  src="/logo-gold.png"
                  alt="Arpan Decores"
                  width={60}
                  height={60}
                  layout="responsive"
                />
              </div>
            </div>
          </div>
          <div>
            <h3
              className={`${styles.footerHead} text-gold hidden md:block `}
            >
              {t("contact_us")}
            </h3>
            <div className={`${styles.column} text-silver`}>
              <span>
                {t("address.detail")}
                <br />
                {t("address.road")}
                <br />
                {t("address.city")}
              </span>
              <span>{t("phone_number")}</span>
              <span>{t("email")}</span>
              <span>
                {t("open_all_days")} <br />- {t("opening_hours")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <div className="app-max-width app-x-padding w-full flex justify-between">
          <span className="text-gold">@2023 AD {t("all_rights_reserved")}</span>
          <span className="flex items-center">
            <span className="hidden sm:block text-gold">
              {t("follow_us_on_social_media")}:
            </span>{" "}
            <a
              href={t("facebook-link")}
              aria-label="Facebook Page for Arpan Decores"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookLogo />
            </a>
            <a
              href={t("instagram_link")}
              aria-label="Instagram Account for Arpan Decores"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramLogo />
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
{
  /* <div className={styles.footerContainer}>
        <div className={`app-max-width app-x-padding ${styles.footerContents}`}>
          <div>
            <h3 className={styles.footerHead}>{t("company")}</h3>
            <div className={styles.column}>
              <a href="example">{t("about_us")}</a>
              <a href="example">{t("contact_us")}</a>
              {/* <a href="example">{t("store_location")}</a> */
}
{
  /* <a href="example">{t("careers")}</a> 
            </div>
          </div>
          {/* <div>
            <h3 className={styles.footerHead}>{t("help")}</h3>
            <div className={styles.column}>
              {/* <a href="example">{t("order_tracking")}</a> */
}
{
  /* <a href="example">{t("faqs")}</a> 
              <a href="example">{t("privacy_policy")}</a>
              <a href="example">{t("terms_conditions")}</a>
            </div>
          </div>  <div>
            <h3 className={styles.footerHead}>{t("store")}</h3>
            <div className={styles.column}>
              <Link href={`/product-category/women`}>
                <a>
                  {/* {t("women")} 
                  
                  </a>
              </Link>
              <Link href={`/product-category/men`}>
                <a>
                  {/* {t("men")} 
                  </a>
              </Link>
              <Link href={`/product-category/bags`}>
                <a>{t("bags")}</a>
              </Link>
            </div>
          </div> 
          <div>
            <h3 className={styles.footerHead}>{t("keep_in_touch")}</h3>
            <div className={styles.column}>
              <span>
                {t("address.detail")}
                <br />
                {t("address.road")}
                <br />
                {t("address.city")}
              </span>
              <span>{t("phone_number")}</span>
              <span>
                {t("open_all_days")} <br />- {t("opening_hours")}
              </span>
            </div>
          </div>
        </div>
      </div> */
}
{
  /* <div className="flex flex-col items-center pb-16">
        <h4 className="text-3xl mb-4">{t("newsletter")}</h4>
        <span className="px-6 text-center">{t("newsletter_desc")}</span>
        <div className="mt-5 px-6 flex w-full sm:w-auto flex-col sm:flex-row">
          <Input
            label="Newsletter Input Box"
            name="email"
            type="email"
            extraClass=" w-full sm:w-auto"
          />{" "}
          <Button
            size="lg"
            value={t("send")}
            extraClass="ml-0 mt-4 sm:mt-0 tracking-widest sm:tracking-normal sm:mt-0 sm:ml-4 w-auto w-full sm:w-auto"
          />
        </div>
      </div> */
}
