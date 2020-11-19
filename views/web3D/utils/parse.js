export const parseColor = c => {
    

    if (Array.isArray(c)) {
        return c;
    }

    const color = c.split('#')[1];
    let result = [];
    if (color.length === 3) {
        for (let i = 0; i < 3; i++) {
            result.push(+('0x' + color[i] + color[i]) / 255);
        }
    }

    if (color.length === 6) {
        for (let i = 0; i < 6; i += 2) {
            result.push(+('0x' + color[i] + color[i+1]) / 255);
        }
    }

    return result;
};