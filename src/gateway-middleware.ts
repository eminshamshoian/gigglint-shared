import Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './error-handler';

const tokens: string[] = [
  'auth',
  'seller',
  'gig',
  'search',
  'buyer',
  'message',
  'order',
  'review',
];

export const verifyGatewayRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.headers?.gatewayToken) {
    throw new NotAuthorizedError(
      'Invalid request',
      'verifyGatewayRequest() method: Request not coming from API gateway'
    );
  }

  const token: string = req.headers?.gatewayToken as string;

  try {
    const payload: { id: string; iat: number } = Jwt.verify(
      token,
      'secret'
    ) as { id: string; iat: number };

    if (!tokens.includes(payload.id)) {
      throw new NotAuthorizedError(
        'Invalid request',
        'verifyGatewayRequest() method: Payload is invalid'
      );
    }
  } catch (error) {
    throw new NotAuthorizedError(
      'Invalid request',
      'verifyGatewayRequest() method: Request not coming from API gateway'
    );
  }
};
