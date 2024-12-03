import * as fs from 'fs';
import * as path from 'path';

type campaign = {
    Campaign_Information: {
        Name: string;
        Description: string;
        Image: string;
        Website: string;
        Briefing_Video: string;
        Failure_Video: string;
    };
    Characters: {
        ID: number;
        Name: string;
        Title: string;
        Image: string;
        Prompt: string;
        Intel: {
            Intel_ID: number;
            Intel_Description: string;
            Unlocks_Character_ID?: number;
            Quiz: string;
            Answer: string;
        }[];
    }[];
    achievements: {
        ID: number;
        Name: string;
        Description: string;
        Image: string;
        Intels: number[];
    }[];
}

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
        const data: campaign = JSON.parse(fs.readFileSync(file).toString());
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

function getFullCampaign(fileName: string) {
    const file = path.join(campaignsDir, fileName);
    // Make sure the file exists
    if (!fs.existsSync(file)) {
        return {
            status: 404,
            id: fileName.split('.')[0],
            data: 'Campaign not found'
        };
    }
    try {
        const data: campaign = JSON.parse(fs.readFileSync(file).toString());
        return {
            status: 200,
            id: fileName.split('.')[0],
            data: data
        };
    }
    catch (error) {
        return {
            status: 500,
            id: fileName.split('.')[0],
            data: 'Error reading campaign file: ' + error
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

export function jsonGetCampaign(id: number | string) {
    if (typeof id === 'number') {
        id = id.toString();
    }
    return getFullCampaign(`${id}.json`);
}