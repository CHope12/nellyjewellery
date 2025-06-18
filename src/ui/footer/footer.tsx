import { getTranslations } from "@/i18n/server";
import StoreConfig from "@/store.config";
import { Newsletter } from "@/ui/footer/newsletter.client";
import { YnsLink } from "@/ui/yns-link";

const sections = [
	{
		header: "Categories",
		links: StoreConfig.categories.map(({ name, slug }) => ({
			label: name,
			href: `/category/${slug}`,
		})),
	},
	{
		header: "About",
		links: [
			{
				label: "Story",
				href: "/story",
			},
			{
				label: "Blog",
				href: "/blog",
			},
			{
				label: "Contact",
				href: "mailto:hi@nelly.co.uk",
			},
		],
	},
];

export async function Footer() {
	const t = await getTranslations("Global.footer");

	return (
		<footer className="w-full bg-neutral-50 p-6 text-neutral-800 md:py-12 pb-12">
			<div className="container flex max-w-7xl flex-row flex-wrap justify-center gap-16 text-sm sm:justify-between">
				<div className="">
					<div className="flex w-full max-w-sm flex-col gap-2">
						<h3 className="font-semibold">{t("newsletterTitle")}</h3>
						<Newsletter />
					</div>
				</div>

				<nav className="grid grid-cols-2 gap-16">
					{sections.map((section) => (
						<section key={section.header}>
							<h3 className="mb-2 font-semibold">{section.header}</h3>
							<ul role="list" className="grid gap-1">
								{section.links.map((link) => (
									<li key={link.label}>
										<YnsLink className="underline-offset-4 hover:underline" href={link.href}>
											{link.label}
										</YnsLink>
									</li>
								))}
							</ul>
						</section>
					))}
				</nav>
			</div>
			<div className="container mt-8 flex max-w-7xl flex-col-reverse sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500 md:flex-row">
				<div>
					<p>© {new Date().getFullYear()} Nelly</p>
					{/*<p>Delightful commerce for everyone</p>*/}
				</div>
				<div className="flex items-center gap-2 sm:gap-4 text-center">
					<YnsLink
						className="inline-flex items-center gap-1 transition-colors hover:text-neutral-700"
						href="/refund-policy"
					>
						Refund Policy
						<span className="sr-only">Refund Policy</span>
					</YnsLink>
					<YnsLink
						className="inline-flex items-center gap-1 transition-colors hover:text-neutral-700"
						href="/privacy-policy"
					>
						 Privacy Policy
						<span className="sr-only">Privacy Policy</span>
					</YnsLink>
					<YnsLink
						className="inline-flex items-center gap-1 transition-colors hover:text-neutral-700"
						href="/terms-of-service"
					>
						Terms of Service
						<span className="sr-only">Terms Of Service</span>
					</YnsLink>
				</div>
			</div>
		</footer>
	);
}
