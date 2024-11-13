import getUserIdFromToken from "../server/utils/getUserIdFromToken";

const token: string = '6wHYRpwaYsXdoe0iA1/pnmZMf+R1yWpDH6u+87nxQk4=';
const result = await getUserIdFromToken(token);
console.log(result);