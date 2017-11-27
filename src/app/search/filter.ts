export abstract class Filter<T> {
  /**
   * Enable this filter or not.
   */
  isOn: boolean;

  /**
   * Readonly display name of this filter.
   */
  abstract get label(): string;

  /**
   * Filter method.
   * @param list Source data list to filter on.
   */
  abstract filter(list: T[]): T[];
}
