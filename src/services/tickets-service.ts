import { notFoundError } from "@/errors";
import { TicketType } from "@/protocols";
import { enrollmentRepository } from "@/repositories";
import { ticketsRepository } from "@/repositories/tickets-repository";

import { TicketStatus } from "@prisma/client";

async function getTicketTypes() {
    const ticketTypes = await ticketsRepository.getTicketsTypes();
    return ticketTypes;
}

async function getTickets(userId: number) {
    console.log('userId service:', userId)
    const enroll = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enroll) {
        console.log('NOT ENROLL on SERVICES')
        throw notFoundError();
    }
    const ticket = await ticketsRepository.getTicketsByEnroll(enroll.id);
    if (!ticket) {
        console.log('Not found ticket ')
        throw notFoundError();
    }
    return ticket;
}


async function createTicketFunction(userId: number, ticketTypeId: number) {
    const enroll = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enroll) {
        throw notFoundError();
    }

    const ticket: TicketType = {
        ticketTypeId,
        enrollmentId: enroll.id,
        status: TicketStatus.RESERVED,
        createdAt: new Date,
        updatedAt: new Date
    }

    await ticketsRepository.createTicketFunction(ticket)
}

export const ticketsService = {
    getTicketTypes,
    getTickets,
    createTicketFunction
};
