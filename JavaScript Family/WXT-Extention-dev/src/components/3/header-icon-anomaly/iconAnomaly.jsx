// IconAnomaly: Manipulates tab icon, swaps with random icon from header-icons folder
export { IconAnomaly };
import { eventEngine } from "@/entrypoints/background/eventEngine";

eventEngine.register({
	id: "iconAnomaly",
	level: 3,
	renderFn: () => {
		changeTabIcon();
	}
});
const iconPaths = [
	"/minecraft/header-icons/1.png",
	"/minecraft/header-icons/2.png",
	"/minecraft/header-icons/3.png",
	"/minecraft/header-icons/4.png",
	"/minecraft/header-icons/5.png",
	"/minecraft/header-icons/6.png",
	"/minecraft/header-icons/7.png",
	"/minecraft/header-icons/8.png"
];

function changeTabIcon() {
	const icon = iconPaths[Math.floor(Math.random() * iconPaths.length)];
	const link = document.querySelector("link[rel~='icon']");
	if (link) {
		link.href = icon;
	} else {
		const newLink = document.createElement("link");
		newLink.rel = "icon";
		newLink.href = icon;
		document.head.appendChild(newLink);
	}
}

const IconAnomaly = () => {
	useEffect(() => {
		changeTabIcon();
	}, []);
	return null;
};

export default IconAnomaly;
