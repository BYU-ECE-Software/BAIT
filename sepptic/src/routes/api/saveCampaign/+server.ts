import { writeFile } from "fs/promises";
import { join } from "path";
import type { RequestEvent } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

// TODO ****************
// Need to set up image handling and find out how to see new created files here in VS code so I can track them
// Also need to make sure unique file names are generated, preferrably incrementally larger numbers or timestamps

export async function POST(event: RequestEvent) {
    try {
        const data = await event.request.json();
        const filename = "1.json";
        const campaignsDir = join(process.cwd(), 'src', 'server', 'campaigns');
        const filePath = join(campaignsDir, filename);
        console.log("Saving campaign data to:", filePath);

        await writeFile(filePath, JSON.stringify(data, null, 2));
        
        return json({
            success: true,
            message: "Campaign saved successfully",
            filename
        });
    } catch (error) {
        console.error("Error saving campaign:", error);
        return new Response("Error saving campaign", { status: 500 });
    }
}
// Need to set up image handling and find out how to see new created files here in VS code so I can track them
// Also need to make sure unique file names are generated, preferrably incrementally larger numbers or timestamps