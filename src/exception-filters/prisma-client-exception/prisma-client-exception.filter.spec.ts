import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';

describe('PrismaClientExceptionFilter', () => {
  const filter = new PrismaClientExceptionFilter();
  it('should be defined', () => {
    expect(filter).toBeDefined();
  });
});
