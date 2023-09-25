import { prisma } from "@/config";

async function getTicketsTypes() {
    return await prisma.ticketType.findMany();
}



export const ticketsRepository = {
    getTicketsTypes
};
