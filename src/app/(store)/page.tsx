import { publicUrl } from "@/env.mjs";
import { getTranslations } from "@/i18n/server";
import StoreConfig from "@/store.config";
import { CategoryBox } from "@/ui/category-box";
import { ProductList } from "@/ui/products/product-list";
import { YnsLink } from "@/ui/yns-link";
import * as Commerce from "commerce-kit";
import Image from "next/image";
import type { Metadata } from "next/types";
import HeroImage from "@/images/hero2.jpg";

export const metadata = {
	alternates: { canonical: publicUrl },
} satisfies Metadata;

export default async function Home() {		
	const products = await Commerce.productBrowse({});	
	const t = await getTranslations("Global.actions");

	return (
		<main>
			{/* Hero */}
			{/*
			<section className="rounded bg-neutral-100 py-8 sm:py-12">				
				<div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
					<div className="max-w-md space-y-4">
						<h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{t("hero.title")}</h2>
						<p className="text-pretty text-neutral-600">{t("hero.description")}</p>
						<YnsLink
							className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-900 px-6 font-medium text-neutral-50 transition-colors hover:bg-neutral-900/90 focus:outline-hidden focus:ring-1 focus:ring-neutral-950"
							href={t("hero.link")}
						>
							{t("hero.action")}
						</YnsLink>
					</div>
					<Image
						alt="Cup of Coffee"
						loading="eager"
						priority={true}
						className="rounded"
						height={450}
						width={450}
						src="https://files.stripe.com/links/MDB8YWNjdF8xT3BaeG5GSmNWbVh6bURsfGZsX3Rlc3RfaDVvWXowdU9ZbWlobUIyaHpNc1hCeDM200NBzvUjqP"
						style={{
							objectFit: "cover",
						}}
						sizes="(max-width: 640px) 70vw, 450px"
					/>
				</div>
			</section>
			*/}
			{/* Hero 2 */}
			<section className="w-full min-h-screen bg-red-100 relative -mt-19">
				<div className="absolute top-0 left-0 w-full h-full select-none">
					<Image src={HeroImage} alt="Hero Image" fill className="object-cover" />
				</div>
				<div className="absolute bottom-10 left-10">
					<YnsLink href="/products">
						<button className="border border-1 border-white text-white p-4 cursor-pointer">
							<span className="text-sm font-medium">
								SHOP NEW ARRIVALS
							</span>
						</button>					
					</YnsLink>
				</div>
			</section>

			{/* Featured Products */}
			<section className="w-full py-8">
				<div className="px-5 lg:px-10">
					{/* <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Products</h2> */}
					 <ProductList products={products}/>
				</div>
			</section>


			{/* Categories */}
			<section className="w-full sm:py-8">
				<div className="flex w-full flex-wrap justify-center items-center">
					{StoreConfig.categories.map(({ slug, image: src }) => (
						<CategoryBox key={slug} categorySlug={slug} src={src} />
					))}
				</div>
			</section>

			{/* Gold Jewellery 
			<section className="w-full py-8 h-auto">
				<div className="flex w-full">
					<YnsLink href={`/category/gold-jewellery`} className="group relative max-w-1/2 lg:max-w-1/4">
						<div className="relative overflow-hidden">
							<Image
								alt="Cover image"
								className="w-full scale-105 object-contain transition-all group-hover:scale-100 group-hover:opacity-75"
								sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 620px"
								src={GoldRingsImage}
							/>
							<div className="absolute bottom-0 gap-2 px-8 py-4 text-white">
								<p>{t("shopNow")}</p>
								<h3 className="text-lg font-bold tracking-tight">Gold Jewellery</h3>					
							</div>
						</div>			
						</YnsLink>
				</div>
			</section>
			*/}

			<section className="w-full py-8">
				<div className="container">
					<h2 className="text-3xl font-bold tracking-tight mb-4">New Arrivals</h2>
					 <ProductList products={products}/>
				</div>
			</section>


		</main>
	);
}
