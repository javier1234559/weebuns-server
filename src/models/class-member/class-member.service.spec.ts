import { Test, TestingModule } from '@nestjs/testing';
import { ClassMemberService } from './class-member.service';

describe('ClassMemberService', () => {
  let service: ClassMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassMemberService],
    }).compile();

    service = module.get<ClassMemberService>(ClassMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
