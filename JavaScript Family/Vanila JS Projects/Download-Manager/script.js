const downloadList = document.getElementById('download-list');

const clearBtn = document.getElementById('clear-btn'); // confirm by alert
const saveBtn = document.getElementById('save-btn');
const downloadAllBtn = document.getElementById('downloadall-btn');


let = downloadListArray = [];

document.addEventListener('DOMContentLoaded', () => {
    const savedList = localStorage.getItem('downloadList');
    if (savedList) {
        downloadList.value = savedList;
        downloadListArray = savedList.split('\n').filter(link => link.trim() !== '');
    }
});


clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the download list?')) {
        downloadList.value = '';
        downloadListArray = [];
        localStorage.removeItem('downloadList');
    }
});

saveBtn.addEventListener('click', () => {
    const links = downloadList.value.split('\n').filter(link => link.trim() !== '');
    downloadListArray = links;
    localStorage.setItem('downloadList', downloadList.value);
    alert('Download list saved!');
});

downloadAllBtn.addEventListener('click', () => {
    if (downloadListArray.length === 0) {
        alert('No download links available.');
        return;
    }

    downloadListArray.forEach(link => {
        const a = document.createElement('a');
        a.href = link;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});


// Download Logic Blueprint for all

/*
1. make blob
2. make url from blob
3. link and download from anchor tag
4. append anchor tag to body
5. remove anchor tag from body
*/