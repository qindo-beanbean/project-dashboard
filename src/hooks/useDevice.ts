import { useEffect, useState } from "react";

const resolution = 800;
export default function useDevice() {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < resolution);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < resolution) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        // Listen to the window size changes
        window.addEventListener('resize', handleResize);

        // Clear listener to avoid memory leak 清除监听器以避免内存泄漏
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])
    return isMobile;
}
