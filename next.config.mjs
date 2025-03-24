/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'a.vsbookcollection.space', // Укажи свой домен
                port: '', // Оставь пустым, если используется стандартный порт (443)
                pathname: '/wp-content/uploads/**', // Разрешаем загружать изображения из этой директории
            },
        ],
    },
};

export default nextConfig;