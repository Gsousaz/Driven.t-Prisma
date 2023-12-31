import { createTicketFunction, getTicketTypes, getTickets } from '@/controllers/tickets-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketSchema } from '@/schemas/ticket-schema';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types', getTicketTypes)
    .get('/', getTickets)
    .post('/', validateBody(ticketSchema), createTicketFunction)

export { ticketsRouter };
