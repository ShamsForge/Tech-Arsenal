
// Render saved mods
function renderSavedMods() {
	const container = document.getElementById('saved-cards');
	let saved = [];
	try {
		saved = JSON.parse(localStorage.getItem('savedMods') || '[]');
	} catch (e) {}
	if (!saved.length) {
		container.innerHTML = '<div style="font-size:1.5rem;">No saved mods yet.</div>';
		return;
	}
	container.innerHTML = saved.map(mod => `
		<div class="saved-card">
			<img src="${mod.img}" alt="${mod.title}" style="width:60px;height:60px;border-radius:8px;vertical-align:middle;margin-right:1rem;">
			<span style="font-weight:bold;">${mod.title}</span><br>
			<span>${mod.desc || ''}</span><br>
			<a href="${mod.url}" target="_blank">${mod.url}</a>
		</div>
		<hr>
	`).join('');
}

// Export saved mods as JSON
function exportSavedMods() {
	let saved = [];
	try {
		saved = JSON.parse(localStorage.getItem('savedMods') || '[]');
	} catch (e) {}
	const blob = new Blob([JSON.stringify(saved, null, 2)], {type: 'application/json'});
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'saved_mods.json';
	document.body.appendChild(a);
	a.click();
	setTimeout(() => {
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, 100);
}

window.addEventListener('DOMContentLoaded', () => {
	renderSavedMods();
	const exportBtn = document.getElementById('btn-export');
	if (exportBtn) exportBtn.addEventListener('click', exportSavedMods);
});
