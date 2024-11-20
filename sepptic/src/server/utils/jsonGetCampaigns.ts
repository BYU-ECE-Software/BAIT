import * as fs from 'fs';
import * as path from 'path';

const campaignsDir = './src/server/campaigns';

function getCampaignsFiles() {
    try {
        const files = fs.readdirSync(campaignsDir);
        return files.filter(file => fs.statSync(path.join(campaignsDir, file)).isFile());
    } catch (error) {
        console.error('Error reading campaigns directory:', error);
        return [];
    }
};

function getCampaign(fileName: string) {
    const file = path.join(campaignsDir, fileName);
    try {
        const data = JSON.parse(fs.readFileSync(file).toString());
        const campaignData = {
            id: fileName.split('.')[0],
            name: data.Campaign_Information.Name,
            description: data.Campaign_Information.Description,
            image: data.Campaign_Information.Image
        }
        return campaignData;
    } catch (error) {
        console.error('Error reading campaign file:', error);
        return {};
    }
}

export default function jsonGetCampaigns() {
    const files = getCampaignsFiles();
    return files.map(getCampaign);
}