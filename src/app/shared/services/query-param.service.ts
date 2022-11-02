import {Location} from '@angular/common';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QueryParamService {
  constructor(private location: Location) {}

  updateQueryParam(key: string, value: string | number | boolean): void {
    const [uri, params] = this.getPathElements();
    const queryParams = new URLSearchParams(params);
    const stringValue = value?.toString();

    if (stringValue === undefined || stringValue?.length === 0) {
      queryParams.delete(key);
    } else {
      queryParams.set(key, stringValue);
    }

    this.updateLocation(uri, queryParams.toString());
  }

  private updateLocation(uri: string, params: string): void {
    if (params.length > 0) {
      this.location.replaceState(uri + '?' + params);
    } else {
      this.location.replaceState(uri);
    }
  }

  getQueryParam(key: string, returnType: 'string'): string;
  getQueryParam(
    key: string,
    returnType: 'string' | 'number' | 'boolean'
  ): string | number | boolean | null {
    const params = this.getPathElements()[1];
    const stringValue = new URLSearchParams(params).get(key);

    if (stringValue !== null) {
      if (returnType === 'number') {
        return parseFloat(stringValue);
      }
      if (returnType === 'boolean') {
        return stringValue === 'true';
      }
    }
    return stringValue;
  }

  getPathElements(): [string, string] {
    const fullPath = this.location.path();
    return [
      fullPath?.slice(0, fullPath.indexOf('?')) ?? "",
      fullPath?.slice(fullPath.indexOf('?') + 1) ?? ""
    ];
  }
}
