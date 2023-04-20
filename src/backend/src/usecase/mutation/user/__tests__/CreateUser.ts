import { IllegalArgumentError } from '../../../../common/error';
import { CreateUserInteractor } from '../CreateUser';
import { MockUserRepository } from '../_mocks/MockUserRepository';
import { MockCreateUserPresenter } from '../_mocks/MockUserPresenter';

/**
 * interactor を生成
 */
const setup = () => {
  const repository = new MockUserRepository();
  const presenter = new MockCreateUserPresenter();
  const interactor = new CreateUserInteractor(repository, presenter);

  return { interactor, presenter };
};

describe('CreateUserInteractor', () => {
  test('リクエストを処理し、新しいエンティティを生成できた', async () => {
    const { interactor, presenter } = setup();
    const request = { email: 'aaa@bbb.com' };

    await interactor.handle(request);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.user?.email).toBe(request.email);
  });

  test('複数回のリクエストを処理できた', async () => {
    const { interactor, presenter } = setup();

    let i = 0;
    while (i <= 10) {
      ++i;
      const request = { email: `aaa${i}@bbb.com` };
      await interactor.handle(request);
    }

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.user?.email).toBe(`aaa${i}@bbb.com`);
  });

  test('不正なメールアドレスを指定したため、失敗した', async () => {
    const { interactor } = setup();
    const request = { email: 'hogehoge' };

    await expect(interactor.handle(request)).rejects.toThrow(IllegalArgumentError);
  });
});
