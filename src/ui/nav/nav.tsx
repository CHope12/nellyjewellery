import { CartSummaryNav } from "@/ui/nav/cart-summary-nav";
import { NavMenu } from "@/ui/nav/nav-menu";
import { SearchNav } from "@/ui/nav/search-nav";
import { SeoH1 } from "@/ui/seo-h1";
import { YnsLink } from "@/ui/yns-link";
import { UserIcon } from "lucide-react";

export const Nav = async () => {

	return (
		<header className={`z-50 py-4 sticky top-0 bg-white backdrop-blur-xs nav-border-reveal nav-background-reveal`}>
			<div className="mx-auto flex items-center justify-start sm:justify-between gap-4 sm:gap-2 px-4 flex-row sm:px-6 lg:px-8">
				<NavMenu />
				<YnsLink href="/" className="">
					<SeoH1 className="sm:absolute sm:flex sm:items-center sm:justify-center -mt-0.5 sm:-mt-4.5 sm:ml-5.5 whitespace-nowrap text-3xl font-bold">NEL'S</SeoH1>
				</YnsLink>
				<div className="w-full sm:w-auto flex items-center justify-end sm:justify-center gap-2 px-4 flex-row sm:px-6 lg:px-8">
					<div className="sm:mr-3 sm:ml-0">
						<SearchNav />
					</div>
					<YnsLink href="/login">
					<div className="sm:mr-3 sm:ml-0">
						<UserIcon className="hover:text-neutral-500" />
					</div>
					</YnsLink>
					<CartSummaryNav />					
				</div>
			</div>
		</header>
	);
};
