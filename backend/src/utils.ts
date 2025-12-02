
export function random(len: number) {
    let options = "qwertyuioasdfghjklzxcvbnm12345678";
    let length = options.length;

    let ans = "";

    for (let i = 0; i < len; i++) {
        ans += options[Math.floor((Math.random() * length))]
    }

    return ans;
}

export async function getLinkPreview(url: string) {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();

        const titleMatch = html.match(/<meta property="og:title" content="([^"]*)"/i) || html.match(/<title>([^<]*)<\/title>/i);
        const descMatch = html.match(/<meta property="og:description" content="([^"]*)"/i) || html.match(/<meta name="description" content="([^"]*)"/i);
        const imageMatch = html.match(/<meta property="og:image" content="([^"]*)"/i);

        return {
            title: titleMatch ? titleMatch[1] : "",
            description: descMatch ? descMatch[1] : "",
            image: imageMatch ? imageMatch[1] : ""
        };
    } catch (e) {
        console.error("Error fetching link preview", e);
        return {
            title: "",
            description: "",
            image: ""
        };
    }
}