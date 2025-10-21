// GlitchedBsod: Displays red BSOD image fullscreen, adds glitch/corruption effect
export { GlitchedBsod };
import { eventEngine } from "@/entrypoints/background/eventEngine";

eventEngine.register({
	id: "glitchedBsod",
	level: 2,
	renderFn: () => {
		// Render logic for extension popup or content script
		// Or send a message to content script to display fullscreen
	}
});
import React, { useEffect, useState } from "react";

const GlitchedBsod = ({ onClose }) => {
	const [showBlack, setShowBlack] = useState(true);
	const [glitch, setGlitch] = useState(false);
	useEffect(() => {
		setTimeout(() => setShowBlack(false), 500);
		setTimeout(() => setGlitch(true), 700);
		setTimeout(() => setGlitch(false), 2000);
	}, []);

	return (
		<div style={{
			position: "fixed",
			top: 0,
			left: 0,
			width: "100vw",
			height: "100vh",
			background: showBlack ? "black" : "#990000",
			zIndex: 9999,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			filter: glitch ? "contrast(2) blur(2px)" : "none",
			transition: "filter 0.2s"
		}}>
			{!showBlack && (
				<img src="/minecraft/header-icons/redBsod.png" alt="Red BSOD" style={{ width: "100vw", height: "100vh", objectFit: "cover" }} />
			)}
			{onClose && !showBlack && (
				<button style={{ position: "absolute", top: 20, right: 20, fontSize: 24, color: "white", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer" }} onClick={onClose}>Close</button>
			)}
		</div>
	);
};

export default GlitchedBsod;
