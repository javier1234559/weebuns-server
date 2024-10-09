import { registerEnumType } from '@nestjs/graphql';

import { AuthProvider, UserRole } from '@prisma/client';

// import { AssignmentStatus } from 'src/common/type';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User roles in the system',
});

registerEnumType(AuthProvider, {
  name: 'AuthProvider',
  description: 'Authentication providers',
});

// registerEnumType(AssignmentStatus, {
//   name: 'AssignmentStatus',
//   description: 'Status of an assignment',
// });
