import {ISpoonAndForkApi} from 'api/ISpoonAndForkApi';
import RegisterRequest from './entities/RegisterRequest';
import LoginRequest from './entities/LoginRequest';
import RestApi from 'api/rest/RestApi';
import ApiConfiguration from '@spryrocks/react-api/ApiConfiguration';
// import SpoonAndForkGraphqlApi from 'api/graphql/SpoonAndForkGraphqlApi';
// import {ApolloError} from 'apollo-boost';
// import * as R from 'ramda';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
// import Queue from 'promise-queue';
// import {AuthInfoKeeper} from 'auth';
// import {SpoonAndForkApiTokenHolders} from 'api/index';
import ApiDelegate, {AuthInfo} from '@spryrocks/react-api/ApiDelegate';
import ApiBase from '@spryrocks/react-api/ApiBase';
import IApiTokenHolder from '@spryrocks/react-api/IApiTokenHolder';
import UpdateFirebaseTokenRequest from 'api/entities/UpdateFirebaseTokenRequest';
import UpdateRateRequest from './entities/UpdateRateRequest';

export default class SpoonAndForkApi extends ApiBase implements ISpoonAndForkApi {
  private readonly restApi: RestApi;

  constructor(
    configuration: ApiConfiguration,
    delegate: ApiDelegate,
    tokenHolder: IApiTokenHolder,
  ) {
    super(configuration, delegate, tokenHolder);

    if (!configuration.rest) throw new Error('Please specify rest configuration');
    this.restApi = new RestApi(this.baseUrl, configuration.rest, this.delegate);
  }

  public async register(request: RegisterRequest) {
    return this.restApi.register(request);
  }

  public async login(request: LoginRequest) {
    return this.restApi.login(request);
  }

  public async uploadFile(file: File) {
    return this.restApi.uploadFile(file);
  }

  // public async myAccount() {
  //   return this.wrapApiCall(async () =>
  //     mapMyAccountFromGQL(await this.graphqlApi.queryMyAccount()),
  //   );
  // }

  // public async wrapApiCall<TResponse>(
  //   call: () => Promise<TResponse>,
  // ): Promise<TResponse> {
  //   try {
  //     return await call();
  //   } catch (e) {
  //     if (SpoonAndForkApi.checkNotAuthorizedError(e)) {
  //       await this.refreshQueue.add(() => this.refreshTokens());
  //       // eslint-disable-next-line no-return-await
  //       return await call();
  //     }
  //     throw e;
  //   }
  // }
  //
  // private static checkNotAuthorizedError(e: ApolloError | ApiHttpError) {
  //   if (e instanceof ApiError) {
  //     return e.status === 401;
  //   }
  //   // @ts-ignore
  //   const gqlError = R.filter((e) => e.message.statusCode === 401, e.graphQLErrors);
  //   return !!gqlError;
  // }

  protected async refreshToken(refreshToken: string): Promise<AuthInfo> {
    const session = await this.restApi.refresh({refreshToken});
    return {accessToken: session.jwt, refreshToken: session.refreshToken};
  }

  public async forgotPassword(request: ForgotPasswordRequest) {
    return this.restApi.forgotPassword(request);
  }

  public async updateUserPassword(oldPassword: string, password: string) {
    return this.wrapApiCall(async () =>
      this.restApi.changePassword({oldPassword, password}),
    );
  }

  // public async updateRateRequest(request: UpdateRateRequest): Promise<void> {
  //   return this.wrapApiCall(async () =>
  //     this.graphqlApi.mutationUpdateRate(mapUpdateRateRequestToGQL(request)),
  //   );
  // }

  public async updateRateRequest(request: UpdateRateRequest): Promise<void> {
    return this.wrapApiCall(async () => this.restApi.updateRate(request));
  }

  // public async getRates() {
  //   return this.wrapApiCall(async () =>
  //     mapRatesFromGQL(await this.graphqlApi.queryRates()),
  //   );
  // }

  public async getRates() {
    return this.wrapApiCall(async () => this.restApi.rates());
  }

  public async myAccount() {
    return this.wrapApiCall(async () => this.restApi.myAccount());
  }

  public async updateFirebaseToken(request: UpdateFirebaseTokenRequest) {
    return this.wrapApiCall(async () => this.restApi.updateFirebaseToken(request));
  }
}
