import { publicUrl } from "@/env.mjs";
import { getTranslations } from "@/i18n/server";
import { deslugify } from "@/lib/utils";
import { ProductList } from "@/ui/products/product-list";
import * as Commerce from "commerce-kit";
import { notFound } from "next/navigation";
import type { Metadata } from "next/types";

export const generateMetadata = async (props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
	const params = await props.params;
	const products = await Commerce.productBrowse({
		first: 100,
		filter: { category: params.slug },
	});

	if (products.length === 0) {
		console.log("Category not found", params.slug);
		return notFound();
	}

	const t = await getTranslations("/category.metadata");

	return {
		title: t("title", { categoryName: deslugify(params.slug) }),
		alternates: { canonical: `${publicUrl}/category/${params.slug}` },
	};
};

export default async function CategoryPage(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const products = await Commerce.productBrowse({
		first: 100,
		filter: { category: params.slug },
	});

	if (products.length === 0) {
		return notFound();
	}

	const t = await getTranslations("/category.page");

	return (
		<main className="flex flex-col justify-center items-center mx-10">
			<div className="flex h-76 w-full flex justify-center items-center border-b border-gray-200">
				<h1 className="text-[32px] leading-none tracking-tight text-foreground pb-8">
					{deslugify(params.slug).toUpperCase()}
					<div className="text-lg font-semibold text-muted-foreground">
					{/*t("title", { categoryName: deslugify(params.slug) })*/}
					</div>
				</h1>
			</div>
			<div className="flex justify-center items-center mt-6">
				<ProductList products={products} />
			</div>
		</main>
	);
}
