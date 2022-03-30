import { Response } from 'express-serve-static-core'

export class APIError extends Error {
    constructor(public message: string, public code?: number, public metadata?: any) {
        super(message)
		Object.setPrototypeOf(this, APIError.prototype);
    }

	sendToResponse(res: Response) {
		if (this.code) res.status(this.code)
		res.json({ error: { code: this.code, message: this.message, ...this.metadata } })
	}
}

export function apiErrorHandler(err: Error, _req: any, res: Response, _next: any) {
	let finalErr: APIError
	if (!(err instanceof APIError)) {
		console.error(err)
		finalErr = new APIError('Internal server error', 500)
	} else finalErr = err as APIError
	finalErr.sendToResponse(res)
}