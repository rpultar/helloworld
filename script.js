// Get DOM elements
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

// Configure marked.js (use GFM - GitHub Flavored Markdown)
marked.setOptions({
    breaks: true, // Enable GFM line breaks
    gfm: true
});

// Update preview when editor content changes (with debounce for performance)
let debounceTimer;
function updatePreview() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const markdownText = editor.value;
        const html = marked.parse(markdownText);
        preview.innerHTML = html; // Safe because we trust our own input
    }, 150); // Adjust delay (ms) as needed
}

// Initial render and event listener
editor.addEventListener('input', updatePreview);
updatePreview(); // Render initial empty state

// Helper function for toolbar buttons
function insertSyntax(open, close) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selectedText = editor.value.substring(start, end);
    
    // Insert syntax around selection or at cursor
    const newText =         editor.value.substring(0, start) + 
        open + 
        (selectedText || '') + 
        close + 
        editor.value.substring(end);
    
    editor.value = newText;
    editor.focus();
    
    // Adjust cursor position
    const newPos = start + open.length + (selectedText ? selectedText.length : 0) + close.length;
    editor.setSelectionRange(newPos, newPos);
    
    updatePreview(); // Trigger preview update
}
