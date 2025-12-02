export function getYoutubeThumbnail(link: string) {
    try {
        const regex =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = link.match(regex);
        const id = match ? match[1] : null;

        if (!id) return null;
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    } catch {
        return null;
    }
}
