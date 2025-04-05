const handler = require('../HttpTrigger1/index');  // Adjusted import path

describe('Azure Function Tests', () => {
  
    let context;
    let req;
  
    beforeEach(() => {
        context = {
            res: {
                headers: {}  // Mock headers
            }
        };
        req = {};  // Mock request if needed
    });

    it('returns status 200', async () => {
        await handler(context, req);
        expect(context.res.status).toBe(200);  // Check if the status is 200
    });

    it('returns Hello, World!', async () => {
        await handler(context, req);
        expect(context.res.body).toBe('Hello, World!');  // Check if the response body is "Hello, World!"
    });

    it('should return a response object', async () => {
        const context = {};
        const req = {};
    
        await handler(context, req);
    
        // Check if 'res' property is set on the context object
        expect(context).toHaveProperty('res');
        expect(context.res).toBeInstanceOf(Object);
    });
});
