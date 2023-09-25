import { prisma } from "@/config";

async function getTicketsTypes() {
    return await prisma.ticketType.findMany();
}


async function getTicketsByEnroll(enrollmentId: number) {
    return prisma.ticket.findFirst({
        where: {
            enrollmentId
        }, include: {
            TicketType: true
        }
    })
}

async function createTicketFunction(ticket: any) {
    return prisma.ticket.create({
        data: ticket
    })
}
async function getTickets(ticketId: number) {
    return prisma.ticket.findFirst({
        where: {
            id: ticketId
        },
        include: {
            Enrollment: true
        }
    })
}


export const ticketsRepository = {
    getTicketsByEnroll,
    createTicketFunction,
    getTickets,
    getTicketsTypes
};
