import { MutationResolvers } from '../../../../../_generated/graphql-types';
import { ApolloServerContext } from '../../../types';
import { GqlUserRepository } from '../../../../../repository/typeorm/user/repository/User';
import { GqlUpdateUserRolesPresenter } from '../../../../../presenter/user/UpdateUserRoles';
import { allowOnlyWhenActorHasMemberRole } from '../../../../../policy/decision/common';
import { UpdateUserRolesInteractor } from '../../../../../usecase/mutation/user/UpdateUserRoles';

export const updateUserRoles: MutationResolvers<ApolloServerContext> = {
  updateUserRoles: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const repository = new GqlUserRepository(dbConnection);
    const presenter = new GqlUpdateUserRolesPresenter();
    const usecase = new UpdateUserRolesInteractor(repository, presenter);

    await usecase.handle(args.input!, actor!);

    return presenter.getResponse();
  },
};
