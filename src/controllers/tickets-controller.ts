import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import { ticketsService } from '@/services/tickets-service';
import httpStatus from 'http-status';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
    const ticketTypes = await ticketsService.getTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
}