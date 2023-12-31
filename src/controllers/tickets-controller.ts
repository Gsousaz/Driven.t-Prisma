import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import { ticketsService } from '@/services/tickets-service';
import httpStatus from 'http-status';
import { invalidDataError } from '@/errors';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
    const ticketTypes = await ticketsService.getTicketTypes();
    if (ticketTypes.length === 0) {
        return res.status(httpStatus.OK).send([]);
    }
    res.status(httpStatus.OK).send(ticketTypes);
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    console.log('userId', userId);
    const ticket = await ticketsService.getTickets(userId);
    res.send(ticket);
}

export async function createTicketFunction(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketTypeId } = req.body;
    if (!ticketTypeId) {
        throw invalidDataError('ticketTypeId is required')
    }

    const ticket = await ticketsService.createTicketFunction(userId, ticketTypeId);
    if (!ticket) {
        console.log('aparentemente estamos quebrados')
        throw invalidDataError('Error on submittion');
    }

    console.log('TICKET CONTROLLER: ', ticket)
    res.status(httpStatus.CREATED).send({ ticket });
}
