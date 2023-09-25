import { prisma } from "@/config";
import { TicketType } from "@/protocols";

async function getTicketsTypes() {
    return await prisma.ticketType.findMany();
}

async function getTicketsByEnroll(enrollmentId: number) {
    console.log('ETAPA FINAL: ENROLLMENT', enrollmentId);
    const ticket = await prisma.ticket.findUnique({
        include: {
            TicketType: true
        },
        where: {
            enrollmentId
        }
    });
    console.log('ETAPA FINAL TICKET: ', ticket)
    return ticket;
}

async function createTicketFunction(ticket: TicketType) {
    return prisma.ticket.create({
        data: ticket
    });
}

async function getTickets(ticketId: number) {
    console.log('ETAPA FINAL: ENROLLMENT', ticketId);
    const ticket = await prisma.ticket.findUnique({
        where: {
            id: ticketId
        },
        include: {
            Enrollment: true
        }
    });
    console.log('ETAETAPA FINAL: ENROLLMENT RETURN', ticket)
    return ticket;
}

export const ticketsRepository = {
    getTicketsByEnroll,
    createTicketFunction,
    getTickets,
    getTicketsTypes
};
