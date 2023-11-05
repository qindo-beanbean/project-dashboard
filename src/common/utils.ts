export function hexToRGBA(hex: string, alpha: string | number) {
    // Remove the '#' symbol from hexadecimal color codes.
    // 去除十六进制颜色代码中的 # 符号
    hex = hex.replace('#', '');

    // Convert hexadecimal color to RGB. 将十六进制颜色转换为RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Return in the RGBA format. 返回RGBA格式
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}