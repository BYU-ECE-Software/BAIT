import type { RequestEvent } from "@sveltejs/kit";
import fs from "fs/promises";
import { join } from "path";
import { json } from "@sveltejs/kit"

export default async function deleteJson(id: string) {
    const campaignsDir = join(process.cwd(), 'src', 'server', 'campaigns');
    const path = campaignsDir + "/" + id + ".json";

    // Remove campaign specified by incoming id variable
    await fs.rm(path, { force: true });

    try {
        await fs.readFile(path);
        // If readFile works, file still exists
        return json({
            status: 500,
            success: false,
            message: "Campaign JSON removal failed"
        });
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            // File not found = success
            return json({
                status: 200,
                success: true,
                message: "Campaign JSON file successfully deleted"
            });
        }
        // Any other error is a real failure
        throw err;
    }
}
