/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Thumbnail URLs are typed by hand in the admin panel, so the host is not
    // known ahead of time. Narrow this to the real storage/CDN host once one
    // is settled on — see the note in the portfolio page work.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
