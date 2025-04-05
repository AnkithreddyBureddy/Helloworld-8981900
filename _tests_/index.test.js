const handler = require('../index');

describe('Azure Function Tests', () => {
    it('returns Hello, World!', async () => {
        const context = { res: {} };
        await handler(context, {});
        expect(context.res.body).toBe('Hello, World!');
        expect(context.res.status).toBe(200);
    });

    it('handles missing req gracefully', async () => {
        const context = { res: {} };
        await handler(context);
        expect(context.res.body).toBe('Hello, World!');
    });

    it('returns valid response', async () => {
        const context = { res: {} };
        await handler(context, {});
        expect(typeof context.res.body).toBe('string');
    });
});
