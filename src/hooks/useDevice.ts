import { useEffect, useState } from "react";

export default function useDevice() {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 900) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        // 监听窗口大小的变化
        window.addEventListener('resize', handleResize);

        // 清除监听器以避免内存泄漏
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])
    return isMobile;
}
