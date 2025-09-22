document.addEventListener('DOMContentLoaded', function() {
    const notepadElem = document.getElementById("notepad");
    const clearBtn = document.getElementById("clear-btn");
    const saveBtn = document.getElementById("save-btn");
    const exportBtn = document.getElementById("export-btn");

    // Load note from localStorage
    const note = localStorage.getItem("note");
    if (note) {
        notepadElem.value = note;
    }

    clearBtn.addEventListener("click", () => {
        notepadElem.value = "";
        localStorage.removeItem("note");
    });

    saveBtn.addEventListener("click", () => {
        localStorage.setItem("note", notepadElem.value);
        alert("Note saved!");
    });

    exportBtn.addEventListener("click", () => {
        const blob = new Blob([notepadElem.value], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "note.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});

