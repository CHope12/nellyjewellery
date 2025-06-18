import SilverRingsImage from "@/images/silver-rings.jpg";
import SilverNecklacesImage from "@/images/silver-necklaces.jpg";
import GoldRingsImage from "@/images/gold-rings.jpg";
import GoldNecklacesImage from "@/images/gold-necklaces.jpg";

export const config = {
	categories: [
		{ name: "Silver Rings", slug: "silver-rings", image: SilverRingsImage },
		{ name: "Silver Necklaces", slug: "silver-necklaces", image: SilverNecklacesImage },
		{ name: "Gold Rings", slug: "gold-rings", image: GoldRingsImage },
		{ name: "Gold Necklaces", slug: "gold-necklaces", image: GoldNecklacesImage },
	],

	social: {
		x: "https://x.com/yourstore",
		facebook: "https://facebook.com/yourstore",
	},

	contact: {
		email: "support@yourstore.com",
		phone: "+1 (555) 111-4567",
		address: "123 Store Street, City, Country",
	},
};

export type StoreConfig = typeof config;
export default config;
