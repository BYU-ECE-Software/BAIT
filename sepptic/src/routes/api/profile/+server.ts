import { dbUpdateEmail, dbUpdateName, dbUpdatePassword } from "../../../server/utils/dbUpdateUser";
import getUserIdFromToken from "../../../server/utils/getUserIdFromToken";
import { dbDeleteUserSessions } from "../../../server/utils/dbDeleteSession";
import dbGetUser from "../../../server/utils/dbGetUser";
import calculateAchievements from "../../../server/utils/calculateAchievements";
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
    const token = event.request.headers.get('token');
    if (!token) {
        return new Response(JSON.stringify({ message: 'No token provided', status: 400 }), { status: 400 });
    }
    const userIdResponse = await getUserIdFromToken(token);
    if (!userIdResponse.success || !userIdResponse.userId) {
        return new Response(JSON.stringify({ message: userIdResponse.message, status: userIdResponse.status }), { status: userIdResponse.status });
    }
    const User_ID = userIdResponse.userId;

    const userResponse = await dbGetUser(User_ID);
    if (userResponse.status !== 200 || !userResponse.user) {
        return new Response(JSON.stringify({ message: userResponse.message, status: userResponse.status }), { status: userResponse.status });
    }
    const user = userResponse.user;

    const achievementsResponse = await calculateAchievements(User_ID);
    if (achievementsResponse.status !== 200) {
        return new Response(JSON.stringify({ message: achievementsResponse.message, status: achievementsResponse.status }), { status: achievementsResponse.status });
    }
    const achievements = achievementsResponse.achievements;



    return new Response(JSON.stringify({
        userId: user.User_ID,
        email: user.Email,
        name: user.Name,
        achievements: achievements
    }), { status: 200 });
}

export async function PUT(event: RequestEvent) {
    const body = await event.request.json();
    const token = event.request.headers.get('token');
    if (!token) {
        return new Response(JSON.stringify({ message: 'No token provided', status: 400 }), { status: 400 });
    }
    const userIdResponse = await getUserIdFromToken(token);
    if (!userIdResponse.success || !userIdResponse.userId) {
        return new Response(JSON.stringify({ message: userIdResponse.message, status: userIdResponse.status }), { status: userIdResponse.status });
    }
    const User_ID = userIdResponse.userId;

    if (body.email) {
        const emailResponse = await dbUpdateEmail(body.email, User_ID);
        if (!emailResponse.success) {
            return new Response(JSON.stringify({ message: emailResponse.message, status: emailResponse.status }), { status: emailResponse.status });
        }
    }

    if (body.name) {
        const nameResponse = await dbUpdateName(body.name, User_ID);
        if (!nameResponse.success) {
            return new Response(JSON.stringify({ message: nameResponse.message, status: nameResponse.status }), { status: nameResponse.status });
        }
    }

    if (body.password) {
        const passwordResponse = await dbUpdatePassword(body.password, User_ID);
        if (passwordResponse.success) {
            const deleteSessionsResponse = await dbDeleteUserSessions(User_ID);
            if (deleteSessionsResponse.status !== 200) {
                return new Response(JSON.stringify({ message: deleteSessionsResponse.message, status: deleteSessionsResponse.status }), { status: deleteSessionsResponse.status });
            }
            return new Response(JSON.stringify({ message: 'Profile updated successfully. User has been logged out of all sessions.', status: 200 }), { status: 200 });
        }
        if (!passwordResponse.success) {
            return new Response(JSON.stringify({ message: passwordResponse.message, status: passwordResponse.status }), { status: passwordResponse.status });
        }
    }

    return new Response(JSON.stringify({ message: 'Profile updated successfully', status: 200 }), { status: 200 });
}