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
    const enroll = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enroll) {
        throw notFoundError();
    }

    const ticket = await ticketsRepository.getTickets(enroll.id);
    if (!ticket) {
        throw notFoundError();
    }
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
    }

    await ticketsRepository.createTicketFunction(ticket)
}

export const ticketsService = {
    getTicketTypes,
    getTickets,
    createTicketFunction
};
