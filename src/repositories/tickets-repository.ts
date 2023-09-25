import { prisma } from "@/config";
import { TicketResponse, TicketType } from "@/protocols";

async function getTicketsTypes() {
    return await prisma.ticketType.findMany();
}


async function getTicketsByEnroll(enrollmentId: number) {
    const ticket = await prisma.ticket.findUnique({
        include: {
            TicketType: true
        },
        where: {
            enrollmentId
        }
    });
    return ticket;
}



async function createTicketFunction(enroll: number, ticketTypeId: number) {
    return await prisma.ticket.create({
        data: {
            enrollmentId: enroll,
            ticketTypeId,
            status: 'RESERVED',
        },
        include: { TicketType: true },
    });
}



async function getTickets(ticketId: number) {
    const ticket = await prisma.ticket.findUnique({
        where: {
            id: ticketId
        },
        include: {
            Enrollment: true
        }
    });
    return ticket;
}

export const ticketsRepository = {
    getTicketsByEnroll,
    createTicketFunction,
    getTickets,
    getTicketsTypes
};
