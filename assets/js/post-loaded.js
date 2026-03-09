// Before loaded page
/*
document.addEventListener("DOMContentLoaded", function () {
    let resources = `
    <link rel="stylesheet" href="assets/css/fontawesome.css">
    `;
    document.head.insertAdjacentHTML('beforeend', resources);
});
*/
// Languages
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'es'}, 'google_translate_element');
}