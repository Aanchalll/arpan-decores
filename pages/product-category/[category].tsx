import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";
import { useTranslations } from "next-intl";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { itemType } from "../../context/cart/cart-types";
import DownArrow from "../../public/icons/DownArrow";
import NoDataFound from "../no-data";
import { product_categories } from "../../messages/common/constants";
// import CategoryCard from "./category-card";

type OrderType = "latest" | "price" | "price-desc";

type Props = {
  items: itemType[];
  page: number;
  numberOfProducts: number;
  orderby: OrderType;
};

const ProductCategory: React.FC<Props> = ({
  items = Products,
  page,
  numberOfProducts,
  orderby,
}) => {
  const t = useTranslations("Category");
  // console.log(product_categories, "products_sub_categories");

  const router = useRouter();
  const { category } = router.query;
  // const lastPage = Math.ceil(numberOfProducts / 10);

  const capitalizedCategory =
    category!.toString().charAt(0).toUpperCase() +
    category!.toString().slice(1);

  const firstIndex = page === 1 ? page : page * 10 - 9;
  const lastIndex = page * 10;

  return (
    <div>
      {/* ===== Head Section ===== */}
      <Header title={`${capitalizedCategory} - Arpan Decores`} />

      <main id="main-content">
        {/* ===== Breadcrumb Section ===== */}
        <div className=" text-silver h-16 w-full flex items-center">
          <div className="app-x-padding app-max-width w-full">
            <div className="breadcrumb ">
              <Link href="/">
                <a className="text-gray400">{t("home")}</a>
              </Link>{" "}
              / <span className="capitalize ">Products</span>
            </div>
          </div>
        </div>

        {/* ===== Heading & Filter Section ===== */}
        <div className="app-x-padding app-max-width w-full mt-8">
          <h3 className="text-4xl text-gold mb-2 capitalize">Products</h3>
          <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-0 justify-between mt-4 sm:mt-6">
            {items && items?.length > 0 && (
              <span>
                {t("showing_from_to", {
                  from: firstIndex,
                  to:
                    numberOfProducts < lastIndex ? numberOfProducts : lastIndex,
                  all: numberOfProducts,
                })}
              </span>
            )}
            {category !== "new-arrivals" && items && items?.length > 0 && (
              <SortMenu orderby={orderby} />
            )}
          </div>
        </div>

        {/* ===== Main Content Section ===== */}
        <div className="app-x-padding app-max-width mt-3 mb-14">
          {product_categories ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-y-6 mb-10">
              {product_categories?.map((item) => {
                if (item?.products?.length > 0) {
                  return <CategoryCard key={item.id} item={item} />;
                } else return <></>;
              })}
            </div>
          ) : (
            <NoDataFound />
          )}
        </div>
      </main>

      {/* ===== Footer Section ===== */}
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
  query: { page = 1, orderby = "latest" },
}) => {
  const paramCategory = params!.category as string;

  const start = +page === 1 ? 0 : (+page - 1) * 10;

  let numberOfProducts = 0;

  if (paramCategory !== "new-arrivals") {
    // const numberOfProductsResponse =
    // await axios.get(
    //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/count?category=${paramCategory}`
    // );
    numberOfProducts = 0;
    // +numberOfProductsResponse.data.count;
  } else {
    numberOfProducts = 10;
  }

  let order_by: string;

  if (orderby === "price") {
    order_by = "price";
  } else if (orderby === "price-desc") {
    order_by = "price.desc";
  } else {
    order_by = "createdAt.desc";
  }

  const reqUrl =
    paramCategory === "new-arrivals"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products?order_by=createdAt.desc&limit=10`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products?order_by=${order_by}&offset=${start}&limit=10&category=${paramCategory}`;

  // const res = await axios.get(reqUrl);

  // const fetchedProducts = res.data.data.map((product: apiProductsType) => ({
  //   ...product,
  //   img1: product.image1,
  //   img2: product.image2,
  // }));

  // let items: apiProductsType[] = [];
  // fetchedProducts.forEach((product: apiProductsType) => {
  //   items.push(product);
  // });

  return {
    props: {
      messages: (await import(`../../messages/common/${locale}.json`)).default,
      // items,
      numberOfProducts,
      page: +page,
      orderby,
    },
  };
};

const SortMenu: React.FC<{ orderby: OrderType }> = ({ orderby }) => {
  const t = useTranslations("Navigation");
  const router = useRouter();
  const { category } = router.query;

  let currentOrder: string;

  if (orderby === "price") {
    currentOrder = "sort_by_price";
  } else if (orderby === "price-desc") {
    currentOrder = "sort_by_price_desc";
  } else {
    currentOrder = "sort_by_latest";
  }
  return (
    <Menu as="div" className="relative">
      <Menu.Button as="a" href="#" className="flex items-center capitalize">
        {t(currentOrder)} <DownArrow />
      </Menu.Button>
      <Menu.Items className="flex flex-col z-10 items-start text-xs sm:text-sm w-auto sm:right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none">
        <Menu.Item>
          {({ active }) => (
            <button
              type="button"
              onClick={() =>
                router.push(`/product-category/${category}?orderby=latest`)
              }
              className={`${
                active ? "bg-gray100 text-gray500" : "bg-white"
              } py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
                currentOrder === "sort_by_latest" && "bg-gray500 text-gray100"
              }`}
            >
              {t("sort_by_latest")}
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              type="button"
              onClick={() =>
                router.push(`/product-category/${category}?orderby=price`)
              }
              className={`${
                active ? "bg-gray100 text-gray500" : "bg-white"
              } py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
                currentOrder === "sort_by_price" && "bg-gray500 text-gray100"
              }`}
            >
              {t("sort_by_price")}
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              type="button"
              onClick={() =>
                router.push(`/product-category/${category}?orderby=price-desc`)
              }
              className={`${
                active ? "bg-gray100 text-gray500" : "bg-white"
              } py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
                currentOrder === "sort_by_price_desc" &&
                "bg-gray500 text-gray100"
              }`}
            >
              {t("sort_by_price_desc")}
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default ProductCategory;

const Products = [
  {
    id: 1,
    img1: "/bg-img/wood-lamp-shadow.jpeg",
    categoryName: "wood",
    img2: "/bg-img/wood-lamp-shadow.jpeg",
  },
  {
    id: 2,
    img1: "/bg-img/budhha-cuttingg.jpeg",
    categoryName: "wood",
    img2: "/bg-img/budhha-cuttingg.jpeg",
  },
  {
    id: 3,
    img1: "/bg-img/partition.jpeg",
    categoryName: "wood",
    img2: "/bg-img/partition.jpeg",
  },
  {
    id: 4,
    img1: "/bg-img/shiv-mandir.jpeg",
    categoryName: "wood",
    img2: "/bg-img/shiv-mandir.jpeg",
  },
  // {
  //   id: 5,
  //   img1: "/bg-img/tiger-cnc.jpeg",
  //   categoryName: "wood",
  //   img2: "/bg-img/tiger-cnc.jpeg",
  // },
  {
    id: 6,
    img1: "/bg-img/tiger-metal.jpg",
    categoryName: "wood",
    img2: "/bg-img/tiger-metal.jpg",
  },
  {
    id: 7,
    img1: "/bg-img/tree.jpeg",
    categoryName: "wood",
    img2: "/bg-img/tree.jpeg",
  },
  {
    id: 8,
    img1: "/bg-img/window-panels.jpeg",
    categoryName: "wood",
    img2: "/bg-img/window-panels.jpeg",
  },
  {
    id: 9,
    img1: "/bg-img/buddha-cutting.webp",
    categoryName: "wood",
    img2: "/bg-img/buddha-cutting.webp",
  },
  {
    id: 10,
    img1: "/bg-img/CNC-Cutting.webp",
    categoryName: "wood",
    img2: "/bg-img/CNC-Cutting.webp",
  },
];

// import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "../../components/Card/Card.module.css";
// import {itemType } from "../../context/cart/cart-types";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

type Props2 = {
  item: itemType | any;
};

const CategoryCard: FC<Props2> = ({ item }) => {
  const t = useTranslations("CartWishlist");
  const { name, products, category } = item;
  const sliderArray =
    products && products.length > 3 ? products?.slice(0, 3) : products;
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <a href={`/products/${category}`}>
          <div className="text-silver text-4xl text-center relative top-3 z-30">
            {name}
          </div>
          <Slideshow name={name} products={sliderArray} />
        </a>
      </div>
    </div>
  );
};
// export default CategoryCard;

const Slideshow = ({ name = "", products = [] }) => {
  // const t = useTranslations("Index");

  return (
    <>
      <div
        className="relative slide-container w-full h-full z-20  
      overflow-hidden border-b-2 border-r-2 border-l-2 border-gray300 rounded-3xl "
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
              <div className="lg:block imgContainer">
                <Image
                  layout="responsive"
                  src={slider.src}
                  width={"100%"}
                  height={"100%"}
                  alt={name}
                  priority
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
