import { registerEnumType } from '@nestjs/graphql';

import { AuthProvider, ClassMemberRole, UserRole } from '@prisma/client';

// import { AssignmentStatus } from 'src/common/type';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User roles in the system',
});

registerEnumType(AuthProvider, {
  name: 'AuthProvider',
  description: 'Authentication providers',
});

registerEnumType(ClassMemberRole, {
  name: 'ClassMemberRole',
  description: 'Roles of members in a class',
});

// registerEnumType(AssignmentStatus, {
//   name: 'AssignmentStatus',
//   description: 'Status of an assignment',
// });
