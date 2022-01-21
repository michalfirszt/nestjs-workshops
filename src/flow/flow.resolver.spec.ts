import { Test, TestingModule } from '@nestjs/testing';
import { FlowResolver } from './flow.resolver';

describe('FlowResolver', () => {
  let resolver: FlowResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlowResolver],
    }).compile();

    resolver = module.get<FlowResolver>(FlowResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
