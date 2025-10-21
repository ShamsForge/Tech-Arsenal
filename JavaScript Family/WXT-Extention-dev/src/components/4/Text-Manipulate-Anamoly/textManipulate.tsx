// TextManipulate: Manipulates text content, injects horror phrases from message.txt
export { TextManipulate };
import { eventEngine } from "@/entrypoints/background/eventEngine";

eventEngine.register({
	id: "textManipulate",
	level: 4,
	renderFn: () => {
		manipulateText();
	}
});
import React, { useEffect } from "react";

// Load phrases from message.txt (simulate import)
const phrases = [
	// You can replace these with actual content from message.txt
	"You are not alone...",
	"Did you hear that?",
	"Something is watching you...",
	"Don't look behind you.",
	"It knows you're here.",
	"Run while you can.",
	"The page is cursed.",
	"Why are you still reading?"
];

function manipulateText() {
	const allTextNodes = [];
	function walk(node: Node) {
		if (node.nodeType === 3) {
			allTextNodes.push(node);
		} else {
			node.childNodes.forEach(walk);
		}
	}
	walk(document.body);
	const half = Math.floor(allTextNodes.length / 2);
	for (let i = 0; i < half; i += Math.ceil(half / phrases.length)) {
		const phrase = phrases[Math.floor(Math.random() * phrases.length)];
		allTextNodes[i].textContent += " " + phrase;
	}
}

const TextManipulate = () => {
	useEffect(() => {
		manipulateText();
	}, []);
	return null;
};

export default TextManipulate;
