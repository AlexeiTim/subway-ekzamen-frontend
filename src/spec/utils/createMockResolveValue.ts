export function createMockResolveValue(data: any) {
    return {
        json: () => new Promise((resolve) => resolve(data)),
        ok: true
    };
}