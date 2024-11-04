export const softDeleteMiddleware = async (params: any, next: any) => {
  // Check if it's a read operation (find, findMany, etc)
  if (params.action === 'findUnique' || params.action === 'findFirst') {
    // Change to findFirst - you cannot filter on non-existent records using findUnique
    if (params.action === 'findUnique') {
      params.action = 'findFirst';
    }
    // Add 'deleted' filter
    params.args.where = {
      ...params.args.where,
      NOT: { status: 'deleted' },
    };
  }

  if (params.action === 'findMany') {
    // Add 'deleted' filter
    if (params.args?.where) {
      if (params.args.where.deleted === undefined) {
        params.args.where = {
          ...params.args.where,
          NOT: { status: 'deleted' },
        };
      }
    } else {
      params.args = {
        ...params.args,
        where: { NOT: { status: 'deleted' } },
      };
    }
  }

  // Handle update operations
  if (params.action === 'update') {
    params.action = 'updateMany';
    params.args.where = {
      ...params.args.where,
      NOT: { status: 'deleted' },
    };
  }

  if (params.action === 'updateMany') {
    if (params.args?.where) {
      params.args.where = {
        ...params.args.where,
        NOT: { status: 'deleted' },
      };
    } else {
      params.args = {
        ...params.args,
        where: { NOT: { status: 'deleted' } },
      };
    }
  }

  // Handle delete operations
  if (params.action === 'delete') {
    // Change to update
    params.action = 'update';
    params.args.data = { status: 'deleted' };
  }

  if (params.action === 'deleteMany') {
    // Change to updateMany
    params.action = 'updateMany';
    if (params.args?.where) {
      params.args.data = { status: 'deleted' };
    } else {
      params.args = {
        ...params.args,
        data: { status: 'deleted' },
      };
    }
  }

  return next(params);
};
