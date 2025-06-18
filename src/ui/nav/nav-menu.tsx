import StoreConfig from "@/store.config";
import { NavMobileMenu } from "@/ui/nav/nav-mobile-menu.client";
import Link from "next/link";

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Digital",
    href: "/category/digital",
  },
];

export const NavMenu = () => {
  return (
    <>
      {/* Desktop Menu */}
      <div className="sm:block hidden">
        <ul className="flex flex-row items-center justify-center gap-x-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden"
              >
                {link.label}
              </Link>
            </li>
          ))}
						{/* Store Config Dropdown */}
						<li className="relative group">
							<button
								className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
							>
								Jewellery
							</button>

							{/* Dropdown Menu */}
							<div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1 transition-all duration-200 ease-in-out">
								<ul className="p-2 space-y-1 text-sm">
									{StoreConfig.categories.map(({ name, slug }) => (
										<li key={slug}>
											<Link
												href={`/category/${slug}`}
												className="block px-4 py-2 rounded-md hover:bg-gray-100"
											>
												{name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</li>
				</ul>
			</div>

      {/* Mobile Menu */}
      <div className="sm:hidden flex items-center">
        <NavMobileMenu>
          <ul className="flex pb-8 flex-col items-stretch justify-center gap-x-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex h-9 w-full items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Store Config Dropdown for Mobile */}
            <li>
              <details className="group text-center">
                <summary className="cursor-pointer px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">
                  Jewellery
                </summary>
                <ul className="pl-4 mt-1 space-y-1 text-sm">
                  {StoreConfig.categories.map(({ name, slug }) => (
                    <li key={slug}>
                      <Link
                        href={`/category/${slug}`}
                        className="block px-4 py-2 rounded-md hover:bg-gray-100"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </NavMobileMenu>
      </div>
    </>
  );
};
