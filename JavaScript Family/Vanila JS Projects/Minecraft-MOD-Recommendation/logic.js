
let mods = [];

async function fetchMods() {
	try {
		const response = await fetch('https://api.modrinth.com/v2/projects_random?count=15');
		const data = await response.json();
		// Map API data to card objects
		   mods = data.map(mod => ({
			   title: mod.title,
			   desc: mod.description,
			   img: mod.icon_url || 'https://cdn.modrinth.com/data/1KVo5zza/images/6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b.png', // fallback image
			   url: `https://modrinth.com/mod/${mod.slug || mod.project_id || ''}`
		   }));
		current = 0;
		renderCard(current);
	} catch (e) {
		console.error('Failed to fetch mods:', e);
		mods = []
		current = 0;
		renderCard(current);
	}
}

fetchMods();

let current = 0;

const card = document.getElementById('swipe-card');
const cardContent = document.getElementById('card-content');
const reactionBubbleLeft = document.getElementById('reaction-bubble-left');
const reactionBubbleRight = document.getElementById('reaction-bubble-right');

function renderCard(idx) {
	if (idx >= mods.length) {
		cardContent.innerHTML = `<div style="font-size:2rem;">No more mods! 🎉</div>`;
		card.classList.remove('swipe-left', 'swipe-right', 'moving');
		return;
	}
	const mod = mods[idx];
	cardContent.innerHTML = `
		<img src="${mod.img}" alt="${mod.title}" style="width: 80%; border-radius: 16px; margin-bottom: 1.2rem;">
		<h2>${mod.title}</h2>
		<p>${mod.desc}</p>
	`;
	card.classList.remove('swipe-left', 'swipe-right', 'moving');
	reactionBubbleLeft.classList.remove('show');
	reactionBubbleRight.classList.remove('show');
}

renderCard(current);

// Swipe logic
let startX = 0, currentX = 0, dragging = false;

function setCardTransform(x, y, rot) {
	card.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
}

function handlePointerDown(e) {
	dragging = true;
	card.classList.add('moving');
	startX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
	document.addEventListener('pointermove', handlePointerMove);
	document.addEventListener('pointerup', handlePointerUp);
	document.addEventListener('touchmove', handlePointerMove, {passive:false});
	document.addEventListener('touchend', handlePointerUp);
}

function handlePointerMove(e) {
	if (!dragging) return;
	currentX = (e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX) - startX;
	setCardTransform(currentX, 0, currentX/15);
	// Only toggle classes, no direct styling
	if (currentX < -60) {
		card.classList.add('swipe-left');
		card.classList.remove('swipe-right');
		reactionBubbleLeft.classList.add('show');
		reactionBubbleRight.classList.remove('show');
	} else if (currentX > 60) {
		card.classList.add('swipe-right');
		card.classList.remove('swipe-left');
		reactionBubbleRight.classList.add('show');
		reactionBubbleLeft.classList.remove('show');
	} else {
		card.classList.remove('swipe-left', 'swipe-right');
		reactionBubbleLeft.classList.remove('show');
		reactionBubbleRight.classList.remove('show');
	}
}

function handlePointerUp(e) {
	dragging = false;
	card.classList.remove('moving');
	// Decide action
	if (currentX < -120) {
		// Swipe left: fade and show bubble, then reset
		card.classList.add('swipe-left');
		reactionBubbleLeft.classList.add('show');
		setTimeout(() => {
			card.style.transition = '';
			setCardTransform(0,0,0);
			current++;
			renderCard(current);
		}, 350);
	   } else if (currentX > 120) {
		   // Swipe right: green tint and show bubble, then reset
		   card.classList.add('swipe-right');
		   reactionBubbleRight.classList.add('show');
		   // Save to localStorage
		   try {
			   let saved = JSON.parse(localStorage.getItem('savedMods') || '[]');
			   if (!saved.some(m => m.title === mods[current].title && m.url === mods[current].url)) {
				   saved.push(mods[current]);
				   localStorage.setItem('savedMods', JSON.stringify(saved));
			   }
		   } catch (e) { /* ignore */ }
		   setTimeout(() => {
			   card.style.transition = '';
			   setCardTransform(0,0,0);
			   current++;
			   renderCard(current);
		   }, 350);
	} else {
		// Snap back
		card.style.transition = 'transform 0.3s cubic-bezier(.68,-0.55,.27,1.55)';
		setCardTransform(0,0,0);
		setTimeout(() => {
			card.style.transition = '';
		}, 300);
	}
	currentX = 0;
	card.classList.remove('swipe-left', 'swipe-right');
	reactionBubbleLeft.classList.remove('show');
	reactionBubbleRight.classList.remove('show');
	document.removeEventListener('pointermove', handlePointerMove);
	document.removeEventListener('pointerup', handlePointerUp);
	document.removeEventListener('touchmove', handlePointerMove);
	document.removeEventListener('touchend', handlePointerUp);
}

// Mouse and touch events
card.addEventListener('pointerdown', handlePointerDown);
card.addEventListener('touchstart', handlePointerDown, {passive:false});

// Prevent scrolling on touch drag
card.addEventListener('touchmove', e => { if (dragging) e.preventDefault(); }, {passive:false});
