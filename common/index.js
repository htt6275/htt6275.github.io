window.onload = () => {
    const data = {};
    const $ = window.document.querySelector.bind(window.document);
};
function handleCalc() {
    var dw = document.body.clientWidth;
    var minScale = dw / 75;
    document.documentElement.style.fontSize = minScale + 'px';
}
handleCalc();
window.addEventListener('resize', handleCalc);