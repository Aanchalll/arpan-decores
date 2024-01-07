import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "../../components/Card/Card.module.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// import Card from "../../components/Card/Card";
// import Pagination from "../../components/Util/Pagination";
import { apiProductsType, itemType } from "../../context/cart/cart-types";
import DownArrow from "../../public/icons/DownArrow";
import NoDataFound from "../no-data";
import { product_categories } from "../../messages/common/constants";
import { FC, useState } from "react";
// import { Products } from "../../messages/common/product-items";
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper/core";
import LinkButton from "../../components/Buttons/LinkButton";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

type Props = {
  item: itemType | any;
};

const CategoryCard: FC<Props> = ({ item }) => {
  const t = useTranslations("CartWishlist");
  // const { wishlist, addToWishlist, deleteWishlistItem } = useWishlist();
  // const { addOne } = useCart();
  // const [isHovered, setIsHovered] = useState(false);
  // const [isWLHovered, setIsWLHovered] = useState(false);

  const { name, products, id, category } = item;
  const sliderArray =
    products && products.length > 3 ? products?.slice(0, 3) : products;
  // console.log(item,'item')
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <div className="text-silver text-4xl text-center relative top-3 z-30">
          <a
            href={`/products/${category}`}
            // extraClass="absolute bottom-10-per sm:right-10-per z-20"
          >
            {name}
          </a>
        </div>
        <Slideshow name={name} products={sliderArray} />
      </div>
    </div>
  );
};
export default CategoryCard;

const Slideshow = ({ name = "", products = [] }) => {
  const t = useTranslations("Index");

  return (
    <>
      <div
        className="relative slide-container w-full h-full z-20  
      overflow-hidden border-2 border-gray800 rounded-3xl "
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={false}
          pagination={false}
          className="mySwiper"
        >
          {products?.map((slider: any) => (
            <SwiperSlide key={slider.id}>
              <div
                className=" 
              lg:block 
              "
              >
                <Image
                  layout="responsive"
                  src={slider.src}
                  width={"100%"}
                  height={"100%"}
                  alt={name}
                />
              </div>
              {/* <div className="hidden sm:block lg:hidden">
                <Image
                  layout="responsive"
                  src={slider.src}
                  width={820}
                  height={720}
                  alt={name}
                />
              </div>
              <div className="sm:hidden">
                <Image
                  layout="responsive"
                  src={slider.src}
                  width={428}
                  height={800}
                  alt={name}
                />
              </div> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
