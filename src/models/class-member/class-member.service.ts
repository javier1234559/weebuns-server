import { Injectable } from '@nestjs/common';
import { CreateClassMemberInput } from './dto/create-class-member.input';
import { UpdateClassMemberInput } from './dto/update-class-member.input';

@Injectable()
export class ClassMemberService {
  create(createClassMemberInput: CreateClassMemberInput) {
    return 'This action adds a new classMember';
  }

  findAll() {
    return `This action returns all classMember`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classMember`;
  }

  update(id: number, updateClassMemberInput: UpdateClassMemberInput) {
    return `This action updates a #${id} classMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} classMember`;
  }
}
