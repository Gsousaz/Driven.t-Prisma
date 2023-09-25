import { notFoundError } from "@/errors";
import { FullTicket, TicketResponse, TicketType } from "@/protocols";
import { enrollmentRepository } from "@/repositories";
import { ticketsRepository } from "@/repositories/tickets-repository";

async function getTicketTypes() {
    const ticketTypes = await ticketsRepository.getTicketsTypes();
    return ticketTypes;
}

async function getTickets(userId: number) {
    const enroll = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enroll) {
        throw notFoundError();
    }
    const ticket = await ticketsRepository.getTicketsByEnroll(enroll.id);
    if (!ticket) {
        throw notFoundError();
    }
    return ticket;
}


async function createTicketFunction(userId: number, ticketTypeId: number) {
    const enroll = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enroll) {
        throw notFoundError();
    }
    const data: FullTicket = await ticketsRepository.createTicketFunction(enroll.id, ticketTypeId);
    console.log('DATAAAAAAAAAAAAAAAAA', data)
    return data;
}

export const ticketsService = {
    getTicketTypes,
    getTickets,
    createTicketFunction
};
