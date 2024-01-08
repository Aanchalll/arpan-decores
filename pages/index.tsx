import React from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Slideshow from "../components/HeroSection/Slideshow";
import OverlayContainer from "../components/OverlayContainer/OverlayContainer";
import TestiSlider from "../components/TestiSlider/TestiSlider";
import {
  // apiProductsType,
  itemType,
} from "../context/cart/cart-types";
import LinkButton from "../components/Buttons/LinkButton";
import ourShop from "../public/logo-gold.png";

type Props = {
  products: itemType[];
};

const Home: React.FC<Props> = ({ products }) => {
  const t = useTranslations("Index");

  return (
    <>
      {/* ===== Header Section ===== */}
      <Header />

      {/* ===== Carousel Section ===== */}
      <Slideshow />

      {/* ===== Our Shop Intro Section */}
      <main id="about-us" className="-mt-20">
        <section className="app-max-width mt-16 mb-20 flex flex-col justify-center items-center text-center">
          <div className="textBox w-3/4 md:w-2/4 lg:w-3/5 mb-6">
            {/* <h5 className="text-sm mb-1 text-silver translate-x-6">{t("arpan_decores")}</h5> */}
            <h2 className="text-3xl mb-6 text-gold italic translate-x-6">
              {t("who_are_we")}
            </h2>
            <span className="w-full text-silver">{t("our_shop_desc")}</span>
          </div>
          <div className="w-1/4 lg:w-1/6 app-x-padding flex justify-center">
            <Image src={ourShop} alt="Our Shop" priority/>
          </div>
        </section>

        {/* ===== Category Section ===== */}
        <section
          id="products"
          className="w-full h-auto py-10 border border-b-2 border-gray100"
        >
          <div className="textBox lg:w-full mb-6 text-center">
            <h2 className="text-gold text-3xl w-full  mb-6 italic translate-x-6">
              {t("our_products")}
            </h2>
            <span className="w-full text-silver">{t("prod_desc")}</span>
          </div>
          <div className="app-max-width app-x-padding h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="w-full sm:col-span-2 lg:col-span-2">
              <OverlayContainer
                imgSrc="/bg-img/bedroom-lights-decor.jpeg"
                imgSrc2="/bg-img/bedroom-lights-decor.jpeg"
                imgAlt="New Arrivals"
              >
                <LinkButton
                  href="/products/interiors"
                  extraClass="absolute bottom-10-per sm:right-10-per z-20"
                >
                  {t("interior_designs")}
                </LinkButton>
              </OverlayContainer>
            </div>
            <div className="w-full">
              <OverlayContainer
                imgSrc="/bg-img/wood-door.jpeg"
                imgAlt="Women Collection"
              >
                <LinkButton
                  href="/products/engravings"
                  extraClass="absolute bottom-10-per z-20"
                >
                  Engravings
                </LinkButton>
              </OverlayContainer>
            </div>
            <div className="w-full">
              <OverlayContainer
                imgSrc="/bg-img/partition-metal.jpeg"
                imgAlt="Lamps"
              >
                <LinkButton
                  href="/products/lamps"
                  extraClass="absolute bottom-10-per z-20"
                >
                  Lamps
                </LinkButton>
              </OverlayContainer>
            </div>
          </div>
          <div className="textBox lg:w-full mt-6 text-center">
            <LinkButton href="/product-category/products" extraClass="p-0">
              See More
            </LinkButton>
          </div>
        </section>

        {/* ===== Testimonial Section ===== */}
        <section
          id="testimonials"
          className="w-full hidden h-full py-16 md:flex flex-col items-center "
        >
          <h2 className="text-3xl text-gold">{t("testimonial")}</h2>
          <TestiSlider />
        </section>
        {/* <div className="border-gray100 border-b-2"></div> */}
      </main>

      {/* ===== Footer Section ===== */}
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let products: itemType[] = [];
  const res = null;
  // await axios.get(
  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products?order_by=createdAt.desc&limit=10`
  // );
  // const fetchedProducts = []//res?.data;
  // fetchedProducts &&
  // fetchedProducts.data.forEach((product: apiProductsType) => {
  //   products = [
  //     ...products,
  //     {
  //       id: product.id,
  //       name: product.name,
  //       price: product.price,
  //       img1: product.image1,
  //       img2: product.image2,
  //     },
  //   ];
  // });

  return {
    props: {
      messages: {
        // ...require(`../messages/index/${locale}.json`),
        ...require(`../messages/common/${locale}.json`),
      },
      products,
    }, // will be passed to the page component as props
  };
};

export default Home;

// const [currentItems, setCurrentItems] = useState(products);
// const [isFetching, setIsFetching] = useState(false);

// useEffect(() => {
//   if (!isFetching) return;
//   const fetchData = async () => {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_PROD_BACKEND_URL}/api/v1/products?order_by=createdAt.desc&offset=${currentItems.length}&limit=10`
//     );
//     const fetchedProducts = res.data.data.map((product: apiProductsType) => ({
//       ...product,
//       img1: product.image1,
//       img2: product.image2,
//     }));
//     setCurrentItems((products) => [...products, ...fetchedProducts]);
//     setIsFetching(false);
//   };
//   fetchData();
// }, [isFetching, currentItems.length]);

// const handleSeemore = async (
//   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
// ) => {
//   e.preventDefault();
//   setIsFetching(true);
// };
