import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ClassMemberService } from './class-member.service';
import { CreateClassMemberInput } from './dto/create-class-member.input';
import { UpdateClassMemberInput } from './dto/update-class-member.input';
import { ClassMember } from './entities/class-member.entity';

@Resolver(() => ClassMember)
export class ClassMemberResolver {
  constructor(private readonly classMemberService: ClassMemberService) {}

  @Mutation(() => ClassMember)
  createClassMember(
    @Args('createClassMemberInput')
    createClassMemberInput: CreateClassMemberInput,
  ) {
    return this.classMemberService.create(createClassMemberInput);
  }

  @Query(() => [ClassMember], { name: 'classMember' })
  findAll() {
    return this.classMemberService.findAll();
  }

  @Query(() => ClassMember, { name: 'classMember' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.classMemberService.findOne(id);
  }

  @Mutation(() => ClassMember)
  updateClassMember(
    @Args('updateClassMemberInput')
    updateClassMemberInput: UpdateClassMemberInput,
  ) {
    return this.classMemberService.update(
      updateClassMemberInput.id,
      updateClassMemberInput,
    );
  }

  @Mutation(() => ClassMember)
  removeClassMember(@Args('id', { type: () => Int }) id: number) {
    return this.classMemberService.remove(id);
  }
}
