import { registerEnumType } from '@nestjs/graphql';

import {
  AssignmentStatus,
  AuthProvider,
  ClassMemberRole,
  UserRole,
} from 'src/common/type';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User roles in the system',
});

registerEnumType(ClassMemberRole, {
  name: 'ClassMemberRole',
  description: 'Roles of members in a class',
});

registerEnumType(AssignmentStatus, {
  name: 'AssignmentStatus',
  description: 'Status of an assignment',
});

registerEnumType(AuthProvider, {
  name: 'AuthProvider',
  description: 'Authentication providers',
});

