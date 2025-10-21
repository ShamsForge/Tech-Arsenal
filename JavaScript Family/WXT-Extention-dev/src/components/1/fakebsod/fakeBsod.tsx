// FakeBsod: Displays BSOD image fullscreen, blocks close for 5 seconds
export { FakeBsod };
import { eventEngine } from "@/entrypoints/background/eventEngine";

eventEngine.register({
	id: "fakeBsod",
	level: 1,
	renderFn: () => {
		// Render logic for extension popup or content script
		// For now, you can trigger a popup/modal in your app
		// Or send a message to content script to display fullscreen
	}
});
import React, { useEffect, useState } from "react";

const FakeBsod: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
	const [canClose, setCanClose] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => setCanClose(true), 5000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div style={{
			position: "fixed",
			top: 0,
			left: 0,
			width: "100vw",
			height: "100vh",
			background: "#003399",
			zIndex: 9999,
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		}}>
			<img src="/minecraft/header-icons/bsod.png" alt="BSOD" style={{ width: "100vw", height: "100vh", objectFit: "cover" }} />
			{canClose && onClose && (
				<button style={{ position: "absolute", top: 20, right: 20, fontSize: 24, color: "white", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer" }} onClick={onClose}>Close</button>
			)}
		</div>
	);
};

export default FakeBsod;
