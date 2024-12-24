const colorPicker = document.getElementById('colorPicker');
const saturation = document.getElementById('saturation');
const lightness = document.getElementById('lightness');
const opacity = document.getElementById('opacity');
const colorInfo = document.getElementById('colorInfo');

function hexToHSL(hex) {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function HSLToHex(h, s, l) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c/2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
}

function updateColors() {
    const color = colorPicker.value;
    const hsl = hexToHSL(color);
    const sat = parseInt(saturation.value);
    const light = parseInt(lightness.value);
    const alpha = parseInt(opacity.value) / 100;

    document.documentElement.style.setProperty('--primary-color', `hsla(${hsl.h}, ${sat}%, ${light}%, ${alpha})`);
    document.documentElement.style.setProperty('--primary-dark', `hsla(${hsl.h}, ${sat}%, ${Math.max(0, light - 20)}%, ${alpha})`);
    document.documentElement.style.setProperty('--primary-light', `hsla(${hsl.h}, ${sat}%, ${Math.min(100, light + 20)}%, ${alpha})`);
    document.documentElement.style.setProperty('--primary-lightest', `hsla(${hsl.h}, ${sat}%, ${Math.min(100, light + 35)}%, ${alpha})`);

    const variationsContainer = document.getElementById('variations');
    variationsContainer.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const varSat = Math.min(100, sat - 30 + (i % 3) * 30);
        const varLight = Math.min(100, light - 30 + Math.floor(i / 3) * 30);
        const varColor = `hsla(${hsl.h}, ${varSat}%, ${varLight}%, ${alpha})`;
        
        const variation = document.createElement('div');
        variation.className = 'variation';
        variation.style.backgroundColor = varColor;
        variation.title = `Saturation: ${varSat}%, Lightness: ${varLight}%`;
        variationsContainer.appendChild(variation);
    }

    colorInfo.textContent = `HSL(${hsl.h}, ${sat}%, ${light}%, ${alpha})`;
}

colorPicker.addEventListener('input', updateColors);
saturation.addEventListener('input', (e) => {
    document.getElementById('saturationValue').textContent = e.target.value + '%';
    updateColors();
});
lightness.addEventListener('input', (e) => {
    document.getElementById('lightnessValue').textContent = e.target.value + '%';
    updateColors();
});
opacity.addEventListener('input', (e) => {
    document.getElementById('opacityValue').textContent = e.target.value + '%';
    updateColors();
});

updateColors();