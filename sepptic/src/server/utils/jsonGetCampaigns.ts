import * as fs from 'fs';
import * as path from 'path';

const campaignsDir = './src/server/campaigns';

function getCampaignsFiles() {
    try {
        const files = fs.readdirSync(campaignsDir);
        return {
            files: files.filter(file => fs.statSync(path.join(campaignsDir, file)).isFile()),
            status: 200,
            message: 'Success'
        }
    } catch (error) {
        return {
            files: [],
            status: 500,
            message: 'Error reading campaigns directory'
        }
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
        return {
            id: fileName.split('.')[0],
            name: 'Error',
            description: 'Error reading campaign file: ' + error,
            image: ''
        };
    }
}

export function jsonGetCampaigns() {
    const campaignFiles = getCampaignsFiles();
    if (campaignFiles.status !== 200) {
        return {
            campaigns: [],
            status: campaignFiles.status,
            message: campaignFiles.message
        }
    }
    return {
        campaigns: campaignFiles.files.map(getCampaign),
        status: 200,
        message: 'Success'
    }
}

export function jsonGetCampaign(id: string) {
    return getCampaign(`${id}.json`);
}