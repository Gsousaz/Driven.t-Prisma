import { notFoundError } from "@/errors";
import { TicketType } from "@/protocols";
import { enrollmentRepository } from "@/repositories";
import { ticketsRepository } from "@/repositories/tickets-repository";

import { TicketStatus } from "@prisma/client";

async function getTicketTypes() {
    const ticketTypes = await ticketsRepository.getTicketsTypes();
    return ticketTypes;
}


export const ticketsService = {
    getTicketTypes,
};
