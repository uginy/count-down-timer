import {findKey, findLastKey, omit} from 'lodash-es';

export class Lodash {
  static firstKey<T extends Object>(object: T, key: string = 'id'): string {
    return findKey(object, key) || Object.keys(object)[0]
  }

  static lastKey<T extends Object>(object: T, key: string = 'id'): string {
    return findLastKey(object, key) || Object.keys(object)[0]
  }

  static rmProp<T extends Object>(object: T, keys: string[]) {
    return omit(object, keys) || object;
  }
}
