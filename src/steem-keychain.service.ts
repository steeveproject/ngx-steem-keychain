import { Injectable, NgZone } from '@angular/core';

import { Observable } from 'rxjs';

import { Response } from './response';
import { SteemKeychainError } from './steem-keychain-error';


export type KeyType = 'Memo' | 'Posting' | 'Active';

export type Currency = 'STEEM' | 'SBD';

export type DelegationUnit = 'VESTS' | 'SP';


@Injectable({
  providedIn: 'root'
})
export class SteemKeychainService {

  constructor(
    private ngZone: NgZone
  ) { }

  get steemKeychainAvailable(): boolean {
    return (<any>window).steem_keychain !== undefined;
  }

  requestHandshake(): Observable<Response> {
      return this.call('requestHandshake', []);
  }

  requestVerifyKey(account: string, encryptedMessage: string, keyType: KeyType): Observable<Response> {
    return this.call('requestVerifyKey', [
      account,
      encryptedMessage,
      keyType
    ]);
  }

  requestPost(
    parentAuthor: string,
    parentPermlink: string,
    author: string,
    permlink: string,
    title: string,
    body: string,
    jsonMetadata: string = '',
    options: string = ''
  ): Observable<Response> {

    return this.call('requestPost', [
      author,
      title,
      body,
      parentPermlink,
      parentAuthor,
      jsonMetadata,
      permlink,
      options
    ]);
  }

  requestVote(
    voter: string,
    author: string,
    permlink: string,
    weight: number
  ): Observable<Response> {

    return this.call('requestVote', [
      voter,
      permlink,
      author,
      weight
    ]);
  }

  requestCustomJson(
    account: string,
    displayMessage: string,
    id: string,
    customJson: string,
    key?: KeyType
  ): Observable<Response> {

    key = key || 'Posting';

    return this.call('requestCustomJson', [
      account,
      id,
      (key as string).toLowerCase(),
      customJson,
      displayMessage
    ]);
  }

  requestTransfer(
    from: string,
    to: string,
    amount: number,
    memo: string,
    currency: Currency,
    enforce: boolean = false
  ): Observable<Response> {

    return this.call('requestTransfer', [
      from,
      to,
      amount,
      memo,
      currency,
      enforce,
    ], 4);
  }

  requestDelegation(
    delegator: string,
    delegatee: string,
    amount: number,
    unit: DelegationUnit
  ): Observable<Response> {

    return this.call('requestDelegation', [
      delegator,
      delegatee,
      amount,
      unit
    ]);
  }

  /*
   * call is invoked by all other methods to call Steem Keychain.
   * It should not be used directly since it is not type-safe,
   * but it can be bandy in case there is a method not implemented yet.
   */
  call(method: string, args: any[], callbackIndex?: number): Observable<Response> {
    return Observable.create((observer: any) => {
      // Make sure the extension is available.
      if (!this.steemKeychainAvailable) {
        observer.error(new Error('Steem Keychain not available'));
        observer.complete();
        return;
      }

      // Push the callback to the argument list.
      const cb = (res: Response) => this.ngZone.run(() => {
        if (res.success) {
          observer.next(res);
        } else {
          observer.error(new SteemKeychainError(res));
        }
        observer.complete();
      });

      if (callbackIndex) {
        args.splice(callbackIndex, 0, cb);
      } else {
        args.push(cb);
      }

      // Send the request.
      (<any>window).steem_keychain[method](...args);
    });
  }
}
