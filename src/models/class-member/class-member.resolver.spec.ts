import { Test, TestingModule } from '@nestjs/testing';
import { ClassMemberResolver } from './class-member.resolver';
import { ClassMemberService } from './class-member.service';

describe('ClassMemberResolver', () => {
  let resolver: ClassMemberResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassMemberResolver, ClassMemberService],
    }).compile();

    resolver = module.get<ClassMemberResolver>(ClassMemberResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
