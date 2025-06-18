import { getTranslations } from "@/i18n/server";
import { deslugify } from "@/lib/utils";
import { YnsLink } from "@/ui/yns-link";
import Image, { type ImageProps } from "next/image";

export async function CategoryBox({
	categorySlug,
	src,
}: {
	categorySlug: string;
	src: ImageProps["src"];
}) {
	const t = await getTranslations("Global.actions");

	return (
		<YnsLink href={`/category/${categorySlug}`} className="group relative max-w-1/2 lg:max-w-1/4">
			<div className="relative overflow-hidden">
				<Image
					alt="Cover image"
					className="w-full scale-105 object-cover transition-all group-hover:scale-100 group-hover:opacity-75"
					sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 620px"
					src={src}
				/>
				<div className="absolute bottom-0 gap-2 px-8 py-4 text-white">
					<p>{t("shopNow")}</p>
					<h3 className="text-lg font-bold tracking-tight">{deslugify(categorySlug)}</h3>					
				</div>
			</div>			
		</YnsLink>
	);
}
